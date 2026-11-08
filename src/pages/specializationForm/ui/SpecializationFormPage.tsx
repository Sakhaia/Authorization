import styles from "./SpecializationFormPage.module.css";
import { Card } from "@/shared/ui/card";
import { useSpecializationForm } from "../model/useSpecializationForm";
import { FormHeader } from "./FormHeader";
import { FormName } from "./FormName";
import { FormImage } from "./FormImage";
import { FormSkills } from "./FormSkills";
import { FormDescription } from "./FormDescription";

export const SpecializationFormPage = () => {
  const {
    methods,
    handleSubmit,
    fromPage,
    skills,
    selectedSkills,
    isLoading,
    handleDelete,
  } = useSpecializationForm();
  
  if (isLoading) return <div>Загрузка ...</div>
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <FormHeader fromPage={fromPage} onDelete={handleDelete}/>
      <Card className={styles.edit}>
        <h1>Специализация</h1>
        <div className={styles.content}>
          <FormName form={methods}/>
          <FormImage form={methods}/>
          <FormSkills 
          skills={skills}
          selectedSkills={selectedSkills}
          form={methods}/>
          <FormDescription form={methods}/>
        </div>
      </Card>
    </form>
  );
};
