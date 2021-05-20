import React from "react";
import styles from "./Home.module.scss";
import Navigation from "../../Components/Navigation/Navigation";
import CirclesInfo from "../../Components/Pages/Home/CirclesInfo/CirclesInfo";
import Instruction from "../../Components/Instruction/Instruction";
import ListTechnologies from "../../Components/ListTechnologies/ListTechnologies";
import Button from "../../Components/Button/Button";
import HomeAbout from "../../Components/Pages/Home/HomeAbout/HomeAbout";
import Footer from "../../Components/Footer/Footer";
export default function Home() {
  return (
    <div className={styles.homePage}>
      <header className={styles.heroBackground}>
        <Navigation />
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>FlashCards</h1>
          <p className={styles.heroSubtitle}>
            Easy way to improve your skill...
          </p>
          <Button text="Click For Play" />
        </section>
      </header>
      <main>
        <HomeAbout />
        <article className={styles.first__side}>
          <Instruction />
          <ListTechnologies />
        </article>
        <CirclesInfo />
        <section className={styles.bigQuestion}>
          <div className={styles.bigQuestionIcon}></div>
          <h3 className={styles.bigQuestionTitle}>Do You Wanna TRY ??</h3>
          <Button
            width={"calc(12rem + 8vw)"}
            height={"calc(2rem + 5vw)"}
            fontSize={"calc(1.5rem + 1vw)"}
            text="Create Account"
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}
