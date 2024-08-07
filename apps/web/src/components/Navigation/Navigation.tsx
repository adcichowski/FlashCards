"use client";
import { useState, useCallback } from "react";
import { Logo } from "../Logo/Logo";
import styles from "./Navigation.module.scss";
import Link from "next/link";
import { socialLinks, navigationLinks } from "src/constants/constants";
import { Button } from "../Button/Button";
import { Hamburger } from "./Hamburger/Hamburger";
import { signOut, useSession } from "next-auth/react";

function Navigation() {
  const { status } = useSession();

  const handleClickLogOut = useCallback(() => {
    signOut();
  }, []);
  const [isOpen, setOpen] = useState(false);
  const handleClick = () => setOpen(!isOpen);
  const renderNavigationLinks = navigationLinks.map((element) => (
    <li key={element.name} className={!isOpen ? styles.navItem : styles.navItemOpen}>
      <Link href={element.path} className={styles.navItem}>
        {element.name}
      </Link>
    </li>
  ));
  const renderSocialLinks = socialLinks.map((socialName) => (
    <li key={socialName}>
      <a href={`https://${socialName}.com`}>
        <div className={`${styles[socialName]} ${styles.social}`}>
          <span className="sr-only">{socialName}</span>
        </div>
      </a>
    </li>
  ));
  return (
    <nav className={styles.nav}>
      {isOpen ? (
        <div className={styles.bodyMenu}>
          <Logo />
          <ul className={styles.menuList}>{renderNavigationLinks}</ul>
          {status === "authenticated" ? (
            <Button size="small" type="button" onClick={handleClickLogOut}>
              Logout
            </Button>
          ) : (
            <ul className={styles.menuSocial}>{renderSocialLinks}</ul>
          )}
        </div>
      ) : null}
      <Hamburger isOpen={isOpen} handleClick={handleClick} />
      {!isOpen && (
        <div className={styles.hideNav}>
          <Logo />
          <ul className={styles.navList}>{renderNavigationLinks}</ul>
          {status === "authenticated" ? (
            <Button size="small" type="button" onClick={handleClickLogOut}>
              Logout
            </Button>
          ) : (
            <ul className={styles.menuSocial}>{renderSocialLinks}</ul>
          )}
        </div>
      )}
    </nav>
  );
}
export { Navigation };
Navigation.displayName = "Navigation";
