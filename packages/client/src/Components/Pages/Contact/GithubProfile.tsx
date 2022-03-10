import { useFetcher, fetcher } from "../../Hooks/useFetcher";
import Image from "next/image";
import styles from "./GithubProfile.module.scss";
interface GithubProfileProps {
  readonly html_url: string;
  readonly avatar_url: string;
}
function GithubProfile() {
  const { data } = useFetcher<GithubProfileProps>(() =>
    fetcher<GithubProfileProps>("https://api.github.com/users/adcichowski", {}),
  );
  if (!data) return null;
  return (
    <div className={styles.card}>
      <p className={styles.cardTitle}>Created By</p>
      <span className={styles.cardName}>Adam</span>
      <Image width={100} height={100} className={styles.cardAvatar} src={data.avatar_url} alt="avatar" />
      <div className={styles.icons}>
        <a className={`${styles.icon} ${styles.github}`} href={data.html_url}>
          <span className={"sr-only"}>Github</span>
        </a>

        <a className={`${styles.icon} ${styles.linkedin}`} href="https://www.linkedin.com/in/adam-cichowski-4916981b7/">
          <span className={"sr-only"}>Linkedin</span>
        </a>
      </div>
    </div>
  );
}
GithubProfile.displayName = "GithubProfile";
export { GithubProfile };