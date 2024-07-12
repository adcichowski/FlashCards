import React from "react";
import { Navigation } from "src/components/Navigation/Navigation";
import { BackgroundGame } from "src/views/board/components/BackgroundBoard/BackgroundGame";
import styles from "./ContactPage.module.scss";
import { GithubProfile } from "../components/GithubProfile";

export function ContactPage() {
  return (
    <div className={styles.wrapper}>
      <BackgroundGame>
        <>
          <Navigation />
          <div className={styles.contact}>
            <div className={styles.description}>
              <h1 className={styles.descriptionTitle}>Thanks for your interest in FlashCards</h1>
              <p className={styles.descriptionText}>if you wanna extend this project, message to me. </p>
            </div>
            <GithubProfile />
            <div className={styles.contactBackground}></div>
          </div>
        </>
      </BackgroundGame>
    </div>
  );
}
