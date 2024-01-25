import Image from "next/image";
import styles from "./GithubProfile.module.scss";
import Link from "next/link";
export interface GithubProfileProps {
  readonly html_url: string;
  readonly avatar_url: string;
}
function GithubProfile() {
  return (
    <div className={styles.card}>
      <p className={styles.cardTitle}>Created By</p>
      <span className={styles.cardName}>Adam</span>
      <Image
        width={100}
        height={100}
        className={styles.cardAvatar}
        src={"https://avatars.githubusercontent.com/u/71249791?v=4"}
        alt="avatar"
      />
      <div className={styles.icons}>
        <Link className={`${styles.icon} ${styles.github}`} href="https://github.com/adcichowski">
          <span className={"sr-only"}>Github</span>
        </Link>

        <a className={`${styles.icon} ${styles.linkedin}`} href="https://www.linkedin.com/in/adam-cichowski-4916981b7/">
          <span className={"sr-only"}>Linkedin</span>
        </a>
      </div>
    </div>
  );
}
GithubProfile.displayName = "GithubProfile";
export { GithubProfile };
