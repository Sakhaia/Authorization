import { Outlet } from 'react-router-dom'
import styles from './AuthLayout.module.css'
import { AuthSidebar } from '@/widgets/authSidebar'

export const AuthLayout = () => {
  return (
    <div className={styles.layout}>
      <AuthSidebar/>
      <main className={styles.content}>
        <Outlet/>
      </main>
    </div>
  )
}
