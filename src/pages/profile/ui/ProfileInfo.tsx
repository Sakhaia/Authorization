import styles from "./ProfileInfo.module.css";
import { Card } from "@/shared/ui/card";
import { getAge } from "@/shared/lib";
import { useGetProfileQuery } from "@/entities";

const ROLE_NAMES: Record<string, string> = {
  "candidate-free": "Кандидат",
};

export const ProfileInfo = () => {
  const { data: user } = useGetProfileQuery();
  return (
    <Card className={styles.info}>
      <img src={user?.avatarUrl} className={styles.avatar} />
      <div className={styles.content}>
        <div className={styles.block}>
          <h1 className={styles.username}>{user?.username}</h1>
          <div className={styles.nameBadge}>
            <span className={styles.badge}>
              {ROLE_NAMES[user?.userRoles[0].name ?? ""] ??
                user?.userRoles[0]?.name}
            </span>
          </div>
        </div>
        <div className={styles.group}>
          <span className={styles.age}>{getAge(user?.birthday)} лет</span>
          <span className={styles.address}>
            {user?.city}, {user?.country}
          </span>
        </div>
      </div>
    </Card>
  );
};
