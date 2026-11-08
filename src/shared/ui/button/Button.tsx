import styles from './Button.module.css';

interface ButtonProps 
extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    text?: string;
    img?: string;
}

export const Button = ({className, text, img, ...props}: ButtonProps) => {
  return (
    <button 
        className={`${styles.button} ${className}`} 
        {...props}
    >
      {img && <img src={img} />}
      {text}
    </button>
  )
}

