import styles from "./Form.module.scss";
import Modal from "../../Components/Modal/Modal";
import Button from "../../Components/Button/Button";
import BackButton from "../../Components/Button/BackButton/BackButton";
import useFormLoginRegister from "./useFormLoginRegister";
import { inputValidation } from "../../Utils/Utils";
import Logo from "../../Components/Logo/Logo";
import { Link } from "react-router-dom";
export default function Form() {
  const {
    onSubmit,
    handleSubmit,
    register,
    errors,
    isRegisterAction,
    handleClickRegister,
  } = useFormLoginRegister();
  return (
    <div className={styles.game}>
      <>
        <div className={styles.formLog}>
          <BackButton />
          <h4 className={styles.formTitle}>
            {isRegisterAction ? "Log In" : "Register In"}
          </h4>
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
              <Button>{isRegisterAction ? "Login" : "Register"}</Button>
              <Button onClick={handleClickRegister}>
                {isRegisterAction ? "Create account" : "Back to login"}
              </Button>
            </div>
            <Link to="/">
              <Logo />
            </Link>
          </form>
        </div>
      </>
      <Modal />
    </div>
  );
}
