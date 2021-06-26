import Button from "../../../../Components/Button/Button";
import { Link, useHistory } from "react-router-dom";
import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { inputValidation } from "../../../../Utils/Utils";
import { MouseEventHandler } from "react";
import Logo from "../../../Logo/Logo";

import { auth } from "../../../../lib/firebase/index";
import { UserData } from "../../../../Types/index";
import { useMainContext } from "../../../../Context/MainContext";
interface LoginInt {
  handleClickRegister: MouseEventHandler;
}
export default function Login({ handleClickRegister }: LoginInt) {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { setModal, setLoading } = useMainContext();
  const onSubmit = async ({ email, password }: UserData) => {
    setLoading(true);
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setLoading(false);
      reset();
      history.push("/board");
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
            <Button text="Create Account" onClickAction={handleClickRegister} />
          </div>
          <Link to="/">
            <Logo />
          </Link>
        </form>
      </div>
    </>
  );
}
