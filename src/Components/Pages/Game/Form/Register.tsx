import Button from "../../../Button/Button";
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { inputValidation } from "../../../../Utils/Utils";
import { MouseEventHandler } from "react";
import Logo from "../../../Logo/Logo";
interface RegisterInt {
  handleClick: MouseEventHandler;
}
export default function Register({ handleClick }: RegisterInt) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: JSON) => console.log(data);
  return (
    <div className={styles.formLog}>
      <h1 className={styles.formTitle}>Register In</h1>
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
        <span className={styles.errorInfo}>{errors?.email?.message}</span>
        <span className={styles.errorInfo}>{errors?.password?.message}</span>

        <div className={styles.formButtons}>
          <Button text="Login" onClickAction={handleClick} />
        </div>
        <Link to="/">
          <Logo />
        </Link>
      </form>
    </div>
  );
}
