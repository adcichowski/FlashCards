import Button from "../../Components/Button/Button";
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";
import { inputValidation } from "../../Utils/Utils";
import { MouseEventHandler } from "react";
import Logo from "../../Components/Logo/Logo";
import BackButton from "../../Components/Button/BackButton/BackButton";
import useLogin from "./useLogin";
interface LoginInt {
  handleClickRegister: MouseEventHandler;
}
export default function Login({ handleClickRegister }: LoginInt) {
  const { onSubmit, handleSubmit, register, errors } = useLogin();
  return (
    <>
      <div className={styles.formLog}>
        <BackButton />
        <h4 className={styles.formTitle}>Login In </h4>
        <form className={styles.gameForm} onSubmit={handleSubmit(onSubmit)}>
          <label>
            <span className="sr-only">email</span>
            <input
              {...register("email", inputValidation.email)}
              className={styles.inputEmail}
              placeholder="Email:"
              autoComplete="off"
            />
          </label>
          <span className={styles.errorInfo}>{errors?.email?.message} </span>
          <label>
            <span className="sr-only">Password</span>
            <input
              {...register("password", inputValidation.password)}
              className={styles.inputPassword}
              placeholder="Password:"
              type="password"
              autoComplete="current-password"
            />
          </label>
          <span className={styles.errorInfo}>{errors?.password?.message}</span>

          <div className={styles.formButtons}>
            <Button>Login</Button>
            <Button onClick={handleClickRegister}>Create Account</Button>
          </div>
          <Link to="/">
            <Logo />
          </Link>
        </form>
      </div>
    </>
  );
}
