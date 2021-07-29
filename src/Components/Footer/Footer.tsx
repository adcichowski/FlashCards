import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import { Logo } from "../Logo/Logo";
import styles from "./Footer.module.scss";
import { useForm } from "react-hook-form";
import { inputValidation } from "../../Utils/Utils";
import { socialLinks, navigationLinks } from "../../Constants/Constants";
function Footer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: JSON) => console.log(data);
  return (
    <footer className={styles.footer}>
      <div className={styles.footerArticle}>
        <div className={styles.articleSection}>
          <Logo />
          <nav>
            <ul className={styles.listLinks}>
              {navigationLinks.map((element) => (
                <li key={element.name}>
                  <Link className={styles.link} to={element.path}>
                    {element.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className={styles.listSocial}>
              {socialLinks.map((socialName) => (
                <a key={socialName} href={`https://${socialName}.com`}>
                  <li className={`${styles[socialName]}`}>
                    <span className="sr-only">{socialName}</span>
                  </li>
                </a>
              ))}
            </ul>
          </nav>
        </div>

        <p className={styles.asideTitle}>A modern platform to get knowledge</p>
        <div>
          <small className={styles.right}>Term of Service</small>
          <small className={styles.right}>Privacy Policy</small>
        </div>
        <small className={styles.copyright}>
          &copy; 2021 FlashCards, All rights is us
        </small>
      </div>
      <form className={styles.footerForm} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={styles.formTitle}>Send Us</h3>
        <p className={styles.formSubtitle}>We love got ideas</p>
        <label>
          <span className="sr-only">Email</span>
          <input
            id="email"
            {...register("email", inputValidation.email)}
            placeholder="Email"
            type="text"
            className={styles.formInput}
          />
        </label>
        <span className={styles.formError}>{errors?.email?.message}</span>
        <label>
          <span className="sr-only"> Your idea</span>
          <textarea
            {...register("textarea")}
            maxLength={255}
            placeholder="Your idea"
            className={styles.formTextarea}
          />
        </label>
        <Button>Send ideas</Button>
      </form>
    </footer>
  );
}
export { Footer };
