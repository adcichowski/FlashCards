import Button from "../../Components/Button/Button";
import { UserData } from "../../Types/index";
import { Link, useHistory } from "react-router-dom";
import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { inputValidation } from "../../Utils/Utils";
import Logo from "../../Components/Logo/Logo";
import { auth } from "../../lib/firebase/index";
import { useMainContext } from "../../Context/MainContext";
import { useGameContext } from "../../Context/GameContext";

export default function Register() {
  const history = useHistory();
  const { setLoading, setModal } = useMainContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setUser } = useGameContext();
  const onSubmit = async ({ email, password }: UserData) => {
    setLoading(true);
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      if (!auth?.currentUser?.uid) {
        throw Error("This account not exist!");
      }
      setUser({
        isLogin: true,
        idUser: auth?.currentUser?.uid,
      });
      setModal({
        isOpen: true,
        type: "success",
        message: "Now, just login in and play!",
      });
      history.push("/game");
    } catch (e) {
      setModal({ isOpen: true, type: "error", message: e?.message });
    } finally {
      setLoading(false);
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
          <Button text="Register" />
        </div>
        <Link to="/">
          <Logo />
        </Link>
      </form>
    </div>
  );
}
