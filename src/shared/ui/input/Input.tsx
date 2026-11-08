import { forwardRef, type InputHTMLAttributes } from 'react';
import styles from "./Input.module.css";
import { useState } from "react";
import eyeNA from '../../assets/EyeClose.svg';
import eyeA from '../../assets/EyeSlash.svg';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  rightSlot?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, rightSlot, type, ...rest }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    
    const togglePasswordVisible = () => {
      setIsPasswordVisible(prev => !prev)
    }
    
    return (
      <div className={styles.group}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <div className={error ? styles.errorInput : styles.inputWrapper}>
          <input 
            id={id} 
            className={styles.input} 
            type={isPasswordVisible ? 'text' : type}
            ref={ref} 
            {...rest}
          />
          {rightSlot && (
            <button 
              type='button'
              className={styles.rightSlot}
              onClick={togglePasswordVisible} 
            >
              <img src={isPasswordVisible ? eyeA : eyeNA} />
            </button>
          )}
        </div>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input'; 