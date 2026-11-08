import { Controller, type UseFormReturn } from "react-hook-form";
import styles from "./FormImage.module.css";
import { ImageUploader } from "@/shared/ui/imageUploader";
import type { SpecializationFormValue } from "../model/types";

type FormImageProps = {
    form: UseFormReturn<SpecializationFormValue>;
}

export const FormImage = ({form}: FormImageProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <h2>Картинка специализации</h2>
        <p>Добавьте картинку специализации</p>
      </div>
      <div className={styles.image}>
        <Controller
          name="specializationImage"
          control={form.control}
          render={({ field }) => (
            <ImageUploader
              value={field.value ?? null}
              onChange={field.onChange}
            />
          )}
        />
      </div>
    </div>
  );
};
