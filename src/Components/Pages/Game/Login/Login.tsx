import Button from "../../../Button/Button";
import styles from "./Login.module.scss";
export default function Login() {
  return (
    <form className={styles.gameForm}>
      <label htmlFor="email" className="sr-only">
        Email
      </label>
      <input
        className={styles.formEmail}
        id="email"
        placeholder="Email"
        type="text"
        autoComplete="off"
      />
      <label htmlFor="password" className="sr-only">
        Password
      </label>
      <input
        className={styles.formEmail}
        id="password"
        type="password"
        name="Password"
        placeholder="Password"
        autoComplete="off"
      />

      <div className={styles.formButtons}>
        <Button text="Login" />
        <Button text="Create Account" link="register" />
      </div>
    </form>
  );
}
