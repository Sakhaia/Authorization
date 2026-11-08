import type { UseFormReturn } from "react-hook-form";
import styles from "./FormDescription.module.css";
import type { SpecializationFormValue } from "../model/types";

type FormDescriptionProps = {
    form: UseFormReturn<SpecializationFormValue>;
}

export const FormDescription = ({form}: FormDescriptionProps) => {
  return (
    <div className={styles.wrapperTexarea}>
      <div className={styles.info}>
        <h2>Описание специализации</h2>
        <p>Добавьте развёрнутое описание для специализации</p>
      </div>
      <div className={styles.textareaWrapper}>
        <textarea
          id="description"
          className={styles.textarea}
          maxLength={1000}
          placeholder="Развёрнутое описание для специализации"
          {...form.register("description")}
        />
        <span className={styles.charCount}>
          {(form.watch("description") || "").length}/1000
        </span>
      </div>
    </div>
  );
};
