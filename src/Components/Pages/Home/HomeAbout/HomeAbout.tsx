import styles from "./HomeAbout.module.scss";
import { Logo } from "src/Components/Logo/Logo";

function HomeAbout() {
  return (
    <article className={styles.articleAbout}>
      <div className={styles.articleAboutBackground}>
        <section className={styles.about}>
          <div className={styles.aboutText}>
            <Logo />
            <h2 className={styles.aboutTitle}>About This Page</h2>
            <p className={styles.aboutParaghraph}>
              Find quality resources to help you understand concepts, learn important information, and turn in
              well-researched assignments at your fingertips. The website store cards with knowledge about programming
              in different technologies. All information will be sorted by users, most assessed will be first in ranking
              in chosen technology.
            </p>
          </div>
          <div className={styles.aboutImg}></div>
        </section>
      </div>
    </article>
  );
}
export { HomeAbout };
HomeAbout.displayName = "HomeAbout";
