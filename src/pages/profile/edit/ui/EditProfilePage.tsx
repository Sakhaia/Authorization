import { Card } from '@/shared/ui/card'
import sytles from './EditProfilePage.module.css'
import { NavLink, Outlet } from 'react-router-dom'
import { useEditProfileForm } from '../model/useEditProfileForm'
import { FormProvider } from 'react-hook-form'

export const EditProfilePage = () => {
  const {methods, onSubmit} = useEditProfileForm();
  return (
    <Card className={sytles.edit}>
      <div className={sytles.header}>
        <h1 className={sytles.title}>Редактирование профиля</h1>
        <nav className={sytles.navigation}>
          <NavLink to="/profile/edit/personal" className={({isActive}) => `${sytles.item} ${isActive ? sytles.itemActive : ''}`}>Личная информация</NavLink>
          <NavLink to="/profile/edit/about" className={({isActive}) => `${sytles.item} ${isActive ? sytles.itemActive : ''}`}>Обо мне</NavLink>
          <NavLink to="/profile/edit/skills" className={({isActive}) => `${sytles.item} ${isActive ? sytles.itemActive : ''}`}>Навыки</NavLink> 
          <NavLink to="/" className={({isActive}) => `${sytles.item} ${isActive ? sytles.itemActive : ''}`}>Проекты</NavLink>
          <NavLink to="/" className={({isActive}) => `${sytles.item} ${isActive ? sytles.itemActive : ''}`}>Опыт работы</NavLink>
          <NavLink to="/" className={({isActive}) => `${sytles.item} ${isActive ? sytles.itemActive : ''}`}>Образование</NavLink>
        </nav>
      </div>
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

