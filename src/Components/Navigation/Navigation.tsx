import { useState, useCallback } from "react";
import { Logo } from "../Logo/Logo";
import styles from "./Navigation.module.scss";
import Link from "next/link";
import { socialLinks, navigationLinks } from "../../Constants/Constants";
import { useAuthContext } from "../../Context/AuthContext";
import { Button } from "../Button/Button";
import { Hamburger } from "./Hamburger/Hamburger";

function Navigation() {
  const { state, dispatch } = useAuthContext();
  const handleClickLogOut = useCallback(() => {
    dispatch({ type: "logOut" });
  }, [dispatch]);
  const [isOpen, setOpen] = useState(false);
  const handleClick = () => setOpen(!isOpen);
  const renderNavigationLinks = navigationLinks.map((element) => (
    <li key={element.name} className={!isOpen ? styles.navItem : styles.navItemOpen}>
      <Link href={element.path}>
        <a className={styles.navItem} onClick={handleClick}>
          {element.name}
        </a>
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
    <nav>
      <div className={styles.nav}>
        {isOpen ? (
          <div className={styles.bodyMenu}>
            <Logo />
            <ul className={styles.menuList}>{renderNavigationLinks}</ul>
            {state.isLogin ? (
              <Button size="normal" type="button" onClick={handleClickLogOut}>
                Logout
              </Button>
            ) : (
              <ul className={styles.menuSocial}>{renderSocialLinks}</ul>
            )}
          </div>
        ) : null}
        <Hamburger handleClick={handleClick} />
        <div className={styles.hideNav}>
          <Logo />
          <ul className={styles.navList}>{renderNavigationLinks}</ul>
          {state.isLogin ? (
            <Button size="normal" type="button" onClick={handleClickLogOut}>
              Logout
            </Button>
          ) : (
            <ul className={styles.menuSocial}>{renderSocialLinks}</ul>
          )}
        </div>
      </div>
    </nav>
  );
}
export { Navigation };
Navigation.displayName = "Navigation";
