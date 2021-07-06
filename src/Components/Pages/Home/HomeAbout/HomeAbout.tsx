import styles from "./HomeAbout.module.scss";
import Logo from "../../../Logo/Logo";
import { useForm } from "react-hook-form";
import { inputValidation } from "../../../../Utils/Utils";
export default function HomeAbout() {
  const {
    register,
    formState: { errors },
  } = useForm();
  return (
    <>
      <article className={styles.articleAbout}>
        <div className={styles.articleAboutBackground}>
          <section className={styles.about}>
            <div className={styles.aboutText}>
              <Logo />
              <h2 className={styles.aboutTitle}>About This Page</h2>
              <p className={styles.aboutParaghraph}>
                Find quality resources to help you understand concepts, learn
                important information, and turn in well-researched assignments
                at your fingertips. The website store cards with knowledge about
                programming in different technologies. All information will be
                sorted by users, most assessed will be first in ranking in
                chosen technology.
              </p>

              <div className={styles.aboutForm}>
                <form>
                  <small>Send if you wanna get more information.</small>
                  <div>
                    <label>
                      <span className="sr-only">Email</span>
                      <input
                        {...register("email", inputValidation.email)}
                        placeholder="Write Your Email"
                        className={styles.aboutFormInput}
                      />
                    </label>
                    <label>
                      <span className="sr-only">Save for news</span>
                      <input
                        type="submit"
                        className={styles.aboutFormSubmit}
                        value="Send"
                      />
                    </label>
                  </div>
                </form>
                <span>{errors?.email?.message}</span>
              </div>
            </div>
            <div className={styles.aboutImg}></div>
          </section>
        </div>
      </article>
    </>
  );
}
