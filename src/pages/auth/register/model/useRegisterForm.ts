import { useRegisterMutation } from "@/features/auth";
import { useForm } from "react-hook-form";
import type { RegisterFormValues } from "./types";
import { useNavigate } from "react-router-dom";


export const useRegisterForm = () => {
    const [registerUser, {isLoading, error}] = useRegisterMutation();
    const {register, handleSubmit, formState: {errors, isSubmitting}, getValues, setError} = useForm<RegisterFormValues>({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            agreeToDataProcessing: false,
            agreeToTerms: false,
            agreeToMarketing: false,
        }
    })
    const navigate = useNavigate()
    const onSubmit = async (data: RegisterFormValues) => {
        try {
            const response = await registerUser({
                username: data.username,
                email: data.email,
                password: data.password,
            }).unwrap()
            navigate('/profile');
            console.log('Успешный вход:', response)
        } catch (err) {
            const error = err as {status: number; data?: {message?: string}};

            if (error.status === 409) {
                setError('email', {
                    type: 'server',
                    message: 'Этот email уже существует'
                })
            }
        }
    }
  return {
    handleSubmit: handleSubmit(onSubmit),
    isSubmitting,
    isLoading,
    error,
    errors,
    register,
    getValues
  }
}

