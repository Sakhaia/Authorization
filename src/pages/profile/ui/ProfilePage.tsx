import styles from './ProfilePage.module.css';
import { ProfileInfo } from './ProfileInfo';
import { ProfileAbout } from './ProfileAbout';
import {ProfileSkills} from './ProfileSkills';
import { useGetProfileQuery } from '@/entities';

export const ProfilePage = () => {
  const {data: user, isLoading, isError} = useGetProfileQuery();

  if (isLoading) return <div>Загрузка профиля</div>
  if (isError || !user) return <div>Ошибка загрузки профиля</div>

  const activeProfile = user.profiles?.find((p) => p.isActive)
  return (
    <div className={styles.container}>
      <ProfileInfo user={user}/>
      <ProfileAbout profile={activeProfile}/>
      <ProfileSkills profile={activeProfile}/>
    </div>
  )
}

