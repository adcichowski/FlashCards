import styles from "./Form.module.scss";
import { Modal } from "../../Components/Modal/Modal";
import { Button } from "../../Components/Button/Button";
import { BackButton } from "../../Components/Button/BackButton/BackButton";
import { useFormLoginRegister } from "./useFormLoginRegister";
import { inputValidation } from "../../Utils/Utils";
import { Logo } from "../../Components/Logo/Logo";
import { Link } from "react-router-dom";
import { Game } from "../Game/Game";
function Form() {
  const {
    onSubmit,
    handleSubmit,
    register,
    errors,
    isRegister,
    handleClickRegister,
  } = useFormLoginRegister();
  return (
    <Game>
      <div className={styles.game}>
        <div className={styles.formLog}>
          <BackButton />
          <h1 className={styles.formTitle}>
            {isRegister ? "Register In" : "Log In"}
          </h1>
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
            <span className={styles.errorInfo}>
              {errors?.password?.message}
            </span>

            <div className={styles.formButtons}>
              <Button type="submit">{isRegister ? "Register" : "Login"}</Button>
              <Button type="button" onClick={handleClickRegister}>
                {isRegister ? "Back to login" : "Create account"}
              </Button>
            </div>
            <Link to="/" className={styles.formLogo}>
              <Logo />
            </Link>
          </form>
        </div>

        <Modal />
      </div>
    </Game>
  );
}
export { Form };
Form.displayName = "Form";
