import { Link } from "react-router-dom";
import styles from "./Button.module.scss";
export function BigButton({
  children,
  link,
}: {
  link?: string;
  children: string;
}) {
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
