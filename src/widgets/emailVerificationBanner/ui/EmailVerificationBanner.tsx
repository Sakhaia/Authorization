import type { ProfileResponse } from '@/entities'
import styles from './EmailVerificationBanner.module.css'
import { Card } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import arr from '../assets/Arrow Right.svg';

type EmailVerificationBannerProps = {
    user: ProfileResponse;
}

export const EmailVerificationBanner = ({user}: EmailVerificationBannerProps) => {
    const handleVerify = () => {
        /* Дописать логигу с /auth/verify-email*/
        alert('Письмо отправлено вам на почту')
    }
  return (
    <Card className={styles.banner}>
      <div className={styles.group}>
        <h2 className={styles.title}>{user.username}, подтвердите ваш email</h2>
        <p className={styles.text}>Станьте частью нашей команды! Подтвердите ваш email, чтобы получить доступ 
            <br/>к дополнительным возможностям платформы и начать расширять свои горизонты 
            <br/>в сообществе таких же целеустремлённых профессионалов, как и вы. 
            <br/>Присоединяйтесь к нам на пути к новым вершинам!
        </p>
      </div>
      <Button
        type='button'
        text='Подтвердить email'
        img={arr}
        onClick={handleVerify}
        className={styles.verifyBtn}/>
    </Card>
  )
}
