import Image from "next/image";
import { Footer } from "src/views/home/components/Footer/Footer";
import { Navigation } from "src/components/Navigation/Navigation";
import React from "react";
import styles from "./Home.module.scss";
import Archon from "src/components/Archon/Archon";
import { HomeAbout } from "src/views/home/components/HomeAbout/HomeAbout";
import { Instruction } from "src/views/home/components/Instruction/Instruction";
import { ListTechnologies } from "src/views/home/components/ListTechnologies/ListTechnologies";
import { CirclesInfo } from "src/views/home/components/CirclesInfo/CirclesInfo";

export function HomePage() {
  return (
    <div className={styles.homePage}>
      <header className={styles.header}>
        <div className={styles.positionNavigation}>
          <Navigation />
        </div>

        <Image src="/heroBackground.png" tabIndex={-1} fill className={styles.heroBackground} alt="" />

        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>FlashCards</h1>
          <p className={styles.heroSubtitle}>Easy way to improve your skill...</p>

          <Archon size="normal" href="board">
            Go to board
          </Archon>
        </section>
      </header>
      <main>
        <HomeAbout />
        <article className={styles.firstSide}>
          <Image
            className={styles.shoeBackground}
            src="/shoeBackground.png"
            alt=""
            fill
            priority={false}
            quality={100}
            style={{
              objectFit: "contain",
            }}
            tabIndex={-1}
          />

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
