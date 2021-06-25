import Button from "../../../Button/Button";
import { UserData } from "../../../../Types/index";
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { inputValidation } from "../../../../Utils/Utils";
import { MouseEventHandler } from "react";
import Logo from "../../../Logo/Logo";
import { auth } from "../../../../lib/firebase/index";
import { useMainContext } from "../../../../Context/MainContext";
interface RegisterInt {
  handleClick: MouseEventHandler;
}
export default function Register({ handleClick }: RegisterInt) {
  const { isLoading, setLoading, setModal } = useMainContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async ({ email, password }: UserData) => {
    try {
      setLoading(true);
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (e) {
      setModal({ isOpen: true, type: "error", message: e?.message });
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
          <Button text="Register" />
        </div>
        <Link to="/">
          <Logo />
        </Link>
      </form>
    </div>
  );
}
