import styles from './SocialAuth.module.css'
import tg from '../assets/Telegram.svg'
import google from '../assets/google.svg'
import facebook from '../assets/facebook.svg'
import {useSocialAuth} from '../model/useSocialAuth'

const providers = [
  { id: 'telegram' as const, icon: tg },
  { id: 'google' as const, icon: google },
  { id: 'facebook' as const, icon: facebook },
] as const;

export const SocialAuth = () => {
  const {handleSocialLogin} = useSocialAuth();

  return (
    <div className={styles.section}>
      <span className={styles.socialText}>Зарегистрироваться через социальные сети</span>
      <div className={styles.buttons}>
        {providers.map(({id, icon}) => (
          <button
            key={id}
            id={id}
            type='button'
            onClick={() => handleSocialLogin(id)}
            className={styles.iconBtn}
          >
            <img src={icon} className={styles.link}/>
          </button>
        ))}
      </div>
    </div>
  )
}