/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Logo from "../Logo/Logo.js";
import styles from "./Navigation.module.scss";

export default function Navigation() {
  const [isOpen, openMenu] = useState(false);
  if (isOpen) {
    return (
      <nav>
        <div className={styles.bodyMenu}>
          <button
            onClick={() => openMenu(!isOpen)}
            className={styles.hamburgerOpen}
          >
            <span className={styles.Boxhamburger}>
              <div className={styles.lineHamburger}></div>
              <div className={styles.lineHamburger}></div>
              <div className={styles.lineHamburger}></div>
            </span>
          </button>
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
        </div>
      </nav>
    );
  }
  return (
    <nav className={styles.nav}>
      <button onClick={() => openMenu(!isOpen)} className={styles.hamburger}>
        <span className={styles.Boxhamburger}>
          <div className={styles.lineHamburger}></div>
          <div className={styles.lineHamburger}></div>
          <div className={styles.lineHamburger}></div>
        </span>
      </button>
      <div className={styles.hideNav}>
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
      </div>
    </nav>
  );
}
