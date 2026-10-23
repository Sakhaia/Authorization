import { useFormContext } from 'react-hook-form'
import styles from './PersonalInformation.module.css'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Select } from '@/shared/ui/select'
import { useGetSpecializationsQuery } from '@/entities'
import type { EditProfileFormValues } from '../../model/types'

export const PersonalInformation = () => {
    const {register, formState: {errors}} = useFormContext<EditProfileFormValues>();
    const {data: specializations, isLoading} = useGetSpecializationsQuery()
    const options = specializations?.data.map((spec) => ({
        value: spec.id,
        label: spec.title,
    })) ?? [];
    
  return (
    <Card className={styles.pers}>
      <div className={styles.info}>
        <h3>Персональная информация</h3>
        <p>Поделитесь своими профилями
            <br/>в других соц.сетях
        </p>
      </div>
      <div className={styles.fields}>
        <Input
        id='username'
        type='text'
        label='Никнейм *'
        placeholder='Введите никнейм'
        className={styles.inputInfo}
        error={errors.username?.message}
        {...register('username', {
            required: 'Введите никнейм',
        }) }
        />
        <Select
        id="specializationId"
        label='IT Специальность*'
        className={styles.inputInfo}
        options={options}
        error={errors.specializationId?.message}
        disabled={isLoading}
        {...register('specializationId', {
            required: 'Выберите специализацию',
            valueAsNumber: true,
        })}
        />
        <Input
        id='birthday'
        type='date'
        label='Дата рождения'
        error={errors.birthday?.message}
        {...register('birthday')}
        />
        <Input
        id='country'
        type='text'
        label='Страна'
        placeholder='Напр. Россия'
        className={styles.inputInfo}
        {...register('country') }
        />
        <Input
        id='city'
        type='text'
        label='Населенный пункт'
        placeholder='Напр. Санкт-Петербург'
        className={styles.inputInfo}
        {...register('city') }
        />
      </div>
    </Card>
  )
}

