import { emailPattern, passwordRules, usernameRules } from "../model/validation";
import styles from "./FormFields.module.css";
import { Input } from "@/shared/ui/input";
import type { UseRegisterFormReturn } from "../model/types";

type FormFieldsProps = {
  form: UseRegisterFormReturn;
}

export const FormFields = ({form}: FormFieldsProps) => {
  return (
    <div className={styles.group}>
      <Input
        id="username"
        type="text"
        label="Никнейм"
        placeholder="Введите никнейм"
        error={form.errors.username?.message}
        {...form.register("username", usernameRules)}
      />

      <Input
        id="email"
        type="email"
        label="Электронная почта"
        placeholder="Введите электронную почту"
        error={form.errors.email?.message}
        {...form.register("email", {
          required: "Введите email",
          pattern: emailPattern,
        })}
      />

      <Input
        id="password"
        type="password"
        label="Пароль"
        placeholder="Введите пароль"
        rightSlot={true}
        error={form.errors.password?.message}
        {...form.register("password", passwordRules)}
      />

      <Input
        id="confirmPassword"
        type="password"
        label="Подтвердить пароль"
        placeholder="Введите пароль"
        rightSlot={true}
        error={form.errors.confirmPassword?.message}
        {...form.register("confirmPassword", {
          required: "Подтвердите пароль",
          validate: (value) =>
            value === form.getValues("password") || "Пароли не совпадают",
        })}
      />
    </div>
  );
};
