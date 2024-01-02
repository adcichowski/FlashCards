"use client";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { BackButton } from "src/components/Button/BackButton/BackButton";

import styles from "./Form.module.scss";

import { Button } from "src/components/Button/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateLoginSchema, validateRegisterSchema } from "server/src/auth/auth-schema";
import { Input } from "src/components/Input/Input";

type FormTypes = {
  readonly register: { readonly username: string; readonly email: string; readonly password: string };
  readonly login: { readonly email: string; readonly password: string };
};

export function Form({
  typeForm,
  serverAction,
  yupSchema,
}:
  | {
      readonly typeForm: "register";
      readonly serverAction: (data: {
        email: string;
        username: string;
        password: string;
      }) => Promise<{ userId: string } | undefined>;
      readonly yupSchema: typeof validateRegisterSchema;
    }
  | {
      readonly typeForm: "login";
      readonly serverAction: (data: { email: string; password: string }) => void;
      readonly yupSchema: typeof validateLoginSchema;
    }) {
  const isLoginPage = typeForm === "login";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTypes[typeof typeForm]>({
    resolver: yupResolver(yupSchema),
  });

  const onSubmit = handleSubmit((v) => {
    if (typeForm === "login") {
      serverAction(v);
    }
    if (typeForm === "register" && "username" in v) {
      const res = serverAction(v);
    }
  });
  return (
    <div className={styles.game}>
      <div className={`${styles.formLog} ${clsx(isLoginPage, styles.register)}`}>
        <BackButton pathTo="/" />
        <h1 className={styles.formTitle}>{`${typeForm} In`}</h1>
        <form autoComplete="off" className={styles.gameForm} onSubmit={onSubmit}>
          {"username" in yupSchema.fields && (
            <div className={styles.containerInput}>
              <Input {...register("username")} labelClass={styles.formLabel} autoComplete="off" />
              <div className={styles.errorInfo}>{"username" in errors ? errors?.username?.message : ""}</div>
            </div>
          )}
          <div className={styles.containerInput}>
            <Input {...register("email")} labelClass={styles.formLabel} autoComplete="off" />

            <div className={styles.errorInfo}>{errors?.email?.message}</div>
          </div>
          <div className={styles.containerInput}>
            <Input {...register("password")} labelClass={styles.formLabel} type="password" autoComplete="off" />
            <div className={clsx(styles.errorInfo, styles.errorInfoPassword)}>{errors.password?.message}</div>
          </div>
          <div className={styles.containerSubmit}>
            <Button size="normal" type="submit">
              {typeForm}
            </Button>
          </div>
        </form>
        <div className={styles.question}>
          {isLoginPage ? "Haven't got an account?" : "Have account?"}{" "}
          <p className={styles.questionType}>
            <Link href={isLoginPage ? "/register" : "/login"}>{isLoginPage ? "Create Account" : "Login in"}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
