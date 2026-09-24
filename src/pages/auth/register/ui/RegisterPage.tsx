import styles from './RegisterPage.module.css';
import { AuthFooter, AuthForm} from "@/features/auth";
import { useRegisterForm } from '../model/useRegisterForm';
import { FormFields } from './FormFields';
import { AgreementsSection } from './AgreementsSection';

export const RegisterPage = () => {
    const form = useRegisterForm()
  return (
    <div className={styles.container}>
      <AuthForm
      title='Регистрация'
      onSubmit={form.handleSubmit}
      isSubmitting={form.isSubmitting}
      isLoading={form.isLoading}
      error={form.error ? 'Неверный логин или пароль' : undefined}
      btnName='Зарегистрироваться'>
        <div className={styles.content}>
            <FormFields
            form={form}/>
            <AgreementsSection
            form={form}/>
        </div> 
      </AuthForm>

      <AuthFooter 
            question='Уже есть аккаунт?'
            linkText='Войти'
            link='/login'/>
    </div>
  )
}
