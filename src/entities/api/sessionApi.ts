import { baseApi } from "@/shared/api/baseApi";
import type { ProfileResponse, SkillsResponse, SpecializationResponse, UpdateProfileRequest, UpdateUserRequest, UserResponse } from "../model/types";

export const sessionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<ProfileResponse, void>({
      query: () => "auth/profile",
      providesTags: ['Profile'] // этот запрос дает данные с Профиль
    }),
    updateUser: build.mutation<UserResponse, {id: string; data: UpdateUserRequest}>({ // что возвр сервер, что принимает
      query: ({id, data}) => ({
        url: `users/${id}`,
        method: 'PATCH',
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
    getSpecializations: build.query<SpecializationResponse, void>({
      query: () => ({
        url: "specializations",
        params: {limit: 100}
      })
    }),
    getSkills: build.query<SkillsResponse, {specializations: number[]}>({
      query: ({specializations}) => ({
        url: "skills",
        params: {specializations: specializations.join(',')}
      })
    })
  }),
})

export const { useGetProfileQuery, useUpdateUserMutation, useUpdateProfileMutation, useGetSpecializationsQuery, useGetSkillsQuery } = sessionApi;
