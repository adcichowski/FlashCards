import logo from "../../Assets/logo.webp";
import styles from "./Logo.module.scss";
export default function Logo() {
  return (
    <>
      <img alt="Logo" src={logo} className={styles.logo} />
    </>
  );
}
