import type { ReactNode, SubmitEventHandler } from 'react';
import styles from './AuthForm.module.css';
import { Button } from '@/shared/ui/button';

type AuthFormProps = {
  title: string;
  onSubmit: SubmitEventHandler<HTMLFormElement>;
  children: ReactNode;
  isSubmitting?: boolean;
  isLoading?: boolean; 
  error?: string;
  btnName: string;
}

export const AuthForm = ({title, onSubmit, children, isSubmitting, isLoading, error, btnName}: AuthFormProps) => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.fields}>
          {children}
        </div>
        {error && <span className={styles.error}>{error}</span>}
        <Button
        text={btnName}
        type='submit'
        disabled={isSubmitting || isLoading}/>
      </form>
    </section>
  )
}

