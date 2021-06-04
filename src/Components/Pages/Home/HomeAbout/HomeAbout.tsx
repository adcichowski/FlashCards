import React from "react";
import styles from "./HomeAbout.module.scss";
import Logo from "../../../Logo/Logo";
export default function HomeAbout() {
  return (
    <>
      <article className={styles.articleAbout}>
        <div className={styles.articleAboutBackground}>
          <section className={styles.about}>
            <div className={styles.aboutText}>
              <Logo />
              <h2 className={styles.aboutTitle}>About This Page</h2>
              <p className={styles.aboutParaghraph}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Commodi dolorum distinctio reprehenderit officia autem, at
                numquam ipsa accusamus. Est eveniet accusamus eligendi! Fuga
                quos magnam mollitia neque quasi, doloribus quas?
              </p>
              <form className={styles.aboutForm}>
                <label>
                  <input
                    placeholder="Write Your Email"
                    type="text"
                    className={styles.aboutFormInput}
                  />
                </label>

                <input
                  type="submit"
                  className={styles.aboutFormSubmit}
                  value="Send"
                />
              </form>
            </div>
            <div className={styles.aboutImg}></div>
          </section>
        </div>
      </article>
    </>
  );
}
