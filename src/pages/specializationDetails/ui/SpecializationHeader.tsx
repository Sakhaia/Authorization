import { ButtonLink } from '@/shared/ui/buttonLink'
import styles from './SpecializationHeader.module.css'
import { Button } from '@/shared/ui/button'
import { useLocation } from 'react-router-dom';
import arr from '../../../shared/assets/Arrows.svg'

type SpecializationHeaderProps = {
  id: number;
  onDelete: () => void;
  isDeleting: boolean;
}

export const SpecializationHeader = ({id, onDelete, isDeleting}: SpecializationHeaderProps) => {
    const location = useLocation();
    const fromPage = location.state?.fromPage || 1;
    
  return (
    <div className={styles.header}>
            <ButtonLink
            link={`/specializations?page=${fromPage}`}
            img={arr}
            className={styles.backBtn}
            />
            <div className={styles.actions}>
                <Button
                text='Удалить'
                className={styles.deleteBtn}
                onClick={onDelete}
                disabled={isDeleting}/>
                <ButtonLink
                link={`/specializations/${id}/edit`}
                linkText='Редактировать'
                className={styles.editBtn}/>
            </div>
        </div>
  )
}
