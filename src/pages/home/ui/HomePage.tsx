import { useGetProfileQuery } from '@/entities';
import styles from './HomePage.module.css';

export const HomePage = () => {
    const {data: user} = useGetProfileQuery();
  return (
    <div className={styles.home}>
      <h1>Привет, {user?.username}!</h1>
      <div className={styles.info}>
        <span>Скоро здесь будут отображаться мероприятия сообщества, 
            <br/>
            популярные статьи и многое ещё чего интересного)</span>
      </div>
    </div>
  )
}

