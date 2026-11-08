import { useGetProfileQuery, useUpdateProfileMutation, useUpdateUserMutation } from "@/entities";
import { useForm } from "react-hook-form";
import type { EditProfileFormValues } from "./types";
import { useEffect, useRef, useState } from "react";
import { NETWORKS } from "./networks";
import { useNavigate } from "react-router-dom";

export const useEditProfileForm = () => {
  const { data: user } = useGetProfileQuery();
  const navigate = useNavigate();
  const [updateUser, { isLoading: isUserLoading }] = useUpdateUserMutation();
  const [updateProfile, { isLoading: isProfileLoading}] = useUpdateProfileMutation();
  const [error, setError] = useState<string | null>(null);
  const isInitialized = useRef(false); // форму еще не заполняли

  const isLoading = isUserLoading || isProfileLoading;

  const activeProfile = user?.profiles.find((p) => p.isActive);
  const profileId = activeProfile?.id;
  const methods = useForm<EditProfileFormValues>({
    defaultValues: {
      username: "",
      country: "",
      city: "",
      address: "",
      birthday: "",
      avatarUrl: "",
      description: "",
      profileSkills: null,
      specializationId: undefined,
      socialNetwork: NETWORKS.map((net) => ({code: net.code, title: ''})),
      image: undefined, // изначально не определено (ничего не меняли)
    },
  });

  useEffect(() => {
      if (user && !isInitialized.current) {
        methods.reset({
          username: user.username,
          country: user.country,
          city: user.city,
          address: user.address,
          birthday: user.birthday ? user.birthday.slice(0, 10): "",
          avatarUrl: user.avatarUrl,
          description: activeProfile?.description || '',
          profileSkills: activeProfile?.profileSkills?.map((skill) => skill.id) || [],
          specializationId: activeProfile?.specializationId || undefined,
          socialNetwork: NETWORKS.map((net) => ({code: net.code, title: ''})), // показываем пустые поля, потому что в гет ниче не получаем
          image: undefined, // сбрасываем при загрузке
        });
        isInitialized.current = true; // форму заполнили
      }
  }, [user, methods, activeProfile]);

  const onSubmit = async (data: EditProfileFormValues) => {
    setError(null);
    
    if (!data.username?.trim() || !data.specializationId) {
      setError('Заполните обязательные поля: Никнейм, IT Специальность');
      return;
    }

    if (!user || !profileId) {
      setError('Не удалось загрузить данные профиля');
      return;
    } 

    let isUserUpdated = false; // ниче не сохр

    try {
      await updateUser({ // сохр никнейм
        id: user.id,
        data: {
          username: data.username.trim(),
          country: data.country,
          city: data.city,
          address: data.address,
          birthday: data.birthday,
          avatarImage: data.image === undefined ? undefined : data.image, 
        },
      }).unwrap();
      isUserUpdated = true; // первая поовина готова

      const filledSocials = data.socialNetwork.filter(net => net.title.trim() !== '')
      
      await updateProfile({
        id: profileId,
        data: {
          description: data.description,
          socialNetwork: filledSocials.length > 0 ? filledSocials : undefined, // если ничего не ввели, не отправалять. Сохранится то что было
          profileSkills: data.profileSkills ?? undefined,
        },
      }).unwrap()

      navigate("/profile");

    } catch (err) {
      console.error("Ошибка сохранения:", err);

      if(isUserUpdated) { // если все таки ошибка, сохранена только половина
        setError('Не сохранены описание и навыки. Попробуйте сохранить еще раз!')
      } else {
        setError('Не удалось сохранить изменения. Попробуйте еще раз')
      }
    }
  };
  return {
    methods,
    onSubmit,
    isLoading,
    error
  }
};
