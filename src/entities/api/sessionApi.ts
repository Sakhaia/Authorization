import { baseApi } from "@/shared/api/baseApi";
import type { ProfileResponse } from "../model/types";

export const sessionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<ProfileResponse, void>({
      query: () => "auth/profile",
    }),
  }),
});

export const { useGetProfileQuery } = sessionApi;
