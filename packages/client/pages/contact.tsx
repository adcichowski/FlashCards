import { Game } from "src/Pages/Game/Game";
import { Navigation } from "../src/Components/Navigation/Navigation";
import { GithubProfile } from "../src/Components/Pages/Contact/GithubProfile";
import styles from "../src/Pages/Contact/Contact.module.scss";
export default function Contact() {
  return (
    <Game>
      <Navigation />
      <div className={styles.contact}>
        <div className={styles.description}>
          <h1 className={styles.descriptionTitle}>Thanks for your interest in FlashCards</h1>
          <p className={styles.descriptionText}>if you wanna extend this project, message to me. </p>
        </div>
        <GithubProfile />
        <div className={styles.contactBackground}></div>
      </div>
    </Game>
  );
}
Contact.displayName = "Contact";
