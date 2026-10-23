import { useFormContext } from 'react-hook-form'
import styles from './AboutTab.module.css'
import type { EditProfileFormValues } from '../../model/types';
import { ButtonLink } from '@/shared/ui/buttonLink';
import arrow from '../../assets/Vector.svg'

export const AboutTab = () => {
    const {register, watch} = useFormContext<EditProfileFormValues>();
    const description = watch('description') || '';
  return (
    <div className={styles.about}>
        <div className={styles.group}>
            <div className={styles.info}>
                <h3>О себе любимом(-ой)</h3>
                <p>Расскажи о себе всему сообществу. 
                    <br/>Мы ценим человека 
                    <br/>не за его профессиональные 
                    <br/>качества, поэтому пиши 
                    <br/>всё чем хочешь поделиться)</p>
            </div>
            <div className={styles.description}>
                <textarea 
                maxLength={1000} 
                placeholder="Расскажите о себе..."
                {...register('description')}
                />
                <span>{description.length}/1000</span>
            </div>
        </div>
        <ButtonLink
        link='/profile/edit/skills'
        linkText='Далее'
        img={arrow}
        className={styles.further}/>
    </div>
  )
}
