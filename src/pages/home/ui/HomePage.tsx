import { useGetProfileQuery } from "@/entities";
import styles from "./HomePage.module.css";
import { calculateProfileComplete, ProfileCompletion } from "@/widgets/profileCompletion";
import { EmailVerificationBanner } from "@/widgets/emailVerificationBanner";

export const HomePage = () => {
  const { data: user } = useGetProfileQuery();
  if (!user) return null;

  const isProfileComplete = calculateProfileComplete(user) === 100;
  const isEmailVerified = user.isVerified ;

  return (
    <div className={styles.home}>
      <h1>Привет, {user?.username}!</h1>
      {!isProfileComplete && <ProfileCompletion user={user}/>}
      {!isEmailVerified && <EmailVerificationBanner user={user}/>}
      {isProfileComplete && isEmailVerified && (
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
