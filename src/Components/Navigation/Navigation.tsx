import { useState, useCallback } from "react";
import { Logo } from "../Logo/Logo";
import styles from "./Navigation.module.scss";
import { Link } from "react-router-dom";
import { socialLinks, navigationLinks } from "../../Constants/Constants";
import { useAuthContext } from "../../Context/AuthContext";
import { Button } from "../Button/Button";
function Navigation() {
  const { state, dispatch } = useAuthContext();
  const handleClickLogOut = useCallback(() => {
    dispatch({ type: "logOut" });
  }, [dispatch]);
  const [isOpen, setOpen] = useState(false);
  const handleClick = () => setOpen(!isOpen);

  const renderNavigationLinks = navigationLinks.map((element) => (
    <li onClick={handleClick} key={element.name}>
      <Link className={styles.navItem} to={element.path}>
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
          {state.isLogin ? (
            <Button onClick={handleClickLogOut}>Logout</Button>
          ) : (
            <ul className={styles.menuSocial}>{renderSocialLinks}</ul>
          )}
        </div>
      ) : null}
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
        <ul className={styles.navList}>{renderNavigationLinks}</ul>
        {state.isLogin ? (
          <Button onClick={handleClickLogOut}>Logout</Button>
        ) : (
          <ul className={styles.menuSocial}>{renderSocialLinks}</ul>
        )}
      </div>
    </nav>
  );
}
export { Navigation };
