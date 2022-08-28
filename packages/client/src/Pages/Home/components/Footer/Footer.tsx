import Link from "next/link";
import { Button } from "../../../../components/Button/Button";
import { Logo } from "../../../../components/Logo/Logo";
import styles from "./Footer.module.scss";
import { useForm } from "react-hook-form";
import { socialLinks, navigationLinks } from "../../../../constats/constants";

function Footer() {
  const { register, handleSubmit, formState } = useForm<{ readonly email: string; readonly textarea: string }>();
  const { errors } = formState;
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
                    <a className={styles.link}>{element.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className={styles.listSocial}>
              {socialLinks.map((socialName) => (
                <li key={socialName}>
                  <a href={`https://${socialName}.com`} className={`${styles[socialName]}`}>
                    <span className="sr-only">{socialName}</span>
                  </a>
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
      <form className={styles.footerForm} onSubmit={() => handleSubmit}>
        <h3 className={styles.formTitle}>Send Us</h3>
        <p className={styles.formSubtitle}>We love got ideas</p>
        <label>
          <span className="sr-only">Email</span>
          <input id="email" {...register("email")} placeholder="Email" type="text" className={styles.formInput} />
        </label>
        <span className={styles.formError}>{errors?.email?.message}</span>
        <label>
          <span className="sr-only"> Your idea</span>
          <textarea {...register("textarea")} maxLength={255} placeholder="Your idea" className={styles.formTextarea} />
        </label>
        <Button size="normal" type="submit">
          Send ideas
        </Button>
      </form>
    </footer>
  );
}
export { Footer };
Footer.displayName = "Footer";