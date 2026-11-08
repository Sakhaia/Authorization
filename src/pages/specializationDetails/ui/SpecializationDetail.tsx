import styles from "./SpecializationDetail.module.css";
import { SpecializationHeader } from "./SpecializationHeader";
import { SpecializationSkills } from "./SpecializationSkills";
import { SpecializationContent } from "./SpecializationContent";
import { useSpecializationDetail } from "../model/useSpecializationDetail";

export const SpecializationDetail = () => {
  const {
    specialization,
    loadingSpec,
    loadingSkills,
    isDeleting,
    skills,
    id,
    handleDelete,
  } = useSpecializationDetail();
  if (!specialization) return <div>Специализация не найдена</div>;
  if (loadingSpec || loadingSkills || isDeleting) return <div>Загрузка...</div>;
  
  return (
    <div className={styles.specialization}>
      <SpecializationHeader
        id={Number(id)}
        onDelete={handleDelete}
        isDeleting={isDeleting}
      />
      <div className={styles.group}>
        <SpecializationContent specialization={specialization} />
        <SpecializationSkills skills={skills?.data || []} />
      </div>
    </div>
  );
};
