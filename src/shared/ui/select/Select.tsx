import { forwardRef, type SelectHTMLAttributes } from 'react'
import styles from './Select.module.css'

type SelectOption = {
    value: string | number;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    error?: string;
    options: SelectOption[];
    placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ id, label, options, error, placeholder, ...rest }, ref) => {
    return (
      <div className={styles.group}>
        <label htmlFor={id}>{label}</label>
        <select 
          id={id} 
          className={styles.select} 
          ref={ref}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>{placeholder}</option>
          )}
          {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                  {opt.label}
              </option>
          ))}
        </select>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    )
  }
);

Select.displayName = 'Select';