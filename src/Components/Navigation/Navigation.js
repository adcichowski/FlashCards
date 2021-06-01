/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Logo from "../Logo/Logo.js";
import styles from "./Navigation.module.scss";
import { Link } from "react-router-dom";
export default function Navigation() {
  const [isOpen, openMenu] = useState(false);
  if (isOpen) {
    return (
      <div className={styles.nav}>
        <nav className={styles.bodyMenu}>
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
          <ul className={styles.menuList}>
            {["Home", "About", "Game", "Contact"].map((element) => (
              <li>
                {" "}
                <Link
                  className={styles.menuItem}
                  onClick={() => openMenu(!isOpen)}
                  to={`/${element}`}
                >
                  {element}
                </Link>
              </li>
            ))}
          </ul>
          <ul className={styles.menuSocial}>
            {["facebook", "twitter", "instagram"].map((socialName) => (
              <li
                key={socialName}
                className={`${styles[socialName]} ${styles.social}`}
              ></li>
            ))}
          </ul>
        </nav>
      </div>
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
          {["Home", "About", "Game", "Contact"].map((element) => (
            <li>
              {" "}
              <Link className={styles.navItem} to={`/${element.toLowerCase()}`}>
                {element}
              </Link>
            </li>
          ))}
        </ul>
        <ul className={styles.menuSocial}>
          {["facebook", "twitter", "instagram"].map((socialName) => (
            <li>
              <a>
                <div
                  key={socialName}
                  className={`${styles[socialName]} ${styles.social}`}
                ></div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
