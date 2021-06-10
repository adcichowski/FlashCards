import { MouseEventHandler } from "react";
import styles from "./Button.module.scss";

interface button {
  text: string;
  onClickAction?: MouseEventHandler<HTMLButtonElement>;
  width?: string;
  height?: string;
  fontSize?: string;
  link?: string;
}
export default function Button({
  link,
  text,
  onClickAction,
  width,
  height,
  fontSize,
}: button) {
  if (link?.length === 0) {
    return (
      <button
        style={{
          width: `${width}`,
          height: `${height}`,
        }}
        onClick={onClickAction}
        className={styles.button}
      >
        <p style={{ fontSize: `${fontSize}` }} className={styles.front}>
          {text}
        </p>
      </button>
    );
  }
  return (
    <a
      href={`/${link}`}
      style={{
        width: `${width}`,
        height: `${height}`,
      }}
      className={styles.button}
    >
      <p style={{ fontSize: `${fontSize}` }} className={styles.front}>
        {text}
      </p>
    </a>
  );
}
