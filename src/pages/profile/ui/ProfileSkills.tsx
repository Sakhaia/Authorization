import styles from "./ProfileSkills.module.css";
import { Card } from "@/shared/ui/card";
import type { Profile, } from "@/entities/model/types";

type ProfileSkillProps = {
  profile?: Profile
}

export const ProfileSkills = ({profile}: ProfileSkillProps) => {
  const skills = profile?.profileSkills ?? [];
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
