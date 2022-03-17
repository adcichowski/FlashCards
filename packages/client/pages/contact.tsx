import { Navigation } from "../src/Components/Navigation/Navigation";
import { GithubProfile } from "../src/Components/Pages/Contact/GithubProfile";
import { socialLinks } from "../src/Constants/Constants";
import styles from "../src/Pages/Contact/Contact.module.scss";

export default function Contact() {
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
    <>
      <Navigation />
      <div className={styles.contact}>
        <div className={styles.description}>
          <h1 className={styles.descriptionTitle}>Thanks for your interest in FlashCards</h1>
          <h2 className={styles.descriptionText}>if you wanna extend this project, message to me. </h2>
          <ul className={styles.descriptionLinks}>{renderSocialLinks}</ul>
        </div>
        <GithubProfile />
        <div className={styles.contactBackground}></div>
      </div>
    </>
  );
}
Contact.displayName = "Contact";
