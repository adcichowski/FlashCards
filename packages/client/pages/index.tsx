/* eslint-disable @next/next/no-img-element */
//optimzie background by picture element
import { Footer } from "src/Components/Footer/Footer";
import { Navigation } from "src/Components/Navigation/Navigation";
import { HomeAbout } from "src/Components/Pages/Home/HomeAbout/HomeAbout";
import React from "react";
import styles from "src/Pages/Home/Home.module.scss";
import { Instruction } from "src/Components/Pages/Home/Instruction/Instruction";
import { ListTechnologies } from "src/Components/Pages/Home/ListTechnologies/ListTechnologies";
import { CirclesInfo } from "src/Components/Pages/Home/CirclesInfo/CirclesInfo";
import Archon from "src/Components/Archon/Archon";

export default function Home() {
  return (
    <div className={styles.homePage}>
      <header className={styles.header}>
        <div className={styles.heroNavigation}>
          <Navigation />
        </div>
        <picture tabIndex={-1}>
          <source srcSet="/HeroBackground/large.png" media="(min-width: 1080px)" />
          <source srcSet="/HeroBackground/medium.png" media="(min-width: 480px)" />
          <source srcSet="/HeroBackground/small.png" media="(max-width: 360px), (min-width:360px)" />
          <img src="/HeroBackground/large.png" className={styles.heroBackground} alt="background" />
        </picture>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>FlashCards</h1>
          <p className={styles.heroSubtitle}>Easy way to improve your skill...</p>

          <Archon size="normal" href="game">
            Click For Play
          </Archon>
        </section>
      </header>
      <main>
        <HomeAbout />
        <article className={styles.firstSide}>
          <picture tabIndex={-1}>
            <source srcSet="/ShoeBackground/large.png" media="(min-width: 1080px)" />
            <source srcSet="/ShoeBackground/medium.png" media="(min-width: 480px)" />
            <source srcSet="/ShoeBackground/small.png" media="(max-width: 360px), (min-width:360px)" />
            <img className={styles.shoeBackground} alt="background" />
          </picture>

          <Instruction />

          <ListTechnologies />
          <CirclesInfo />
        </article>
        <section className={styles.bigQuestion}>
          <div className={styles.bigQuestionIcon}></div>
          <h3 className={styles.bigQuestionTitle}>Do You Wanna TRY ??</h3>
          <Archon size="big" href="game">
            Create Account
          </Archon>
        </section>
      </main>
      <Footer />
    </div>
  );
}
Home.displayName = "Home";
