import Button from "../../../Button/Button";
import { UserData } from "../../../../Types/index";
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { inputValidation } from "../../../../Utils/Utils";
import Logo from "../../../Logo/Logo";
import { auth } from "../../../../lib/firebase/index";
import { useMainContext } from "../../../../Context/MainContext";
import { MouseEventHandler } from "react";
import { useGameContext } from "../../../../Context/GameContext";
import { useSendData } from "../../../../lib/firebase/Hooks";
interface RegisterInt {
  handleClickRegister: MouseEventHandler;
}
export default function Register({ handleClickRegister }: RegisterInt) {
  const { setLoading, setModal } = useMainContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async ({ email, password }: UserData) => {
    setLoading(true);
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      setModal({
        isOpen: true,
        type: "success",
        message: "Now, just login in and play!",
      });
      //@ts-ignore
      console.log(currentUser);
    } catch (e) {
      setModal({ isOpen: true, type: "error", message: e?.message });
    } finally {
      setLoading(false);
    }
  };
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
        <span className={styles.errorInfo}>{errors?.email?.message}</span>
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
          <Button text="Register" />
        </div>
        <Link to="/">
          <Logo />
        </Link>
      </form>
    </div>
  );
}
