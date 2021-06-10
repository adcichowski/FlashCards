import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import styles from "./Footer.module.scss";
export default function Footer() {
  let navigationLinks = [
    { name: "Home", path: "/" },
    { name: "Game", path: "/game" },
    { name: "Ranking", path: "/ranking" },
  ];
  return (
    <footer className={styles.footer}>
      <div className={styles.footerArticle}>
        <div className={styles.articleSection}>
          <Logo />
          <nav>
            <ul className={styles.listLinks}>
              {navigationLinks.map((element) => (
                <li key={element.name}>
                  <Link className={styles.link} to={element.path}>
                    {element.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className={styles.listSocial}>
              {["facebook", "twitter", "instagram"].map((socialName) => (
                <a key={socialName} href={`https://${socialName}.com`}>
                  <li className={`${styles[socialName]}`}></li>
                </a>
              ))}
            </ul>
          </nav>
        </div>

        <p className={styles.asideTitle}>A modern platform to get knowledge</p>
        <div>
          <small className={styles.right}>Term of Service</small>
          <small className={styles.right}>Privacy Policy</small>
        </div>
        <small className={styles.copyright}>
          &copy; 2021 FlashCards, All rights is us
        </small>
      </div>
      <form className={styles.footerForm}>
        <h3 className={styles.formTitle}>Send Us</h3>
        <p className={styles.formSubtitle}>We love got ideas</p>
        <label className="sr-only" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="Email"
          placeholder="Email"
          type="text"
          className={styles.formInput}
        />
        <label className="sr-only" htmlFor="idea">
          Your idea
        </label>
        <textarea
          id="idea"
          maxLength={255}
          placeholder="Your idea"
          name="Your idea"
          className={styles.formTextarea}
        />
        <Button text="Send ideas" />
      </form>
    </footer>
  );
}
