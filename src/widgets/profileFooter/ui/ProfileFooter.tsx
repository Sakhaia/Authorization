import styles from './ProfileFooter.module.css';
import logo from '../assets/Logo.svg';
import figma from '../assets/Figma.svg';
import tg from '../assets/Telegram.svg';
import yt from '../assets/Youtube.svg';
import tt from '../assets/Tiktok.svg';
import gh from '../assets/Github.svg';

export const ProfileFooter = () => {
    const currentYear = new Date().getFullYear();
  return (
    <div className={styles.footer}>
      <img src={logo} className={styles.logo}/>
      <span className={styles.slogan}>
        Выбери, каким будет IT завтра, вместе с нами
      </span>
      <span className={styles.description}>
        YeaHub — это полностью открытый проект, призванный объединить и улучшить IT-сферу. Наш исходный код доступен для просмотра на GitHub. Дизайн проекта также открыт для ознакомления в Figma.
      </span>
      <div className={styles.side}/>
      <div className={styles.group}>
        <div className={styles.info}>
            <span className={styles.text}>
              &copy; {currentYear} YeahHub
            </span>
            <a href="/document" className={styles.text}>
              Документы
            </a>
        </div>
        <div className={styles.social}>
            <span className={styles.text}>
                Ищите нас и в других соцсетях @yeahub_it
            </span>
            <div className={styles.socialIcons}>
                <a href="#!"><img src={figma} className={styles.socialIcon}/></a>
                <a href="#!"><img src={tg} /></a>
                <a href="#!"><img src={yt} /></a>
                <a href="#!"><img src={tt} /></a>
                <a href="#!"><img src={gh} /></a>
            </div>
        </div>
      </div>
    </div>
  )
}

