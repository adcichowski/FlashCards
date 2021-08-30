import styles from "./GithubProfile.module.scss";
import { useGithubProfile } from "./useGithubProfile";
function GithubProfile() {
  const profile = useGithubProfile();

  if (!profile.isLoaded) return null;

  return (
    <div className={styles.card}>
      <p className={styles.cardTitle}>Created By</p>
      <span className={styles.cardName}>Adam</span>
      <img
        className={styles.cardAvatar}
        src={profile.avatar_url}
        alt="avatar"
      />
      <div className={styles.icons}>
        <a
          className={`${styles.icon} ${styles.github}`}
          href={profile.html_url}
        >
          <span className={"sr-only"}>Github</span>
        </a>

        <a
          className={`${styles.icon} ${styles.linkedin}`}
          href="https://www.linkedin.com/in/adam-cichowski-4916981b7/"
        >
          <span className={"sr-only"}>Linkedin</span>
        </a>
      </div>
    </div>
  );
}
GithubProfile.displayName = "GithubProfile";
export { GithubProfile };
