import { MouseEventHandler } from "react";
import styles from "./Button.module.scss";

interface ButtonInt {
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
}: ButtonInt) {
  if (link) {
    return (
      <a
        href={`/${link}`}
        style={{
          width,
          height,
        }}
        className={styles.button}
      >
        <span style={{ fontSize }} className={styles.front}>
          {text}
        </span>
      </a>
    );
  }
  return (
    <button
      style={{
        width,
        height,
      }}
      onClick={onClickAction}
      className={styles.button}
    >
      <span style={{ fontSize }} className={styles.front}>
        {text}
      </span>
    </button>
  );
}
