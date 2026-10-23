import { useGetProfileQuery, useUpdateProfileMutation, useUpdateUserMutation } from "@/entities";
import { useForm } from "react-hook-form";
import type { EditProfileFormValues } from "./types";
import { useEffect } from "react";
import { NETWORKS } from "./networks";
import { useNavigate } from "react-router-dom";

export const useEditProfileForm = () => {
  const { data: user } = useGetProfileQuery();
  const navigate = useNavigate();
  const [updateUser, { isLoading: isUserLoading }] = useUpdateUserMutation();
  const [updateProfile, { isLoading: isProfileLoading}] = useUpdateProfileMutation();

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
      image: null,
    },
  });

  useEffect(() => {
    if (user) {
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
        socialNetwork: NETWORKS.map((net) => ({code: net.code, title: ''})),
        image: null,
      });
    }
  }, [user, methods, activeProfile]);

  const onSubmit = async (data: EditProfileFormValues) => {
    if (!data.username?.trim() || !data.specializationId) {
      alert('Заполните обязательные поля: Никнейм, IT Специальность');
      return;
    }

    if (!user || !profileId) {
      console.warn('Нет user или profileId:', { user, profileId });
      return;
    } 

    try {
      await updateUser({
        id: user.id,
        data: {
          username: data.username.trim(),
          country: data.country,
          city: data.city,
          address: data.address,
          birthday: data.birthday,
          avatarImage: data.image ?? undefined,
        },
      }).unwrap();
      
      await updateProfile({
        id: profileId,
        data: {
          description: data.description,
          socialNetwork: data.socialNetwork,
          profileSkills: data.profileSkills ?? undefined,
        },
      }).unwrap()

      navigate("/profile");

    } catch (err) {
      console.error("Ошибка сохранения:", err);
    }
  };
  return {
    methods,
    onSubmit,
    isLoading
  }
};
