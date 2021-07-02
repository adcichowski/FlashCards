import Button from "../../Components/Button/Button";
import { UserData } from "../../Types/index";
import { Link, useHistory } from "react-router-dom";
import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { inputValidation } from "../../Utils/Utils";
import Logo from "../../Components/Logo/Logo";
import { auth } from "../../lib/firebase/index";
import { useMainContext } from "../../Context/MainContext";
import { useAuthContext } from "../../Context/AuthContext";

export default function Register() {
  const history = useHistory();
  const { dispatch } = useMainContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { dispatch: AuthDispatch } = useAuthContext();
  const onSubmit = async ({ email, password }: UserData) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      if (!auth?.currentUser?.uid) {
        throw Error("This account not exist!");
      }
      AuthDispatch({
        type: "logIn",
        setUser: {
          idUser: auth?.currentUser?.uid,
        },
      });
      dispatch({
        type: "openModal",
        setModal: {
          type: "success",
          message: "Your are register in webiste!",
        },
      });
      history.push("/Auth");
    } catch (e) {
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
    <div className={styles.formLog}>
      <Link to="/" className={styles.backButton} />
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
          <Button>Register</Button>
        </div>
        <Link to="/">
          <Logo />
        </Link>
      </form>
    </div>
  );
}
