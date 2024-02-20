import Image from "next/image";
import styles from "./Logo.module.scss";
function Logo() {
  return <Image alt="Logo" width={150} height={50} src="/logo.png" className={styles.logo} />;
}
export { Logo };
Logo.displayName = "Logo";
