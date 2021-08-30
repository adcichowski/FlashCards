import { Navigation } from "../../Components/Navigation/Navigation";
import { GithubProfile } from "../../Components/Pages/Contact/GithubProfile";
import { socialLinks } from "../../Constants/Constants";
import { Game } from "../Game/Game";
import styles from "./Contact.module.scss";

export function Contact() {
  const renderSocialLinks = socialLinks.map((socialName) => (
    <li key={socialName}>
      <a href={`https://${socialName}.com`}>
        <div className={`${styles[socialName]} ${styles.social}`}>
          <span className="sr-only">{socialName}</span>
        </div>
      </a>
    </li>
  ));
  return (
    <Game>
      <Navigation />
      <div className={styles.contact}>
        <div className={styles.description}>
          <p className={styles.descriptionTitle}>
            Thanks for your interest in FlashCards
          </p>
          <p className={styles.descriptionText}>
            if you wanna extend this project, message to me.{" "}
          </p>
          <ul className={styles.descriptionLinks}>{renderSocialLinks}</ul>
        </div>
        <GithubProfile />
        <div className={styles.contactBackground}></div>
      </div>
    </Game>
  );
}
Contact.displayName = "Contact";
