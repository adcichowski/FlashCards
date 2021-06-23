import { MouseEventHandler } from "react";
import styles from "./Button.module.scss";

interface ButtonInt {
  text: string;
  onClickAction?: MouseEventHandler<HTMLButtonElement>;
  width?: string;
  height?: string;
  fontSize?: string;
  link?: string;
  maxWidth?: string;
  maxHeight?: string;
}
export default function Button({
  link,
  text,
  onClickAction,
  width,
  height,
  fontSize,
  maxWidth = "20rem",
  maxHeight = "10rem",
}: ButtonInt) {
  if (link) {
    return (
      <a
        href={`/${link}`}
        style={{
          width,
          height,
          maxWidth,
          maxHeight,
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
        maxWidth,
        maxHeight,
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
