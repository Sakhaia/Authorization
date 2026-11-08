import { Input } from '@/shared/ui/input';
import styles from './FormName.module.css';
import type { UseFormReturn } from 'react-hook-form';
import type { SpecializationFormValue } from '../model/types';

type FormNameProps = {
    form: UseFormReturn<SpecializationFormValue>;
}

export const FormName = ({form}: FormNameProps) => {
    const {register, formState: {errors}} = form;
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <h2>Название специализации</h2>
        <p>Добавьте название специализации</p>
      </div>
      <Input
        type="text"
        placeholder="Введите название"
        error={errors.title?.message}
        className={styles.inputName}
        {...register("title")}
      />
    </div>
  );
};
