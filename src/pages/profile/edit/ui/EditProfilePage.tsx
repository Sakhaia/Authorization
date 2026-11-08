import { Card } from '@/shared/ui/card'
import styles from './EditProfilePage.module.css'
import { NavLink, Outlet } from 'react-router-dom'
import { useEditProfileForm } from '../model/useEditProfileForm'
import { FormProvider } from 'react-hook-form'

export const EditProfilePage = () => {
  const {methods, onSubmit, error} = useEditProfileForm();
  return (
    <Card className={styles.edit}>
      <div className={styles.header}>
        <h1 className={styles.title}>Редактирование профиля</h1>
        <nav className={styles.navigation}>
          <NavLink to="/profile/edit/personal" className={({isActive}) => `${styles.item} ${isActive ? styles.itemActive : ''}`}>Личная информация</NavLink>
          <NavLink to="/profile/edit/about" className={({isActive}) => `${styles.item} ${isActive ? styles.itemActive : ''}`}>Обо мне</NavLink>
          <NavLink to="/profile/edit/skills" className={({isActive}) => `${styles.item} ${isActive ? styles.itemActive : ''}`}>Навыки</NavLink> 
          <NavLink to="/" className={({isActive}) => `${styles.item} ${isActive ? styles.itemActive : ''}`}>Проекты</NavLink>
          <NavLink to="/" className={({isActive}) => `${styles.item} ${isActive ? styles.itemActive : ''}`}>Опыт работы</NavLink>
          <NavLink to="/" className={({isActive}) => `${styles.item} ${isActive ? styles.itemActive : ''}`}>Образование</NavLink>
        </nav>
      </div>

      {error && (
        <div style={{color: 'red'}}>{error}</div>
      )}

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit, (errors) => {
          console.log("Ошибка валидации:", errors)
        })}> 
          <Outlet/>
        </form>
      </FormProvider>
    </Card>
  )
}

