import { useGetProfileQuery } from "@/entities";
import styles from "./ProfileAbout.module.css";
import { Card } from "@/shared/ui/card";

export const ProfileAbout = () => {
  const { data: user } = useGetProfileQuery();
  const activeProfile = user?.profiles?.find((p) => p.isActive);
  return (
    <Card className={styles.about}>
      <h2>Обо мне</h2>
      <span>{activeProfile?.description ?? 'Информация не заполнена'}</span>
    </Card>
  );
};
