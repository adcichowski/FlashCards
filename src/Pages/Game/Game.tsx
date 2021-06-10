import Button from "../../Components/Button/Button";
import Logo from "../../Components/Logo/Logo";
import styles from "./Game.module.scss";

export default function Game() {
  return (
    <section className={styles.game}>
      <div className={styles.gameLog}>
        <h1 className={styles.gameTitle}>Login In</h1>
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
            type="text"
            name="Password"
            placeholder="Password"
            autoComplete="off"
          />
          <span>
            <input type="checkbox" id="remember" />
            <label htmlFor="rememeber">Remember</label>
          </span>
          <div className={styles.formButtons}>
            <Button text="Login" />
            <Button text="Create Account" />
          </div>
        </form>
        <a href="/">
          <Logo />
        </a>
      </div>
    </section>
  );
}
