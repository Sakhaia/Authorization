import styles from './PersonalTab.module.css'
import { ProfilePhoto } from './ProfilePhoto'
import { PersonalInformation } from './PersonalInformation'
import { PersonalReferences } from './PersonalReferences'
import arrow from '..//../assets/Vector.svg'
import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/ui/button'

export const PersonalTab = () => {
  const {trigger, formState: {isSubmitting}} = useFormContext();
  const navigate = useNavigate();
  const handdleNext = async () => {
    const isValid = await trigger(['username', 'specializationId'])
    if (isValid) {
      navigate('/profile/edit/about')
    }
  }
  return (
    <div className={styles.personal}>
      <ProfilePhoto/>
      <PersonalInformation/>
      <PersonalReferences/>
      <Button
        type='button'
        text='Далее'
        onClick={handdleNext}
        img={arrow}
        className={styles.further}
        disabled={isSubmitting}/>
    </div>
  )
}

