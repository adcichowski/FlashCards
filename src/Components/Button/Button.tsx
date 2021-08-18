import { Link } from "react-router-dom";
import { ButtonInterface } from "../../Types/Types";
import styles from "./Button.module.scss";

function Button({ type, link, children, onClick }: ButtonInterface) {
  if (type === "a") {
    return (
      <Link to={`/${link}`} className={styles.button}>
        <span className={styles.front}>{children}</span>
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={styles.button}>
      <span className={styles.front}>{children}</span>
    </button>
  );
}
export { Button };
