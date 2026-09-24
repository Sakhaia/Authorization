export const SOCIAL_AUTH_URLS = {
  telegram: 'https://t.me/s/yeahub',
  google: `${import.meta.env.VITE_API_URL}/auth/google`, 
  facebook: 'https://facebook.com',
} as const;

export type SocialProvider = keyof typeof SOCIAL_AUTH_URLS;