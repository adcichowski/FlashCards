import React from "react";
import { Navigation } from "src/components/Navigation/Navigation";
import { BackgroundGame } from "src/pages/game/components/BackgroundGame/BackgroundGame";
import styles from "./ContactPage.module.scss";
import { GithubProfile, GithubProfileProps } from "../components/GithubProfile";

export function ContactPage({ githubProfile }: { readonly githubProfile: GithubProfileProps }) {
  return (
    <div className={styles.wrapper}>
      <BackgroundGame>
        <Navigation />
        <div className={styles.contact}>
          <div className={styles.description}>
            <h1 className={styles.descriptionTitle}>Thanks for your interest in FlashCards</h1>
            <p className={styles.descriptionText}>if you wanna extend this project, message to me. </p>
          </div>
          <GithubProfile {...githubProfile} />
          <div className={styles.contactBackground}></div>
        </div>
      </BackgroundGame>
    </div>
  );
}
