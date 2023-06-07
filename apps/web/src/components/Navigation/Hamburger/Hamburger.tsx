import styles from "./Hamburger.module.scss";
export const Hamburger = ({ isOpen, handleClick }: { readonly isOpen: boolean; readonly handleClick: () => void }) => (
  <button
    aria-label="navigation"
    name="button"
    onClick={handleClick}
    className={isOpen ? styles.hamburgerOpen : styles.hamburger}
  >
    <div className={styles.Boxhamburger}>
      <div className={styles.lineHamburger} />
      <div className={styles.lineHamburger} />
      <div className={styles.lineHamburger} />
    </div>
  </button>
);
