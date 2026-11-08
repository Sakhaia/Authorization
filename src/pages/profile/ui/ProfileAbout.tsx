import styles from "./ProfileAbout.module.css";
import { Card } from "@/shared/ui/card";
import type { Profile } from "@/entities/model/types";

type ProfileAboutProps = {
  profile?: Profile;
}

export const ProfileAbout = ({profile}: ProfileAboutProps) => {
  return (
    <Card className={styles.about}>
      <h2>Обо мне</h2>
      <span>{profile?.description ?? 'Информация не заполнена'}</span>
    </Card>
  );
};
