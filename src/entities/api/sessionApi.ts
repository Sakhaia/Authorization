import { baseApi } from "@/shared/api/baseApi";
import type { ProfileResponse, SkillsResponse,UpdateProfileRequest, UpdateUserRequest, UserResponse } from "../model/types";

export const sessionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<ProfileResponse, void>({
      query: () => "auth/profile",
      providesTags: ['Profile'] // этот запрос дает данные с Профиль
    }),
    updateUser: build.mutation<UserResponse, {id: string; data: UpdateUserRequest}>({ // что возвр сервер, что принимает
      query: ({id, data}) => ({
        url: `users/${id}`,
        method: 'PATCH', // частичное обновление
        body: data,
      }),
      invalidatesTags: ['Profile'], //инвалидирует тег
    }),
    updateProfile: build.mutation<unknown, {id: string; data: UpdateProfileRequest}>({
      query: ({id, data}) => ({
        url: `profiles/${id}`,
        method: 'PUT',
        body: data,
      } ),
      invalidatesTags: ['Profile']
    }),
    getSkills: build.query<SkillsResponse, {specializations: number[], limit: number}>({
      query: ({specializations, limit}) => ({
        url: "skills",
        params: {specializations: specializations && specializations.length > 0 ? specializations.join(',') : undefined, limit}
      })
    })
  }),
})

export const { useGetProfileQuery, useUpdateUserMutation, useUpdateProfileMutation, useGetSkillsQuery } = sessionApi;
