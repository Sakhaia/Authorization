import { Card } from "@/shared/ui/card";
import styles from "./SpecializationContent.module.css";
import type { Specialization } from "@/entities";

type SpecializationContentProps = {
    specialization: Specialization;
}

export const SpecializationContent = ({specialization}: SpecializationContentProps) => {
  return (
    <div className={styles.content}>
      <Card className={styles.info}>
        <img src={specialization?.imageSrc} className={styles.infoImg} />
        <h1 className={styles.title}>{specialization?.title}</h1>
      </Card>
      <Card className={styles.description}>
        <h2 className={styles.descriptionTitle}>Описание специализации</h2>
        <p className={styles.descriptionText}>{specialization?.description}</p>
      </Card>
    </div>
  );
};
