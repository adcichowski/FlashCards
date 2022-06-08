import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BackButton } from "src/Components/Button/BackButton/BackButton";
import { Button } from "src/Components/Button/Button";
import { Input } from "src/Components/Input/Input";
import { Modal } from "src/Components/Modal/Modal";
import { capitalize, inputValidation } from "src/Utils/Utils";
import { Game } from "../Game/Game";
import styles from "./Form.module.scss";
import { useFormLoginRegister } from "./useFormLoginRegister";

export function Form() {
  const router = useRouter();
  const typePage = capitalize(router.pathname.split("/")[1]);
  const isLoginPage = router.pathname.split("/")[1] === "login";
  const hrefArchon = isLoginPage ? "/register" : "/login";
  const { onSubmit, handleSubmit, register, errors } = useFormLoginRegister({
    type: typePage,
  });
  return (
    <Game>
      <div className={styles.game}>
        <div className={`${styles.formLog} ${clsx(isLoginPage, styles.register)}`}>
          <BackButton pathTo="/" />
          <h1 className={styles.formTitle}>{`${capitalize(typePage)} In`}</h1>

          <form className={styles.gameForm} onSubmit={handleSubmit(onSubmit)}>
            {!isLoginPage && (
              <Input
                labelText="Username"
                {...register("username", inputValidation.email)}
                className={styles.formInput}
                labelClass={styles.formLabel}
                autoComplete="off"
              />
            )}
            <Input
              labelText="Email"
              {...register("email", inputValidation.email)}
              className={styles.formInput}
              labelClass={styles.formLabel}
              autoComplete="off"
            />

            <span className={styles.errorInfo}>{errors?.email?.message} </span>
            <Input
              labelText="Password"
              {...register("email", inputValidation.email)}
              labelClass={styles.formLabel}
              className={styles.formInput}
              autoComplete="off"
            />
            <span className={styles.errorInfo}>{errors.password?.message}</span>

            <div className={styles.formButtons}>
              <Button size="normal" type="submit">
                {typePage}
              </Button>
            </div>
            <p className={styles.question}>
              {typePage === "Login" ? "Haven't got an account?" : "Have account?"}{" "}
              <span className={styles.questionType}>
                <Link href={hrefArchon}>{isLoginPage ? "Create Account" : "Login in"}</Link>
              </span>
            </p>
          </form>
        </div>

        <Modal />
      </div>
    </Game>
  );
}
