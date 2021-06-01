import React from "react";
import Navigation from "../../Components/Navigation/Navigation";
import styles from "./Game.module.scss";

export default function Game() {
  return (
    <section className={styles.game}>
      <Navigation />
      <div></div>
    </section>
  );
}
