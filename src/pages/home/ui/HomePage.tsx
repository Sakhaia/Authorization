import { useGetProfileQuery } from "@/entities";
import styles from "./HomePage.module.css";
import { calculateProfileComplete, ProfileCompletion } from "@/widgets/profileCompletion";
import { EmailVerificationBanner } from "@/widgets/emailVerificationBanner";

export const HomePage = () => {
  const { data: user } = useGetProfileQuery();
  const isProfileComplete = user ? calculateProfileComplete(user) === 100 : false;
  const isEmailVerified = user?.isVerified ?? false;

  return (
    <div className={styles.home}>
      <h1>Привет, {user?.username}!</h1>
      {user && !isProfileComplete && <ProfileCompletion user={user}/>}
      {user && isProfileComplete && !isEmailVerified && <EmailVerificationBanner user={user}/>}
      {user && isProfileComplete && isEmailVerified && (
        <div className={styles.info}>
          <span>
            Скоро здесь будут отображаться мероприятия сообщества,
            <br />
            популярные статьи и многое ещё чего интересного)
          </span>
        </div>
      )}
    </div>

  )
};
