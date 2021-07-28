import styles from "./Home.module.scss";
import Navigation from "../../Components/Navigation/Navigation";
import CirclesInfo from "../../Components/Pages/Home/CirclesInfo/CirclesInfo";
import Button from "../../Components/Button/Button";
import HomeAbout from "../../Components/Pages/Home/HomeAbout/HomeAbout";
import Footer from "../../Components/Footer/Footer";
import React, { Suspense } from "react";
const ListTechnologies = React.lazy(
  () => import("../../Components/Pages/Home/ListTechnologies/ListTechnologies")
);
const Instruction = React.lazy(
  () => import("../../Components/Pages/Home/Instruction/Instruction")
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
          <Button
            link="game"
            width="calc(7rem + 6vw)"
            height="calc(2rem + 3vw)"
          >
            Click For Play
          </Button>
        </section>
      </header>
      <main>
        <HomeAbout />
        <article className={styles.firstSide}>
          <Suspense fallback={<div>Generate Card Instruction</div>}>
            <Instruction />
            <ListTechnologies />
          </Suspense>
          <CirclesInfo />
        </article>
        <section className={styles.bigQuestion}>
          <div className={styles.bigQuestionIcon}></div>
          <h3 className={styles.bigQuestionTitle}>Do You Wanna TRY ??</h3>
          <Button
            width="calc(13rem + 6vw)"
            height="calc(3rem + 3vw)"
            fontSize="clamp(2rem,calc(1rem + 1vw),6rem)"
            maxWidth="50rem"
            maxHeight="16rem"
          >
            Create Account
          </Button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
