import styles from './SidebarHeader.module.css';
import logo from '../assets/logo.svg'
import logoText from '../assets/Yeahub.svg'
import collapse from '../assets/Vector.svg';

type SidebarHeaderProps = {
  isCollapsed: boolean;
  onToggle: () => void;
}

const SidebarHeader = ({isCollapsed, onToggle}: SidebarHeaderProps) => {
  return (
    <div className={isCollapsed ? styles.collapseHeader : styles.header}>
      <div className={styles.logo}>
        <img src={logo} className={styles.logoImg}/>
        <img src={logoText} className={isCollapsed ? styles.collapseLogoText : styles.logoText}/>
      </div>
      <button 
      type='button' 
      onClick={onToggle}
      className={styles.collapseBtn}>
        <img src={collapse} className={isCollapsed ? styles.collapseRotate : styles.collapseImg}/>
        </button>
    </div>
  )
}

export default SidebarHeader
