import { Checkbox } from "@/shared/ui/checkbox/Checkbox";
import styles from "./AgreementsSection.module.css";
import type { UseRegisterFormReturn } from "../model/types";

type AgreementsSectionProps = {
  form: UseRegisterFormReturn;
}

export const AgreementsSection = ({form}: AgreementsSectionProps) => {
  return (
    <div className={styles.agreements}>
      <p className={styles.hint}>
        Проставив галочку («✔») и нажимая «Зарегистрироваться»:
      </p>
      <div className={styles.checkbox}>
        <Checkbox
          id="agreeToDataProcessing"
          error={form.errors.agreeToDataProcessing?.message}
          {...form.register("agreeToDataProcessing", {
            required: "Необходимо согласие на обработку персональных данных",
          })}
        >
          Даю согласие на <a href="#">обработку ПД</a>, в соответствии с{" "}
          <a href="#">Политикой в отношении ПД</a>
        </Checkbox>
        <Checkbox
          id="agreeToTerms"
          error={form.errors.agreeToTerms?.message}
          {...form.register("agreeToTerms", {
            required: "Необходимо согласие с договором-офертой",
          })}
        >
          Я подтверждаю что ознакомился(-ась) с Договором-офертой
        </Checkbox>
        <Checkbox
          id="agreeToMarketing"
          error={form.errors.agreeToMarketing?.message}
          {...form.register("agreeToMarketing")}
        >
          Даю согласие на получение рекламных и информационных рассылок
        </Checkbox>
      </div>
    </div>
  );
};

