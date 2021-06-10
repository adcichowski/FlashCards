import { MouseEventHandler } from "react";
import styles from "./Button.module.scss";
interface button {
  text: string;
  onClickAction?: MouseEventHandler<HTMLButtonElement> | undefined;
  width?: string;
  height?: string;
  fontSize?: string;
  to?: string;
}
export default function Button({
  to,
  text,
  onClickAction,
  width,
  height,
  fontSize,
}: button) {
  return (
    <button
      style={{
        width: `${width}`,
        height: `${height}`,
      }}
      onClick={onClickAction}
      className={styles.button}
    >
      {to ? (
        <p style={{ fontSize: `${fontSize}` }} className={styles.front}>
          {text}
        </p>
      ) : (
        <a
          href={to}
          style={{ fontSize: `${fontSize}` }}
          className={styles.front}
        >
          {text}
        </a>
      )}
    </button>
  );
}
