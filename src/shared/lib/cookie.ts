import Cookies from "js-cookie";

export const ACCESS_TOKEN_KEY = 'access_token'; // refresh_token=eyJhbGciOi...; не будет меняться, поэтому константа

const isProduction = import.meta.env.PROD;

export const setAccessToken = (token: string) => { // сохр токен
    Cookies.set(ACCESS_TOKEN_KEY, token, { // имя cookies, значение // если cookie ACCESS_TOKEN_KEY = 'access_token', token = 'eyJhbGci...'
        expires: 1 / 96, // 15мин
        secure: isProduction, // только по HTTPS
        sameSite: 'strict', // cookie отправляется только с того же сайта. Защита от CSRF.
    });
};

export const getAccessToken = () => { // для работы с токеном, для baseApi, проверка на логин
    return Cookies.get(ACCESS_TOKEN_KEY);
};

export const removeAccessToken = () => {
    Cookies.remove(ACCESS_TOKEN_KEY)
}