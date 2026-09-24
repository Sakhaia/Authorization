import styles from './AppLayout.module.css'
import { Outlet } from "react-router-dom"
import { ProfileHeader } from '@/widgets/profileHeader'
import { ProfileFooter } from '@/widgets/profileFooter'
import { ProfileSidebar } from '@/widgets/profileSidebar'
import { useState } from 'react'

export const AppLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const handleToggle = () => setIsCollapsed((prev) => !prev);

  return (
    <div className={`${styles.layout} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.sidebar}>
        <ProfileSidebar
        isCollapsed={isCollapsed}
        onToggle={handleToggle}/>
      </div>
      <div className={styles.header}>
        <ProfileHeader
        />
      </div>
        <main className={styles.main}>
          <Outlet/>
        </main>
        <div className={styles.footer}>
          <ProfileFooter/>
        </div>
    </div>
  )
}
