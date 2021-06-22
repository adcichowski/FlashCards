import styles from "Login.module.scss";
import Button from "../../../Button/Button";
export default function Register() {
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
        autoComplete="email"
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
      <label htmlFor="password" className="sr-only">
        Repeat Password
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
        <Button text="Create Account" link="register" />
      </div>
    </form>
  );
}
