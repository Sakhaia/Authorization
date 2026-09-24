import { createApi, fetchBaseQuery, type BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { getAccessToken, removeAccessToken, setAccessToken } from "../lib";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
        credentials: 'include', // прикладывает cookies
        prepareHeaders: (headers) => { // фун выз перед запросом, с заголовком хедерс
            const accessToken = getAccessToken(); // читаем

            if (accessToken) { // если есть токен в куки 
                headers.set('Authorization', `Bearer ${accessToken}`) // добавляем зоголовок
            }

            return headers;
        }
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions); /* Исходный запрос */
    /* Если 401 и если это не рефреш - пробуем обновить токен */
    const isRefreshRequest = typeof args === 'string' ? args.includes('auth/refresh') : args.url.includes('auth/refresh');

    if (result.error?.status === 401 && !isRefreshRequest) {
        const refreshResult = await baseQuery('auth/refresh', api, extraOptions);

        if (refreshResult.data) {
            const newToken = (refreshResult.data as {access_token: string}).access_token;
            setAccessToken(newToken); /* сохр новый токен */

            result = await baseQuery(args, api, extraOptions); /* проверяем исходный запрос */
        } else { /* рефреш упал - логаут */
            removeAccessToken();
            api.dispatch(baseApi.util.resetApiState())
        }
    }
    return result;
}

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({})
})