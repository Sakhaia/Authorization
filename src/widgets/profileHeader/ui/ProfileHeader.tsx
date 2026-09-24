import styles from './ProfileHeader.module.css';
import settings from '../assets/Settings.svg';
import { useGetProfileQuery } from '@/entities';

export const ProfileHeader = () => {
    const {data: user, isLoading} = useGetProfileQuery();
  return (
    <div className={styles.header}>
      <button 
      type='button'
      className={styles.settingsBtn}>
        <img src={settings} />
      </button>
      {isLoading ? <div className={styles.avatarSkeleton}/> : <img src={user?.avatarUrl} className={styles.avatarImg}/>}
    </div>
  )
}

