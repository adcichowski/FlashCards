import Image from "next/image";
import styles from "./Logo.module.scss";
function Logo() {
  return <Image alt="Logo" width={200} height={100} src="/logo.png" className={styles.logo} />;
}
export { Logo };
Logo.displayName = "Logo";
