import styles from "./ProfileInfo.module.css";
import { Card } from "@/shared/ui/card";
import { getAge } from "@/shared/lib";
import { type ProfileResponse } from "@/entities";
import { ButtonLink } from "@/shared/ui/buttonLink";

type ProfileInfoProps = {
  user: ProfileResponse;
}

const ROLE_NAMES: Record<string, string> = {
  "candidate-free": "Кандидат",
};

export const ProfileInfo = ({user}: ProfileInfoProps) => {
  return (
    <Card className={styles.info}>
      <img src={user?.avatarUrl} className={styles.avatar} />
      <div className={styles.content}>
        <div className={styles.block}>
          <h1 className={styles.username}>{user?.username}</h1>
          <div className={styles.nameBadge}>
            {user?.userRoles?.[0] && (
              <span className={styles.badge}>
                {ROLE_NAMES[user.userRoles[0].name] ? user.userRoles[0].name : 'Роль не указана'}
              </span>
            )}
          </div>
          <ButtonLink
            link="/profile/edit/personal"
            linkText="Редактировать профиль"
            />
        </div>
        <div className={styles.group}>
          {user?.birthday && (<span className={styles.age}>{getAge(user.birthday)} лет</span>)}
          <span className={styles.address}>
            {user?.city}, {user?.country}
          </span>
        </div>
      </div>
    </Card>
  );
};
