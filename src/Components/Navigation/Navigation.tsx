import React, { useState } from "react";
import Logo from "../Logo/Logo";
import styles from "./Navigation.module.scss";
import { Link } from "react-router-dom";
export default function Navigation() {
  const [isOpen, openMenu] = useState(false);
  if (isOpen) {
    return (
      <div className={styles.nav}>
        <nav className={styles.bodyMenu}>
          <button
            aria-label="navigation"
            name="button"
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
            <li>
              <Link
                className={styles.menuItem}
                onClick={() => openMenu(!isOpen)}
                to={`/`}
              >
                Home
              </Link>
            </li>
            {["About", "Game", "Contact"].map((element) => (
              <li key={`${element}`}>
                <Link
                  className={styles.menuItem}
                  onClick={() => openMenu(!isOpen)}
                  to={`/${element.toLocaleLowerCase()}`}
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
      <button
        aria-label="navigation"
        name="button"
        onClick={() => openMenu(!isOpen)}
        className={styles.hamburger}
      >
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
            <Link className={styles.navItem} to={`/`}>
              Home
            </Link>
          </li>
          {["About", "Game", "Contact"].map((element) => (
            <li key={`${element}`}>
              <Link className={styles.navItem} to={`/${element.toLowerCase()}`}>
                {element}
              </Link>
            </li>
          ))}
        </ul>
        <ul className={styles.menuSocial}>
          {["facebook", "twitter", "instagram"].map((socialName) => (
            <li key={socialName}>
              <a href={`https://${socialName}.com`}>
                <div className={`${styles[socialName]} ${styles.social}`}></div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
