import type { ProfileResponse } from '@/entities'
import { calculateProfileComplete } from '../model/calculateProfileComplete'
import styles from './ProfileCompletion.module.css'
import { ButtonLink } from '@/shared/ui/buttonLink';
import { Card } from '@/shared/ui/card';

type ProfileCompletionProps = {
    user: ProfileResponse;
}

export const ProfileCompletion = ({user}: ProfileCompletionProps) => {
    const percent = calculateProfileComplete(user);
  return (
    <Card className={styles.completion}>
        <div className={styles.group}>
            <h2 className={styles.title}>Профиль заполнен на {percent}%</h2>
            <p className={styles.text}>Заполните свой профиль, чтобы мир мог увидеть вашу уникальность и вдохновиться вашими 
                <br/>достижениями. Каждая деталь добавляет картины вашей истории успеха
            </p>
        </div>
      <ButtonLink
      link='/profile/edit/personal'
      linkText='Заполнить профиль'
      className={styles.fillBtn}
      />
    </Card>
  )
}


