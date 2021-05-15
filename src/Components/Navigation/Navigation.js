import React from "react";
import Logo from "../Logo/Logo.js";
import styles from "./Navigation.module.scss";
export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul className={styles.navList}>
        <li>
          <a className={styles.navItem} href="#home">
            Home
          </a>
        </li>
        <li>
          <a className={styles.navItem} href="#about">
            About
          </a>
        </li>
        <li>
          <a className={styles.navItem} href="#game">
            Game
          </a>
        </li>
        <li>
          <a className={styles.navItem} href="#contact">
            Contact
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a>Facebook</a>
        </li>
        <li>
          <a>Twitter</a>
        </li>
        <li>
          <a>Instagram</a>
        </li>
      </ul>
    </nav>
  );
}
