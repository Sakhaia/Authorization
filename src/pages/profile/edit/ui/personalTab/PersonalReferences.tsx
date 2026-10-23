import { Input } from '@/shared/ui/input'
import styles from './PersonalReferences.module.css'
import { Card } from '@/shared/ui/card'
import { useFormContext } from 'react-hook-form';
import { NETWORKS } from '../../model/networks';
import type { EditProfileFormValues } from '../../model/types';

export const PersonalReferences = () => {
    const {register} = useFormContext<EditProfileFormValues>();
  return (
    <Card className={styles.refs}>
      <div className={styles.info}>
        <h3>Личные ссылки</h3>
        <p>Поделитесь своими профилями 
            <br/>в других соц. сетях</p>
      </div>
      <div className={styles.networks}>
        {NETWORKS.map((network, index) => (
            <Input
            key={network.code}
            id={network.code}
            type='url'
            label={network.link}
            placeholder={network.placeholder}
            {...register(`socialNetwork.${index}.title` as const)}
            />
        ))}
      </div>
    </Card>
  )
}
