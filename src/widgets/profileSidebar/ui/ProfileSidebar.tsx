import { Button } from '@/shared/ui/button'
import styles from './ProfileSidebar.module.css'
import SidebarHeader from './SidebarHeader'
import { SidebarNav } from './SidebarNav'
import {support, exit} from '../assets'
import { useLogout } from '@/features/auth'

type ProfileSidebarProps = {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const ProfileSidebar = ({isCollapsed, onToggle}: ProfileSidebarProps) => {
  const {handleLogout} = useLogout();
  return (
    <div className={styles.sidebar}>
      <SidebarHeader
      isCollapsed={isCollapsed}
      onToggle={onToggle}/>
      <div className={styles.main}>
        <SidebarNav
        isCollapsed={isCollapsed}
        />

        {!isCollapsed && <div className={styles.buttons}>
          <Button
          type='button'
          text='Поддержка'
          img={support}/>

          <Button
          type='button'
          text='Выход'
          img={exit}
          className={styles.exit}
          onClick={handleLogout}
          />{/* клик на logout */}
        </div>}
      </div>
    </div>
  )
}

