import type { AppDispatch } from "@/app/store/store";
import type { NavigateFunction } from "react-router-dom";
import { baseApi } from "../api/baseApi";
import { removeAccessToken } from "./cookie";


export const startSession = (dispatch: AppDispatch, navigate: NavigateFunction) => {
    dispatch(baseApi.util.resetApiState());
    navigate('/profile', {replace: true})
}

export const endSession = (dispatch: AppDispatch, navigate: NavigateFunction) => {
    removeAccessToken(); /* удаляем токен */
    dispatch(baseApi.util.resetApiState()); /* сброс кеша RTK Query */
    navigate('/login', {replace: true}) /* редирект, replace: true - кнопка назад не вернет на профиль */
}
