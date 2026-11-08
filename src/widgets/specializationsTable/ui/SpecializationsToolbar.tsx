import styles from './SpecializationsToolbar.module.css'
import filter from '../assets/Filter icon.svg'
import loupe from '../assets/Magnifer.svg'
import add from '../assets/Add.svg'
import { ButtonLink } from '@/shared/ui/buttonLink';
import { Button } from '@/shared/ui/button';
import { useState } from 'react';

type SpecializationsToolbarProps = {
    searchValue: string;
    onSearchChange: (value: string) => void | undefined;
    onDelete: () => void;
    sortOrder: string;
    onSortChange: (order: string) => void;
}

export const SpecializationsToolbar = ({searchValue, onSearchChange, onDelete, sortOrder, onSortChange}: SpecializationsToolbarProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handleSortClick = (order: string) => {
    onSortChange(order)
    setIsFilterOpen(false)
  }
  return (
    <div className={styles.toolbar}>
      <div className={styles.left}>
        <div className={styles.filterWrapper}>
          <Button 
          type='button'
          className={styles.filter}
          img={filter}
          onClick={() => setIsFilterOpen(!isFilterOpen)} />

          {isFilterOpen && (
            <div className={styles.filterMenu}>
              <button 
                type="button"
                className={`${styles.filterItem} ${sortOrder === 'asc' ? styles.filterItemActive : ''}`}
                onClick={() => handleSortClick('asc')}
              >
                (А-Я)
              </button>
              <button 
                type="button"
                className={`${styles.filterItem} ${sortOrder === 'desc' ? styles.filterItemActive : ''}`}
                onClick={() => handleSortClick('desc')}
              >
                (Я-А)
              </button>
            </div>
          )}
        </div>
        <div className={styles.wrapper}>
            <img src={loupe} />
            <input 
            type="text"
            placeholder='Поиск'
            className={styles.input}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)} />
        </div>
      </div>
      <div className={styles.right}>
        <Button 
        type='button'
        text='Удалить выбранное' 
        className={styles.delete}
        onClick={onDelete}/>
        <ButtonLink
        linkText='Добавить'
        link='/specializations/create'
        className={styles.addBtn}
        img={add}/>
      </div>
    </div>
  )
}

