import styles from './AuthFooter.module.css';
import { ButtonLink } from '@/shared/ui/buttonLink';

type AuthFooterProps = {
    question: string;
    link: string;
    linkText: string;
}

export const AuthFooter = ({question, link, linkText}: AuthFooterProps) => {
  return (
    <div className={styles.footer}>
        <span className={styles.question}>{question}</span>
        <ButtonLink
        link={link}
        linkText={linkText}
        className={styles.link}
        />
    </div>
  )
}

