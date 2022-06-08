import { Game } from "src/Pages/Game/Game";
import { Navigation } from "../src/Components/Navigation/Navigation";
import { GithubProfile, GithubProfileProps } from "../src/Components/Pages/Contact/GithubProfile";
import styles from "../src/Pages/Contact/Contact.module.scss";
export async function getStaticProps() {
  const responseData = await fetch("https://api.github.com/users/adcichowski");
  const githubProfile = await responseData.json();
  return {
    props: { ...githubProfile },
  };
}
export default function Contact({ githubProfile }: { readonly githubProfile: GithubProfileProps }) {
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
Contact.displayName = "Contact";
