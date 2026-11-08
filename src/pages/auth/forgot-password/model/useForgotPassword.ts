import { useForm } from "react-hook-form";
import type { ForgotPasswordFormValues } from "./types";
import { useSendResetPasswordMutation } from "@/features/auth";
import { useState } from "react";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const useForgotPassword = () => {
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<ForgotPasswordFormValues>({defaultValues: {
        email: ''
      }});
      const [sendReset, {isLoading, error}] = useSendResetPasswordMutation();
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [lastEmail, setLastEmail] = useState('');

      const getErrorMessage = (err: unknown) => {
      if (!err) return null;
      const errObj = err as FetchBaseQueryError;
      
      if (errObj.status === 'FETCH_ERROR') return 'Нет соединения с сервером';
      if (typeof errObj.status === 'number' && errObj.status >= 500) return 'Сервер временно недоступен';
      if (errObj.status === 429) return 'Превышен лимит отправки писем. Подождите.';
      if (errObj.status === 400) return 'Некорректный email';
      
      return 'Произошла ошибка при отправке';
    };
    
      const onSubmit = async (data: ForgotPasswordFormValues) => {
        try {
          await sendReset(data.email).unwrap();
          setLastEmail(data.email);
          setIsModalOpen(true);
          console.log('Письмо отправено')
        } catch (err) {
          console.error('Ошибка отправки письма:', err);
        }
      }

      const closeModal = () => setIsModalOpen(prev => !prev);

      const resend = async () => { /* повторная отправка */
        if (!lastEmail) return;
        try {
            await sendReset(lastEmail).unwrap();
        } catch (err) {
            console.error('Ошибка повторной отправки:', err);
        }
    };

  return {
    register, 
    handleSubmit: handleSubmit(onSubmit), 
    errors, 
    isSubmitting, 
    isLoading, 
    error: getErrorMessage(error),
    isModalOpen,
    lastEmail,
    closeModal,
    resend}
}

