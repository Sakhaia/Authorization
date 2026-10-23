import type { ProfileResponse } from "@/entities";

export const calculateProfileComplete = (user: ProfileResponse): number => {
  const filds = [
    user.username,
    user.email,
    user.phone,
    user.city,
    user.country,
    user.birthday,
    user.avatarUrl,
    user.telegramUsername,
    user.profiles,
  ];

  const filledFields = filds.filter(Boolean).length; 
  const totalFields = filds.length;

  return Math.round((filledFields / totalFields) * 100);
}
