import styles from "./Home.module.scss";
import { Navigation } from "../../Components/Navigation/Navigation";
import { Button } from "../../Components/Button/Button";
import { HomeAbout } from "../../Components/Pages/Home/HomeAbout/HomeAbout";
import React, { Suspense } from "react";
import { Footer } from "../../Components/Footer/Footer";
import { ListTechnologies } from "../../Components/Pages/Home/ListTechnologies/ListTechnologies";
import { CirclesInfo } from "../../Components/Pages/Home/CirclesInfo/CirclesInfo";
import { BigButton } from "../../Components/Button/BigButton";
const Instruction = React.lazy(() =>
  import("../../Components/Pages/Home/Instruction/Instruction").then(
    (module) => ({ default: module.Instruction })
  )
);
export default function Home() {
  return (
    <div className={styles.homePage}>
      <header className={styles.header}>
        <div className={styles.heroNavigation}>
          <Navigation />
        </div>
        <picture>
          <source
            srcSet="/HeroBackground/large.png"
            media="(min-width: 1080px)"
          />
          <source
            srcSet="/HeroBackground/medium.png"
            media="(min-width: 480px)"
          />
          <source
            srcSet="/HeroBackground/small.png"
            media="(max-width: 360px), (min-width:360px)"
          />
          <img className={styles.heroBackground} alt="background" />
        </picture>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>FlashCards</h1>
          <p className={styles.heroSubtitle}>
            Easy way to improve your skill...
          </p>

          <Button type="a" link="game">
            Click For Play
          </Button>
        </section>
      </header>
      <main>
        <HomeAbout />
        <article className={styles.firstSide}>
          <picture>
            <source
              srcSet="/ShoeBackground/large.png"
              media="(min-width: 1080px)"
            />
            <source
              srcSet="/ShoeBackground/medium.png"
              media="(min-width: 480px)"
            />
            <source
              srcSet="/ShoeBackground/small.png"
              media="(max-width: 360px), (min-width:360px)"
            />
            <img className={styles.shoeBackground} alt="background" />
          </picture>
          <Suspense fallback={<div>Generate Card Instruction</div>}>
            <Instruction />
          </Suspense>
          <ListTechnologies />
          <CirclesInfo />
        </article>
        <section className={styles.bigQuestion}>
          <div className={styles.bigQuestionIcon}></div>
          <h3 className={styles.bigQuestionTitle}>Do You Wanna TRY ??</h3>
          <BigButton type="a" link="game">
            Create Account
          </BigButton>
        </section>
      </main>
      <Footer />
    </div>
  );
}
Home.displayName = "Home";
