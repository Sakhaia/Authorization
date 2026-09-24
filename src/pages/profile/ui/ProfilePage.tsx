import styles from './ProfilePage.module.css';
import { ProfileInfo } from './ProfileInfo';
import { ProfileAbout } from './ProfileAbout';
import {ProfileSkills} from './ProfileSkills';

export const ProfilePage = () => {
  return (
    <div className={styles.container}>
      <ProfileInfo/>
      <ProfileAbout/>
      <ProfileSkills/>
    </div>
  )
}

