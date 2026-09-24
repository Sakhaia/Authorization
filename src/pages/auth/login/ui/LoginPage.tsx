import { AuthFooter, AuthForm, SocialAuth } from '@/features/auth';
import { useLoginForm } from '../model/useLoginForm'
import styles from './LoginPage.module.css'
import { Input } from '@/shared/ui/input';
import { ButtonLink } from '@/shared/ui/buttonLink';

export const LoginPage = () => {
  const {register, handleSubmit, errors, isSubmitting, isLoading, error} = useLoginForm();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <AuthForm
        title='Вход в личный кабинет'
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isLoading={isLoading}
        error={error ? 'Неверный логин или пароль' : undefined}
        btnName='Вход'>
          <div className={styles.group}>
            <Input
            id='username'
            type='email'
            label='Электронная почта'
            placeholder='Введите электронную почту'
            error={errors.username?.message}
            {...register('username')}/>

            <Input
            id='password'
            type='password'
            label='Пароль'
            placeholder='Введите пароль'
            rightSlot = {true}
            error={errors.password?.message}
            {...register('password')}/>
        </div>

        <ButtonLink
        link='/forgot-password'
        linkText='Забыли пароль?'
        className={styles.link}
        />
      </AuthForm>

      <SocialAuth/>
    </div>

    <AuthFooter 
      question='Нет аккаунта?'
      linkText='Зарегистрироваться'
      link='/register'/>
  </div>
  )
}

