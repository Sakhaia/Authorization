import styles from './Pagination.module.css'
import arr from '../../assets/Arrows.svg'
import { getPages } from '@/shared/lib';

type PaginationProps = {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({totalPages, currentPage, onPageChange}: PaginationProps) => {
  return (
    <div className={styles.pagination}>
      <button
      type='button'
      className={styles.arrow}
      disabled={currentPage === 1}
      onClick={() => onPageChange(currentPage - 1)}
      ><img src={arr} className={styles.arrLeft}/></button>

    {getPages(totalPages, currentPage).map((page, index) => (
        <button
        key={index}
        type='button'
        className={`${styles.pageBtn} ${page === currentPage ? styles.active : ''}`}
        onClick={() => typeof page === 'number' && onPageChange(page)}
        >{page}</button>
    ))}

      <button
      type='button'
      className={styles.arrow}
      disabled={currentPage === totalPages}
      onClick={() => onPageChange(currentPage + 1)}
      ><img src={arr} className={styles.arrLRight}/></button>
    </div>
  )
}

