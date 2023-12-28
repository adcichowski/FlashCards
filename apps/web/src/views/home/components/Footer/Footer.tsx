import Link from "next/link";
import { Logo } from "src/components/Logo/Logo";
import styles from "./Footer.module.scss";
import { navigationLinks } from "src/constants/constants";
import { FooterForm } from "./components/FooterForm/FooterForm";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerArticle}>
        <div className={styles.articleSection}>
          <Logo />
          <nav>
            <ul className={styles.listLinks}>
              {navigationLinks.map((element) => (
                <li key={element.name}>
                  <Link href={element.path}>
                    <span className={styles.link}>{element.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className={styles.asideTitle}>A modern platform to get knowledge</p>
        <div>
          <small className={styles.right}>Term of Service</small>
          <small className={styles.right}>Privacy Policy</small>
        </div>
        <small className={styles.copyright}>&copy; 2021 FlashCards, All rights is us</small>
      </div>
      <FooterForm />
    </footer>
  );
}
export { Footer };
Footer.displayName = "Footer";
