import Logo from "../../Components/Logo/Logo";
import styles from "./Game.module.scss";
import Login from "../../Components/Pages/Game/Login/Login";
export default function Game() {
  return (
    <section className={styles.game}>
      <div className={styles.gameLog}>
        <h1 className={styles.gameTitle}>Login In</h1>
        <Login />
        <a href="/">
          <Logo />
        </a>
      </div>
    </section>
  );
}
