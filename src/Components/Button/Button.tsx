import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

interface ButtonProps {
  type?: "submit" | "button";
  children: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  link?: string;
  maxWidth?: string;
  maxHeight?: string;
}
function Button({ type, link, children, onClick }: ButtonProps) {
  if (link) {
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
