import styles from './AuthSidebar.module.css'
import logoImg from '../assets/logoImg.svg'
import logoText from '../assets/logoText.svg'
import check from '../assets/check.svg'

export const AuthSidebar = () => {
  return (
    <aside className={styles.sidebar}>
        <div className={styles.brand}>
            <div className={styles.logo}>
                <div className={styles.logoCircle}>
                    <img src={logoImg} alt="" />
                </div>
                <img src={logoText} className={styles.logoText} />
            </div>
            <span>YeaHub объединяет IT-специалистов</span>
        </div>
        <div className={styles.benefits}>
            <h2>Стань частью сообщества YeaHub и получи:</h2>
            <ul>
                <li><img src={check} className={styles.checkIcon}/>Пошаговый план обучения</li>
                <li><img src={check} className={styles.checkIcon}/> Карьерный рост</li>
                <li><img src={check} className={styles.checkIcon}/> Большое сообщество специалистов</li>
                <li><img src={check} className={styles.checkIcon}/> Обучение с ментором</li>
                <li><img src={check} className={styles.checkIcon}/> Возможность прохождения стажировки</li>
            </ul>
        </div>
      </aside>
  )
}

