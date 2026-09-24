import { baseApi } from "@/shared/api/baseApi";
import type { LoginRequest, LoginResponse, RegisterRequest, SendResetPasswordResponse } from "../model/types";
import { setAccessToken } from "@/shared/lib";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // build.query/mutation
    login: build.mutation<LoginResponse, LoginRequest>({// что вовзр сервер, что отправляем
      query: (loginData) => ({
        // какой запрос надо сделать HTTP-запрос (учетные данные для входа)
        url: "auth/login", // куда
        method: "POST", // что делать
        body: loginData, // что отправляем login({ username: 'test@mail.ru', password: '123' })
      }),
      async onQueryStarted(_, {queryFulfilled}) { // фун запускается, когда запускается мутация. 1арг - loginData, 2 - объект с проимосом, который зарезолвился, когда запрос завершился
        try {
          const {data} = await queryFulfilled;
          setAccessToken(data.access_token) // если успех, кладем токен
        } catch (err) {
          // ошибка обрабатывается в форме (useLoginForm)
          console.log('Ошибка логина', err)
        }
      }
    }),
    refresh: build.mutation<LoginResponse, void>({
      query: () => 'auth/refresh',
    }),
    logout: build.mutation<void, void>({
      query: () => 'auth/logout'
    }),
    register: build.mutation<LoginResponse, RegisterRequest>({
      query: (registerData) => ({
        url: 'auth/signUp',
        method: 'POST',
        body: registerData,
      }),
      async onQueryStarted(_, {queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          setAccessToken(data.access_token);
        } catch (err) {
          console.log(err)
        }
      }
    }),
    sendResetPassword: build.mutation<SendResetPasswordResponse, string>({
      query: (email) => ({
        url:'auth/send-reset-password',
        params: {email}
      }),
    })
  }),
});

export const { useLoginMutation, useRefreshMutation, useLogoutMutation, useRegisterMutation, useSendResetPasswordMutation } = authApi;
