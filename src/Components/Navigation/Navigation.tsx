import { useState, useEffect } from "react";
import Logo from "../Logo/Logo";
import styles from "./Navigation.module.scss";
import { Link } from "react-router-dom";

export default function Navigation() {
  let navigationLinks = [
    { name: "Home", path: "/" },
    { name: "Game", path: "/game" },
    { name: "Ranking", path: "/ranking" },
    { name: "Contact", path: "/contact" },
  ];
  const [isOpen, setOpen] = useState(false);
  const handleClick = () => setOpen(!isOpen);
  useEffect(() => {
    if (isOpen) {
      window.addEventListener("resize", () => {
        if (window.innerWidth > 850) setOpen(false);
      });
    }
  });
  if (isOpen) {
    return (
      <nav className={styles.bodyMenu} onClick={handleClick}>
        <button
          aria-label="navigation"
          name="button"
          onClick={handleClick}
          className={styles.hamburger}
        >
          <span className={styles.Boxhamburger}>
            <div className={styles.lineHamburger}></div>
            <div className={styles.lineHamburger}></div>
            <div className={styles.lineHamburger}></div>
          </span>
        </button>
        <Logo />
        <ul className={styles.menuList}>
          {navigationLinks.map((element) => (
            <li key={element.name}>
              <Link
                className={styles.menuItem}
                onClick={handleClick}
                to={element.path}
              >
                {element.name}
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
    );
  }
  return (
    <nav className={styles.nav}>
      <button
        aria-label="navigation"
        name="button"
        onClick={handleClick}
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
          {navigationLinks.map((element) => (
            <li key={element.name}>
              <Link className={styles.navItem} to={element.path}>
                {element.name}
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
