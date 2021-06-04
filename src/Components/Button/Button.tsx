import React, { MouseEventHandler } from "react";
import styles from "./Button.module.scss";
interface button {
  text: string;
  onClickAction?: MouseEventHandler<HTMLButtonElement> | undefined;
  width?: string;
  height?: string;
  fontSize?: string;
}
export default function Button({
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
      <p style={{ fontSize: `${fontSize}` }} className={styles.front}>
        {text}
      </p>
    </button>
  );
}
