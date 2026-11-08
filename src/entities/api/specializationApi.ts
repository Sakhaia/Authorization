import { baseApi } from "@/shared/api/baseApi";
import type { Specialization, SpecializationResponse, UpdateSpecializationRequest } from "../model/types";

export const specializationApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getSpecializations: build.query<SpecializationResponse, {page?: number, limit?: number, title?: string}>({
          query: (params) => ({
            url: "specializations",
            params: {
              limit: params.limit, 
              title: 
              params.title || undefined, 
              page: params.page},
          }),
          providesTags: ['Specializations']
        }),
        getSpecialization: build.query<Specialization, number>({
          query: (id) => ({
            url: `specializations/${id}`
          }),
          providesTags: (arg) => [{type: 'Specializations', id: arg?.id}]
        }),
        updateSpecialization: build.mutation<Specialization, {id:number, data: UpdateSpecializationRequest}>({
          query: ({id, data}) => ({
            url: `specializations/${id}`,
            method: 'PATCH',
            body: data,
          }),
          invalidatesTags: (arg) => [{type: 'Specializations', id: arg?.id}]
        }),
        createSpecialization: build.mutation<Specialization, UpdateSpecializationRequest>({
          query: (data) => ({
            url: 'specializations',
            method: 'POST',
            body: data,
          }),
          invalidatesTags: ['Specializations']
        }),
        deleteSpecialization: build.mutation<void, number>({
          query: (id) => ({
            url: `specializations/${id}`,
            method: 'DELETE'
          }),
          invalidatesTags: ['Specializations']
        })
    })
})

export const {
  useGetSpecializationsQuery, 
  useGetSpecializationQuery,
  useUpdateSpecializationMutation, 
  useCreateSpecializationMutation,
  useDeleteSpecializationMutation,
} = specializationApi;