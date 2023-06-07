"use client";

import Image from "next/image";
import { Footer } from "src/pages/home/components/Footer/Footer";
import { Navigation } from "src/components/Navigation/Navigation";
import React from "react";
import styles from "src/Pages/Home/Home.module.scss";
import Archon from "src/components/Archon/Archon";
import { HomeAbout } from "src/pages/home/components/HomeAbout/HomeAbout";
import { Instruction } from "src/pages/home/components/Instruction/Instruction";
import { ListTechnologies } from "src/pages/home/components/ListTechnologies/ListTechnologies";
import { CirclesInfo } from "src/pages/home/components/CirclesInfo/CirclesInfo";

export function HomePage() {
  return (
    <div className={styles.homePage}>
      <header className={styles.header}>
        <Navigation />

        <Image
          src="/HeroBackground/large.png"
          layout="fill"
          priority
          objectPosition="top"
          tabIndex={-1}
          objectFit="cover"
          className={styles.heroBackground}
          alt=""
        />

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
          <Image
            className={styles.shoeBackground}
            src="/ShoeBackground/large.png"
            alt=""
            objectPosition="bottom"
            layout="fill"
            objectFit="cover"
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
