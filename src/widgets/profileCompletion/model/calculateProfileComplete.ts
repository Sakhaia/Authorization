import type { ProfileResponse } from "@/entities";

export const calculateProfileComplete = (user: ProfileResponse): number => {
  const activeProfile = user.profiles.find((p) => p.isActive)

  const filds = [
    user.username,
    user.email,
    user.city,
    user.country,
    user.birthday,
    user.avatarUrl,
    user.profiles,
    activeProfile?.description,
    activeProfile?.profileSkills.length ? true : null,
  ];

  const filledFields = filds.filter((field) => {
    if (Array.isArray(field)) return field.length > 0;
    return Boolean(field);
  }).length; 
  const totalFields = filds.length;

  return Math.round((filledFields / totalFields) * 100);
}
