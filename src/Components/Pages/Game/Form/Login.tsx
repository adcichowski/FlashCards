import Button from "../../../Button/Button";
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { inputValidation } from "../../../../Utils/Utils";
import { MouseEventHandler } from "react";
import Logo from "../../../Logo/Logo";

import { auth } from "../../../../lib/firebase/index";
import { UserData } from "../../../../Types/index";
import { useMainContext } from "../../../../Context/MainContext";
interface LoginInt {
  handleClick: MouseEventHandler;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Login({ handleClick, setLoading }: LoginInt) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setModal } = useMainContext();
  const onSubmit = async ({ email, password }: UserData) => {
    setLoading(true);
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setLoading(false);
    } catch (e) {
      setModal({ isOpen: true, type: "error", message: e?.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.formLog}>
        <h1 className={styles.formTitle}>Login In </h1>
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
            <Button text="Login" />
            <Button text="Create Account" onClickAction={handleClick} />
          </div>
          <Link to="/">
            <Logo />
          </Link>
        </form>
      </div>
    </>
  );
}
