import { Input } from '@/shared/ui/input';
import styles from './ForgotPasswordPage.module.css';
import { AuthFooter, AuthForm} from '@/features/auth';
import { useForgotPassword } from '../model/useForgotPassword';
import { ResetPasswordModal } from './ResetPasswordModal';

export const ForgotPasswordPage = () => {
  const {handleSubmit, isSubmitting, isLoading, error, errors, register, closeModal, isModalOpen, resend} = useForgotPassword();
  
  return (
    <div className={styles.container}>
      <AuthForm
      title='Забыли пароль?'
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      isLoading={isLoading}
      error={error || undefined}
      btnName='Отправить'>
        <div className={styles.content}>
          <p className={styles.description}>Для восстановления пароля введите адрес эл.почты, 
            <br/>на который вы регистрировались. Мы отправим 
            <br/>письмо для воссталовления пароля
          </p>
          <Input
          id='email'
          type='email'
          label='Электронная почта'
          placeholder='Введите электронную почту'
          error={errors.email?.message}
          {...register('email', {
            required: 'Введите email',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Введите корректный email'}
          })}/>
        </div>
      </AuthForm>
      
      <AuthFooter 
        question='Нет аккаунта?'
        linkText='Зарегистрироваться'
        link='/register'
      />
      {isModalOpen &&<ResetPasswordModal
        onClose={closeModal}
        onResend={resend}
        isLoading={isLoading}
      />}
    </div>
  )
}
