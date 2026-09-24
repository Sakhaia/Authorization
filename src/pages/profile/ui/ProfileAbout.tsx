import { useGetProfileQuery } from "@/entities";
import styles from "./ProfileAbout.module.css";
import { Card } from "@/shared/ui/card";

export const ProfileAbout = () => {
  const { data: user } = useGetProfileQuery();
  return (
    <Card className={styles.about}>
      <h2>Обо мне</h2>
      <span>{user?.profiles[0].description}</span>
    </Card>
  );
};
