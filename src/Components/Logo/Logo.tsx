import logo from "../../Assets/logo.png";
import styles from "./Logo.module.scss";
function Logo() {
  return <img alt="Logo" src={logo} className={styles.logo} />;
}
export { Logo };
Logo.displayName = "Logo";
