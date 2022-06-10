import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BackButton } from "src/components/Button/BackButton/BackButton";

import { Input } from "src/components/Input/Input";
import { Modal } from "src/components/Modal/Modal";
import { capitalize, inputValidation } from "src/Utils/Utils";
import { BackgroundGame } from "../../game/components/BackgroundGame/BackgroundGame";
import styles from "./Form.module.scss";
import { useFormLoginRegister } from "../hooks/useFormLoginRegister";
import { Button } from "src/components/Button/Button";

export function Form() {
  const router = useRouter();
  const typePage = capitalize(router.pathname.split("/")[1]);
  const isLoginPage = router.pathname.split("/")[1] === "login";
  const hrefArchon = isLoginPage ? "/register" : "/login";
  const { onSubmit, handleSubmit, register, errors } = useFormLoginRegister({
    type: typePage,
  });
  return (
    <BackgroundGame>
      <div className={styles.game}>
        <div className={`${styles.formLog} ${clsx(isLoginPage, styles.register)}`}>
          <BackButton pathTo="/" />
          <h1 className={styles.formTitle}>{`${capitalize(typePage)} In`}</h1>

          <form className={styles.gameForm} onSubmit={handleSubmit(onSubmit)}>
            {!isLoginPage && (
              <div className={styles.containerInput}>
                <Input
                  labelText="Username"
                  {...register("username", inputValidation.username)}
                  className={styles.formInput}
                  labelClass={styles.formLabel}
                  autoComplete="off"
                />
                <span className={styles.errorInfo}>{errors.username?.message}</span>
              </div>
            )}
            <div className={styles.containerInput}>
              <Input
                labelText="Email"
                {...register("email", inputValidation.email)}
                className={styles.formInput}
                labelClass={styles.formLabel}
                autoComplete="off"
              />

              <span className={styles.errorInfo}>{errors?.email?.message} </span>
            </div>
            <div className={styles.containerInput}>
              <Input
                labelText="Password"
                {...register("password", inputValidation.password)}
                labelClass={styles.formLabel}
                type="password"
                className={styles.formInput}
                autoComplete="off"
              />
              <span className={styles.errorInfo}>{errors.password?.message}</span>
            </div>

            <Button size="normal" type="submit">
              {typePage}
            </Button>
          </form>
          <p className={styles.question}>
            {typePage === "Login" ? "Haven't got an account?" : "Have account?"}{" "}
            <span className={styles.questionType}>
              <Link href={hrefArchon}>{isLoginPage ? "Create Account" : "Login in"}</Link>
            </span>
          </p>
        </div>

        <Modal />
      </div>
    </BackgroundGame>
  );
}
