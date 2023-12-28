"use client";
import { useForm } from "react-hook-form";
import { Button } from "src/components/Button/Button";
import { Input } from "src/components/Input/Input";
import { Textarea } from "src/components/Textarea/Textarea";
import styles from "./FooterForm.module.scss";
export function FooterForm() {
  const { register, handleSubmit, formState } = useForm<{ readonly email: string; readonly textarea: string }>();
  const { errors } = formState;
  return (
    <form className={styles.footerForm} onSubmit={() => handleSubmit}>
      <h3 className={styles.formTitle}>Send Us</h3>
      <p className={styles.formSubtitle}>We love got ideas</p>

      <Input label="Email" placeholder="Email" labelClass="sr-only" {...register("email")} />

      <span className={styles.formError}>{errors?.email?.message}</span>

      <Textarea label="Your idea" labelClass="sr-only" {...register("textarea")} placeholder="Your idea" />

      <Button size="normal" type="submit">
        Send ideas
      </Button>
    </form>
  );
}
