/* eslint-disable react/prop-types */
import React from "react";
import styles from "./Button.module.scss";

export default function Button({ text, onClickAction }) {
  return (
    <button onClick={onClickAction} className={styles.button}>
      <p className={styles.front}>{text}</p>
    </button>
  );
}
