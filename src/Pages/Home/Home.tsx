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
      <header className={styles.heroBackground}>
        <div className={styles.heroNavigation}>
          <Navigation />
        </div>
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
