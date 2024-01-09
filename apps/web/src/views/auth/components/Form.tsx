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
import { useModalContext } from "src/context/ModalContext";

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
      }) => Promise<{ userId: string } | { message: string }>;
      readonly yupSchema: typeof validateRegisterSchema;
    }
  | {
      readonly typeForm: "login";
      readonly serverAction: (data: { email: string; password: string }) => void;
      readonly yupSchema: typeof validateLoginSchema;
    }) {
  const isLoginPage = typeForm === "login";
  const { openModal } = useModalContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTypes[typeof typeForm]>({
    resolver: yupResolver(yupSchema),
  });

  const onSubmit = handleSubmit(async (v) => {
    if (typeForm === "login") {
      serverAction(v);
    }
    if (typeForm === "register" && "username" in v) {
      const res = await serverAction(v);

      "userId" in res
        ? openModal({ message: "Successfully create user!", type: "success" })
        : openModal({ message: res.message, type: "error" });
    }
  });
  return (
    <div className={styles.game}>
      <div className={`${styles.formLog} ${clsx(isLoginPage, styles.register)}`}>
        <BackButton pathTo="/" />
        <h1 className={styles.formTitle}>{`${typeForm} In`}</h1>
        <form autoComplete="off" className={styles.gameForm} onSubmit={onSubmit}>
          {"username" in yupSchema.fields && (
            <InputWrapper error={"username" in errors ? errors?.username?.message : ""}>
              <Input {...register("username")} labelClass={styles.formLabel} autoComplete="off" />
            </InputWrapper>
          )}
          <InputWrapper error={errors.email?.message}>
            <Input {...register("email")} labelClass={styles.formLabel} autoComplete="off" />
          </InputWrapper>

          <InputWrapper isPasswordInput error={errors.password?.message}>
            <Input {...register("password")} labelClass={styles.formLabel} type="password" autoComplete="off" />
          </InputWrapper>

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

const InputWrapper = ({
  error = "",
  children,
  isPasswordInput,
}: {
  error?: string;
  children: JSX.Element;
  isPasswordInput?: boolean;
}) => {
  return (
    <div className={styles.containerInput}>
      {children}
      <div className={clsx(styles.errorInfo, isPasswordInput && styles.errorInfoPassword)}>{error}</div>
    </div>
  );
};
