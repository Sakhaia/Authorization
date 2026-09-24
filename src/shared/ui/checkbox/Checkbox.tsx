import type { InputHTMLAttributes, ReactNode } from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    children: ReactNode;
    error?: string; 
}

export const Checkbox = ({id, children, error, ...rest}: CheckboxProps) => {
  return (
    <div className={styles.checkbox}>
      <label htmlFor={id} className={styles.label}>
        <input id={id} type="checkbox" className={styles.input} {...rest}/>
        <span className={styles.checkmark} />
         <span className={styles.text}>{children}</span>
      </label>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}

