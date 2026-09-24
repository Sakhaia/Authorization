import { SOCIAL_AUTH_URLS, type SocialProvider } from "./config";

export const useSocialAuth = () => {
    const handleSocialLogin = (provider: SocialProvider): void => {
        const url = SOCIAL_AUTH_URLS[provider];
        window.location.assign(url);
    }

  return {handleSocialLogin}
}

