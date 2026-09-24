/* import { Link } from 'react-router-dom'; */
import styles from './SidebarItem.module.css';
import arrow from '../assets/Alt Arrow Down.svg';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

type SidebarItemProps = {
    icon: string;
    iconActive?: string;
    label: string;
    hasArrow?: boolean;
    to?: string;
    isCollapsed: boolean;
}

export const SidebarItem = ({icon, iconActive, label, hasArrow, to, isCollapsed}: SidebarItemProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const handleToggle = () => setIsActive((prev: boolean) => !prev);
  const content = (
    <>
      <div className={styles.group}>
            <img src={icon} className={`${styles.icon} ${styles.iconDefault}`}/>
            <img src={iconActive} className={`${styles.icon} ${styles.iconActive}`}/>
            {!isCollapsed && <span className={isCollapsed ? styles.collapseLabel : styles.label}>{label}</span>}
        </div>
        {!isCollapsed && hasArrow && <img src={arrow} className={isActive ? styles.rotate : styles.arrow}/>}
    </>
  );

  if (to) {
    return (
      <NavLink to={to} className={({isActive}) => `${styles.item} ${isActive ? styles.active : ''}`}>
        {content}
      </NavLink>
    )
  }

  return (
    <button
    type='button' 
    onClick={handleToggle}
    className={`${styles.item} ${isActive ? styles.activeBtn : ''}`}>
        {content}
    </button>
  )
}

