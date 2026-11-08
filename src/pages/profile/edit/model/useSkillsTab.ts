import { useFormContext } from "react-hook-form";
import type { EditProfileFormValues } from "./types";
import { useGetSkillsQuery } from "@/entities";
import { useEffect, useRef } from "react";


export const useSkillsTab = () => {
    const {
        watch,
        setValue,
        formState: { errors },
      } = useFormContext<EditProfileFormValues>();
      const specializationId = watch("specializationId");
      const selectedSkills = watch("profileSkills") || [];
      const prevSpecalzatonId = useRef(specializationId); // храним предыдущую спец, чтобы понять, изменилась ли
      const { data: skills, isLoading } = useGetSkillsQuery(
        { specializations: specializationId ? [specializationId] : [] },
        { skip: !specializationId },
      );
      const options =
        skills?.data.map((skill) => ({
          value: skill.id,
          label: skill.title,
        })) ?? [];

        useEffect(() => {
          if (prevSpecalzatonId.current !== specializationId) { // если спец изменилась
            setValue("profileSkills", [], {shouldDirty: true, shouldValidate: true}); // то очищаем выбранные навыки

            prevSpecalzatonId.current = specializationId;
          }
        }, [specializationId, setValue])

      const handleRemoveSkill = (id: number) => {
        setValue(
          "profileSkills",
          selectedSkills.filter((skillId) => skillId !== id),
          { shouldDirty: true, shouldValidate: true },
        );
      };

  return {
    errors,
    isLoading,
    options,
    handleRemoveSkill,
    specializationId,
    selectedSkills,
    setValue,
    skills,
  }
}

