import { useLoginMutation } from "@/features/auth"
import { useForm } from "react-hook-form";
import type { LoginFormValues } from "./types";
import { useNavigate } from "react-router-dom";


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

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const response = await login({ // login - функция из useLoginMutation
                username: data.username,
                password: data.password,
            }).unwrap()
            navigate('/profile');
            console.log('Успешный вход:', response)
        } catch (err) {
            console.error('Ошибка входа:', err);
        }
    }
  return {
    register,
    handleSubmit: handleSubmit(onSubmit), //ключ: значение(из библ)
    errors,
    isSubmitting,
    isLoading,
    error
  }
}
