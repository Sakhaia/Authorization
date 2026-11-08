import { Select } from "@/shared/ui/select";
import styles from "./FormSkills.module.css";
import deleteSkill from "../assets/Icon_Button.svg";
import type { Skill } from "@/entities";
import type { UseFormReturn } from "react-hook-form";
import type { SpecializationFormValue } from "../model/types";

type FormSkillsProps = {
    skills: Skill[];
    selectedSkills: number[];
    form: UseFormReturn<SpecializationFormValue>;
}

export const FormSkills = ({skills, selectedSkills, form}: FormSkillsProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <h2>Навыки</h2>
        <p>
          Добавьте навыки в соответствии
          <br />
          со специализацией
        </p>
      </div>
      <div className={styles.skills}>
        <Select
          id="skills"
          placeholder="Выберите из списка"
          className={styles.skillsSelect}
          options={skills.map((s) => ({ value: s.id, label: s.title }))}
          onChange={(e) => {
            const skillId = Number(e.target.value);
            if (skillId && !selectedSkills.includes(skillId)) {
              form.setValue("profileSkills", [...selectedSkills, skillId], {
                shouldDirty: true,
              });
            }
            e.target.value = "";
          }}
        />

        {selectedSkills.length > 0 && (
          <div className={styles.selectedSkills}>
            <h4>Выбранные навыки</h4>
            <div className={styles.tags}>
              {selectedSkills.map((skillId) => {
                const skillInfo = skills.find((s) => s.id === skillId);
                if (!skillInfo) return null;

                return (
                  <div key={skillId} className={styles.tag}>
                    <div className={styles.tagContent}>
                      {skillInfo.imageSrc && <img src={skillInfo.imageSrc} />}
                      <span>{skillInfo.title}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        form.setValue(
                          "profileSkills",
                          selectedSkills.filter((id) => id !== skillId),
                          { shouldDirty: true },
                        );
                      }}
                    >
                      <img src={deleteSkill} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
