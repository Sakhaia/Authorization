import { Card } from '@/shared/ui/card'
import styles from './SpecializationSkills.module.css'
import type { Skill } from '@/entities'

type SpecializationSkillsProps = {
    skills: Skill[];
}

export const SpecializationSkills = ({skills}: SpecializationSkillsProps) => {
  return (
    <Card className={styles.skills}>
                <h3 className={styles.skillsTitle}>Навыки:</h3>
                <div className={styles.skillsList}>
                    {skills?.map((skill) => (
                        <div key={skill.id} className={styles.skillTag}>
                            <img src={skill.imageSrc} />
                            <span>{skill.title}</span>
                        </div>
                    ))}
                </div>
            </Card>
  )
}
