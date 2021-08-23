import { Link } from "react-router-dom";
import { ButtonInterface } from "../../Types/Types";
import styles from "./Button.module.scss";
export function BigButton({ link, children }: ButtonInterface) {
  if (link)
    return (
      <Link className={`${styles.button} ${styles.bigButton}`} to={`/${link}`}>
        <span className={`${styles.front} ${styles.bigFront}`}>{children}</span>
      </Link>
    );

  return (
    <button className={`${styles.button} ${styles.bigButton}`}>
      <span className={`${styles.front} ${styles.bigFront}`}>{children}</span>
    </button>
  );
}
BigButton.displayName = "BigButton";
