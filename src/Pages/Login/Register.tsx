import Button from "../../Components/Button/Button";
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";
import { inputValidation } from "../../Utils/Utils";
import Logo from "../../Components/Logo/Logo";
import useRegister from "./useRegister";

export default function Register({
  handleClickRegister,
}: {
  handleClickRegister: () => void;
}) {
  const { onSubmit, register, errors, handleSubmit } = useRegister();
  return (
    <div className={styles.formLog}>
      <Link to="/" className={styles.backButton} />
      <h4 className={styles.formTitle}>Register In</h4>
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
          <Button onClick={handleClickRegister}>Back to Login</Button>
        </div>
        <Link to="/">
          <Logo />
        </Link>
      </form>
    </div>
  );
}
