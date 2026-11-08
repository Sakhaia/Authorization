import { ButtonLink } from "@/shared/ui/buttonLink";
import styles from "./FormHeader.module.css";
import back from '../assets/Back.svg';
import { Button } from "@/shared/ui/button";

type FormHeaderProps = {
    fromPage: number;
    onDelete: () => void;
}

export const FormHeader = ({fromPage, onDelete}: FormHeaderProps) => {
  return (
    <div className={styles.header}>
      <ButtonLink
        link={`/specializations?page=${fromPage}`}
        img={back}
        className={styles.backBtn}
      />
      <div className={styles.actions}>
        <Button 
        type="button" 
        text="Удалить" 
        className={styles.deleteBtn} 
        onClick={onDelete}
        />

        <Button 
        type="submit" 
        text="Сохранить" 
        className={styles.saveBtn}
        />
      </div>
    </div>
  );
};
