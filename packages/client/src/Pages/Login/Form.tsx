import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Button } from "src/Components/Button/Button";
import { Input } from "src/Components/Input/Input";
import style from "./Form.module.scss";

export function Form() {
  const router = useRouter();
  const isLoginPage = router.asPath.slice(1) === "login";
  const hrefArchon = isLoginPage ? "/register" : "/login";
  const subTitle = isLoginPage
    ? "Hey, enter your details to get sign in to your account"
    : "Welcome new gamer in our website, create account and improve yourself";
  return (
    <>
      <div className={style.wrapper}>
        <section className={style.containerForm}>
          <h1 className={style.formTitle}>{isLoginPage ? "Sign Up" : "Register In"}</h1>
          <p className={style.formSubtitle}>{subTitle}</p>

          <form className={style.form}>
            <Input labelText="Username" labelClass={style.formLabel} className={style.formInput} />
            <Input labelText="Email" labelClass={style.formLabel} className={style.formInput} />
            <Input type="password" labelText="Password" labelClass={style.formLabel} className={style.formInput} />
            <Button secondary size="normal" type="submit">
              {isLoginPage ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <div className={style.questionForm}>
            Don’t have account?
            <Link href={hrefArchon}>
              <a href={hrefArchon} className={style.archon}>
                {isLoginPage ? "Register Now" : "Login Now"}
              </a>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
