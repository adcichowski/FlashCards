import React from "react";
import styles from "./HomeAbout.module.scss";
import Logo from "../../../Logo/Logo";
export default function HomeAbout() {
  return (
    <>
      <article className={styles.article__about}>
        <div className={styles.article__about__background}>
          <section className={styles.about}>
            <div className={styles.about__text}>
              <Logo className={styles.about__logo} />
              <h2 className={styles.about__title}>About This Page</h2>
              <p className={styles.about__paragraph}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Commodi dolorum distinctio reprehenderit officia autem, at
                numquam ipsa accusamus. Est eveniet accusamus eligendi! Fuga
                quos magnam mollitia neque quasi, doloribus quas?
              </p>
              <form className={styles.about__form}>
                <div>
                  <span>
                    <input
                      placeholder="Write Your Email"
                      type="text"
                      className={styles.about__form__input}
                    />

                    <input
                      type="submit"
                      className={styles.about__form__submit}
                      value="Send"
                    />
                  </span>
                </div>
              </form>
            </div>
            <div className={styles.about__img}></div>
          </section>
        </div>
      </article>
    </>
  );
}
