import React from "react";
import { Navigation } from "src/components/Navigation/Navigation";
import { Game } from "src/pages/game/components/BackgroundGame/BackgroundGame";
import { GithubProfile } from "../components/GithubProfile";

export function ContactPage() {
  return (
    <div className={styles.wrapper}>
      <Game>
        <Navigation />
        <div className={styles.contact}>
          <div className={styles.description}>
            <h1 className={styles.descriptionTitle}>Thanks for your interest in FlashCards</h1>
            <p className={styles.descriptionText}>if you wanna extend this project, message to me. </p>
          </div>
          <GithubProfile {...githubProfile} />
          <div className={styles.contactBackground}></div>
        </div>
      </Game>
    </div>
  );
}
