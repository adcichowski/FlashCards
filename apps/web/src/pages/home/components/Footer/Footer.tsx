import Link from "next/link";
import { Button } from "src/components/Button/Button";
import { Logo } from "src/components/Logo/Logo";
import styles from "./Footer.module.scss";
import { useForm } from "react-hook-form";
import { navigationLinks } from "src/constats/constants";
import { Input } from "src/components/Input/Input";
import { Textarea } from "src/components/Textarea/Textarea";

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
      <form className={styles.footerForm} onSubmit={() => handleSubmit}>
        <h3 className={styles.formTitle}>Send Us</h3>
        <p className={styles.formSubtitle}>We love got ideas</p>

        <Input label="Email" placeholder="Email" labelClass="sr-only" {...register("email")} />

        <span className={styles.formError}>{errors?.email?.message}</span>

        <Textarea label="Your idea" labelClass="sr-only" {...register("textarea")} placeholder="Your idea" />

        <Button size="normal" type="submit">
          Send ideas
        </Button>
      </form>
    </footer>
  );
}
export { Footer };
Footer.displayName = "Footer";
