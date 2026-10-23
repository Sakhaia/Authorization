import { Select } from "@/shared/ui/select";
import styles from "./SkillsTab.module.css";
import { Button } from "@/shared/ui/button";
import { useSkillsTab } from "../../model/useSkillsTab";

export const SkillsTab = () => {
  const {
    errors,
    isLoading,
    options,
    handleRemoveSkill,
    specializationId,
    selectedSkills,
    setValue,
    skills
  } = useSkillsTab();

  return (
    <div className={styles.skills}>
      <div className={styles.group}>
        <div className={styles.info}>
          <h3>Твои навки</h3>
          <p>
            Покажи что ты умеешь
            <br />и в чем ты действительно хорош
          </p>
        </div>
        <div className={styles.skill}>
          <Select
            id="profileSkills"
            label="Навык"
            options={options}
            className={styles.selectSkills}
            placeholder="Выберите навык из списка"
            disabled={!specializationId || isLoading}
            onChange={(e) => {
              const skillId = Number(e.target.value);
              if (skillId && !selectedSkills.includes(skillId)) {
                setValue("profileSkills", [...selectedSkills, skillId], {
                  shouldDirty: true,
                });
              }
              e.target.value = '';
            }}
            error={errors.profileSkills?.message}
          />

          <div className={styles.selectedSkills}>
            <h4>Выбранные навыки</h4>
            <div className={styles.tags}>
              {selectedSkills.map((id) => {
                const skillInfo = skills?.data.find((s) => s.id === id);
                if (!skillInfo) return null;
                return (
                  <div key={id} className={styles.tag}>
                    <div className={styles.content}>
                      {skillInfo.imageSrc && (
                        <img
                          src={skillInfo.imageSrc}
                          onError={(e) =>
                            (e.currentTarget.style.display = "none")
                          }
                        />
                      )}
                      <span>{skillInfo.title}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(id)}
                      className={styles.removeBtn}
                    >
                      x
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Button type="submit" text="Сохранить" className={styles.submitBtn} />
    </div>
  );
};
