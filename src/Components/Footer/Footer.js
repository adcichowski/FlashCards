import React from "react";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import styles from "./Footer.module.scss";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerArticle}>
        <div className={styles.articleSection}>
          <Logo />
          <nav>
            <ul className={styles.listLinks}>
              {["Home", "About", "Game"].map((linkName) => (
                <li key={linkName} className={styles.link}>
                  {linkName}
                </li>
              ))}
            </ul>
            <ul className={styles.listSocial}>
              {["facebook", "twitter", "instagram"].map((socialName) => (
                <li key={socialName} className={`${styles[socialName]}`}></li>
              ))}
            </ul>
            <small>&copy; 2021 FlashCards, All rights is us</small>
          </nav>
        </div>
        <div className={styles.articleAside}>
          <p className={styles.asideTitle}>
            A modern platform to get knowledge
          </p>
          <div className={styles.asideRights}>
            <small className={styles.right}>Term of Service</small>
            <small className={styles.right}>Privacy Policy</small>
          </div>
        </div>
      </div>
      <form className={styles.footerForm}>
        <h3 className={styles.formTitle}>Send Us</h3>
        <p className={styles.formSubtitle}>We love got ideas</p>
        <label>
          <input
            name="Email"
            placeholder="Email..."
            type="text"
            className={styles.formInput}
          />
        </label>
        <label>
          <textarea
            maxLength="255"
            placeholder="Your idea..."
            name="Your idea"
            type="text"
            className={styles.formTextarea}
          />
        </label>
        <Button text="Send ideas" />
      </form>
    </footer>
  );
}
