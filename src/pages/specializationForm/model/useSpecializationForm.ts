import { useCreateSpecializationMutation, useDeleteSpecializationMutation, useGetSkillsQuery, useGetSpecializationQuery, useUpdateSpecializationMutation } from "@/entities";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { SpecializationFormValue } from "./types";
import { useEffect } from "react";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";


export const useSpecializationForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [updateSpec, { isLoading: isLoadingSpec }] = useUpdateSpecializationMutation();
  const [createSpec, {  isLoading: isCreating }] = useCreateSpecializationMutation();
  const { data: spec, isLoading: isLoadingSpecs } = useGetSpecializationQuery(Number(id), {skip: !id});
  const { data: allSkills, isLoading: isLoadingSkills } = useGetSkillsQuery({
    specializations: id ? [Number(id)] : [],
    limit: 100,
  });
  const [ deleteSpec, { isLoading: isDeleting}] = useDeleteSpecializationMutation();
  const skills = allSkills?.data || [];

  const isLoading = isLoadingSpec || isLoadingSpecs || isCreating || isLoadingSkills || isDeleting;
  
  const methods = useForm<SpecializationFormValue>({
    defaultValues: {
      title: "",
      description: "",
      specializationImage: null,
      profileSkills: [],
    },
  });

  const { handleSubmit, reset, watch, setValue, register } = methods;

  useEffect(() => {
    if (spec) {
      reset({
        title: spec.title,
        description: spec.description,
        specializationImage: null,
        profileSkills: [],
      });
    }
  }, [spec, reset]);

  
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.fromPage || 1;

  const onSubmit = async (data: SpecializationFormValue) => {
    try {
      const payload = {
        title: data.title,
        description: data.description,
        specializationImage: data.specializationImage || undefined,
      };

      if (isEdit) {
        await updateSpec({id: Number(id), data: payload}).unwrap();
      } else {
        await createSpec(payload).unwrap();
      }

      navigate(`/specializations?page=${fromPage}`)
    } catch (err) {
      console.log('Ошибка сохранения:', err)
      alert('Не удалось сохранить')
    }
  };

  const selectedSkills = watch("profileSkills") || [];

  const handleDelete = async () => {
    if (!id) return;

    const isConfirmed = window.confirm("Вы уверены, что хотите удаить эту специаизацию?");

    if (isConfirmed) {
      try {
        await deleteSpec(Number(id)).unwrap()
        navigate(`/specializations?page=${fromPage}`)
      } catch (err) {
          const error = err as FetchBaseQueryError;
          console.error('Ошибка удаления:', err);

          if (error.status === 403) {
            alert('У вас нет прав на удаление этой специализации. Требуются права администратора');
          } else {
            alert('Не удалось удалить специализацию');
    }
      }
    }
  }
  return {
    methods,
    handleSubmit: handleSubmit(onSubmit),
    register,
    fromPage,
    skills,
    selectedSkills,
    setValue,
    watch,
    isLoading,
    handleDelete
  }
}
