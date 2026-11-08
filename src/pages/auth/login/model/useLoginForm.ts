import { useLoginMutation } from "@/features/auth"
import { useForm } from "react-hook-form";
import type { LoginFormValues } from "./types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startSession } from "@/shared/lib";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";


export const useLoginForm = () => {
    const [login, {isLoading, error}] = useLoginMutation(); // функция, которая отправляет запрос - отпраыляет POST, {состояние}
    const {
        register, // функция для привязки инпутов к форме
        handleSubmit, // функция, которая валидирует форму и вызывает onSubmit
        formState: {errors, isSubmitting} // errors - объект с ошибками полей, isSubmitting — true, пока onSubmit выполняетс
    } = useForm<LoginFormValues>({
        defaultValues: { // начальные значения полей, чтобы не ругался
            username: '',
            password: '',
        }
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async (data: LoginFormValues) => {
        try {
            await login({ // login - функция из useLoginMutation
                username: data.username,
                password: data.password,
            }).unwrap()
            startSession(dispatch, navigate)
        } catch (err) {
            console.error('Ошибка входа:', err);
        }
    }

    const getErrorMessage = (err: unknown) => {
    if (!err) return null;
    const error = err as FetchBaseQueryError;
    
    // сервер недоступен 
    if (error.status === 'FETCH_ERROR') {
        return 'Нет соединения с сервером. Проверьте интернет.';
    }
    
    // 500 и больше
    if (typeof error.status === 'number' && error.status >= 500) {
        return 'Сервер временно недоступен. Попробуйте позже.';
    }

    // 401 - Неверный пароль
    if (error.status === 401) {
        return 'Неверный логин или пароль';
    }

    // 429 - Слишком много запросов
    if (error.status === 429) {
        return 'Слишком много попыток. Подождите немного.';
    }

    return 'Произошла ошибка при входе.';
}
  return {
    register,
    handleSubmit: handleSubmit(onSubmit), //ключ: значение(из библ)
    errors,
    isSubmitting,
    isLoading,
    error: getErrorMessage(error)
  }
}
