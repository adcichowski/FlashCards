import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { BackButton } from "src/components/Button/BackButton/BackButton";

import { Input } from "src/components/Input/Input";

import { BackgroundGame } from "../../game/components/BackgroundGame/BackgroundGame";
import styles from "./Form.module.scss";

import { Button } from "src/components/Button/Button";
import type { useAuthMutation } from "../hooks/useAuthMutation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateLoginSchema, validateRegisterSchema } from "server/src/auth/auth-schema";

type FormTypes = {
  readonly register: { readonly username: string; readonly email: string; readonly password: string };
  readonly login: { readonly email: string; readonly password: string };
};

export function Form({
  typeForm,
  mutation,
  yupSchema,
}: {
  readonly typeForm: keyof FormTypes;
  readonly mutation: ReturnType<typeof useAuthMutation>;
  readonly yupSchema: typeof validateLoginSchema | typeof validateRegisterSchema;
}) {
  const isLoginPage = typeForm === "login";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTypes[typeof typeForm]>({
    resolver: yupResolver(yupSchema),
  });

  return (
    <BackgroundGame>
      <div className={styles.game}>
        <div className={`${styles.formLog} ${clsx(isLoginPage, styles.register)}`}>
          <BackButton pathTo="/" />
          <h1 className={styles.formTitle}>{`${typeForm} In`}</h1>
          <form autoComplete="off" className={styles.gameForm} onSubmit={handleSubmit((data) => mutation.mutate(data))}>
            {"username" in yupSchema.fields && (
              <div className={styles.containerInput}>
                <Input
                  label="username"
                  register={register}
                  className={styles.formInput}
                  labelClass={styles.formLabel}
                  autoComplete="off"
                />
                <span className={styles.errorInfo}>{"username" in errors ? errors?.username?.message : ""}</span>
              </div>
            )}
            <div className={styles.containerInput}>
              <Input
                label="email"
                register={register}
                className={styles.formInput}
                labelClass={styles.formLabel}
                autoComplete="off"
              />

              <span className={styles.errorInfo}>{errors?.email?.message}</span>
            </div>
            <div className={styles.containerInput}>
              <Input
                label="password"
                register={register}
                labelClass={styles.formLabel}
                type="password"
                className={styles.formInput}
                autoComplete="off"
              />
              <span className={styles.errorInfo}>{errors.password?.message}</span>
            </div>
            <div className={styles.containerSubmit}>
              <Button size="normal" type="submit">
                {typeForm}
              </Button>
            </div>
          </form>
          <p className={styles.question}>
            {isLoginPage ? "Haven't got an account?" : "Have account?"}{" "}
            <div className={styles.questionType}>
              <Link href={isLoginPage ? "/register" : "/login"}>{isLoginPage ? "Create Account" : "Login in"}</Link>
            </div>
          </p>
        </div>
      </div>
    </BackgroundGame>
  );
}
