import { SidebarItem } from './SidebarItem';
import styles from './SidebarNav.module.css';
import { study, homeB, home, profileB, profile, blogB, mentorsB, dbB, analyticsB, analytics} from '../assets';

type SidebarNavProps = {
  isCollapsed: boolean;
}

export const SidebarNav = ({isCollapsed}: SidebarNavProps) => {
  return (
    <div className={styles.nav}>
        <SidebarItem
        icon={homeB}
        iconActive={home}
        label='Главная'
        to='home'
        isCollapsed={isCollapsed}
        />

        <SidebarItem
        icon={profileB}
        iconActive={profile}
        label='Мой профиль'
        to='profile'
        isCollapsed={isCollapsed}
        />

        <div className={styles.board}/>
        
        <SidebarItem
        icon={study}
        label='Обучение'
        hasArrow={true}
        isCollapsed={isCollapsed}
        />

        <SidebarItem
        icon={blogB}
        label='Блог'
        hasArrow={true}
        isCollapsed={isCollapsed}
        />

        <SidebarItem
        icon={mentorsB}
        label='Менторы'
        hasArrow={true}
        isCollapsed={isCollapsed}
        />

        <SidebarItem
        icon={dbB}
        label='База знаний'
        hasArrow={true}
        isCollapsed={isCollapsed}
        />

        <SidebarItem
        icon={analyticsB}
        iconActive={analytics}
        label='Аналитика'
        to='home'
        isCollapsed={isCollapsed}
        />

    </div>
  )
}

