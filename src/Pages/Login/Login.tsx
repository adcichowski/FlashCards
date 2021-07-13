import Button from "../../Components/Button/Button";
import { Link, useHistory } from "react-router-dom";
import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { inputValidation } from "../../Utils/Utils";
import { MouseEventHandler } from "react";
import Logo from "../../Components/Logo/Logo";
import { auth } from "../../lib/firebase/index";
import { UserData } from "../../Types/index";
import { useMainContext } from "../../Context/MainContext";
import { useAuthContext } from "../../Context/AuthContext";
interface LoginInt {
  handleClickRegister: MouseEventHandler;
}
export default function Login({ handleClickRegister }: LoginInt) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const history = useHistory();
  const { dispatch } = useMainContext();
  const { dispatch: AuthDispatch } = useAuthContext();
  const onSubmit = async ({ email, password }: UserData) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      if (!auth?.currentUser?.uid) {
        throw Error("This account not exist!");
      }
      AuthDispatch({
        type: "logIn",
        setUser: { idUser: auth?.currentUser?.uid },
      });
      dispatch({
        type: "openModal",
        setModal: {
          type: "success",
          message: "You are login in webiste!",
        },
      });
      history.push("/game");
      reset();
    } catch (e) {
      console.log(e.message);
      dispatch({
        type: "openModal",
        setModal: {
          type: "error",
          message: e.message,
        },
      });
    }
  };

  return (
    <>
      <div className={styles.formLog}>
        <Link to="/" className={styles.backButton} />
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
