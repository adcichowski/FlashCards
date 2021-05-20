/* eslint-disable react/prop-types */
import React from "react";
import styles from "./Button.module.scss";

export default function Button({
  text,
  onClickAction,
  width,
  height,
  fontSize,
}) {
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
