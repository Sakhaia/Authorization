import { useGetProfileQuery } from '@/entities';
import styles from './ProfileSkills.module.css'; 
import { Card } from '@/shared/ui/card';

export const ProfileSkills = () => {
    const {data: user} = useGetProfileQuery();
  return (
    <Card className={styles.skills}>
        <h2>Навыки</h2>
        <div className={styles.list}>
          {user?.profiles[0]?.profileSkills?.map((skill) => (
            <div 
            key={skill.id} 
            className={styles.tags}>
              <span className={styles.tag}>{skill.title}</span>
            </div>
          ))}
        </div>
      </Card>
  )
}

