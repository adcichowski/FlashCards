import React from "react";
import logo from "../../Assets/logo.svg";
import styles from "./Logo.module.scss";
export default function Logo() {
  return (
    <>
      <img
        alt="Logo Website, Gamepad with controllers and text FlashCards"
        src={logo}
        className={styles.logo}
      />
    </>
  );
}
