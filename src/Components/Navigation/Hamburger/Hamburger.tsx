import styles from "./Hamburger.module.scss";
export const Hamburger = ({ handleClick }: { handleClick: () => void }) => (
  <button aria-label="navigation" name="button" onClick={handleClick} className={styles.hamburger}>
    <span className={styles.Boxhamburger}>
      <div className={styles.lineHamburger}></div>
      <div className={styles.lineHamburger}></div>
      <div className={styles.lineHamburger}></div>
    </span>
  </button>
);
