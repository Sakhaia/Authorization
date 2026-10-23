import {
    createApi,
    fetchBaseQuery,
    type BaseQueryFn,
} from '@reduxjs/toolkit/query/react';
import type { FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { getAccessToken, removeAccessToken, setAccessToken } from '@/shared/lib';

let refreshPromise: Promise<{ access_token: string } | null> | null = null;

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const accessToken = getAccessToken();

        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`);
        }

        return headers;
    },
});

const PUBLIC_URLS = [
    'auth/login',
    'auth/signUp',
    'auth/send-reset-password',
];

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    const url = typeof args === 'string' ? args : args.url;
    const isRefreshRequest = url.includes('auth/refresh');
    const isPublicRequest = PUBLIC_URLS.some((publicUrl) =>
        url.includes(publicUrl)
    );

    if (result.error?.status === 401 && !isRefreshRequest && !isPublicRequest) {
        if (!refreshPromise) {
            refreshPromise = (async () => {
                try {
                    const refreshResult = await baseQuery(
                        'auth/refresh',
                        api,
                        extraOptions
                    );

                    if (refreshResult.data) {
                        const data = refreshResult.data as {
                            access_token?: unknown;
                        };

                        if (typeof data.access_token !== 'string') {
                            return null;
                        }

                        setAccessToken(data.access_token);
                        return { access_token: data.access_token };
                    }

                    return null;
                } finally {
                    refreshPromise = null;
                }
            })();
        }

        const refreshData = await refreshPromise;

        if (refreshData) {
            result = await baseQuery(args, api, extraOptions);
        } else {
            removeAccessToken();
        }
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Profile'],
    endpoints: () => ({}),
});