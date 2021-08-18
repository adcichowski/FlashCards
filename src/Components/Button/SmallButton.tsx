import { ButtonInterface } from "../../Types/Types";
import styles from "./Button.module.scss";
export function SmallButton({ onClick, children }: ButtonInterface) {
  return (
    <div>
      <button
        onClick={onClick}
        className={`${styles.button} ${styles.smallButton}`}
      >
        <span className={`${styles.front} ${styles.smallFront}`}>
          {children}
        </span>
      </button>
    </div>
  );
}
