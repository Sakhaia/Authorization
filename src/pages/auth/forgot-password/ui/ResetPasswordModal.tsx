import styles from './ResetPasswordModal.module.css';
import envelope from '../assets/envelope.svg';
import { Button } from '@/shared/ui/button';

type ResetPasswordModalProps= {
    onClose: () => void;
    onResend: () => void;
}

export const ResetPasswordModal = ({onClose, onResend}: ResetPasswordModalProps) => {
  return (
    <div className={styles.overlay}>
        <div className={styles.wrapper}>
            <button 
            className={styles.closeBtn}
            onClick={onClose}
            >x</button>
            <div className={styles.modal}>
                <img src={envelope} />
                <div className={styles.info}>
                    <h1>Мы отправили письмо 
                        <br/>с инструкциями
                    </h1>
                    <p>Если вы не получили письмо с инструкциями, 
                        <br/>проверьте, пожалуйста, папку «Спам» или попробуйте 
                        <br/>отправить запрос ещё раз
                    </p>
                </div>
                <Button 
                    type='button'
                    onClick={onResend}
                    className={styles.sendAgain}
                    text='Отправить повторно'
                />
            </div>
        </div>
    </div>
  )
}

