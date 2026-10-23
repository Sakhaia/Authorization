import { useGetProfileQuery } from "@/entities";
import styles from "./ProfileSkills.module.css";
import { Card } from "@/shared/ui/card";

export const ProfileSkills = () => {
  const { data: user } = useGetProfileQuery();
  const activeProfile = user?.profiles?.find((p) => p.isActive);
  const skills = activeProfile?.profileSkills ?? [];
  return (
    <Card className={styles.skills}>
      <h2>Навыки</h2>
      <div className={styles.list}>
        {skills.length > 0 ? (
          skills.map((skill) => (
            <div key={skill.id} className={styles.tags}>
              <span className={styles.tag}>{skill.title}</span>
            </div>
          ))
        ) : (
          <span className={styles.empty}>Навыки не заполнены</span>
        )}
      </div>
    </Card>
  );
};
