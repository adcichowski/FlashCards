import React from "react";
import styles from "./CirclesInfo.module.scss";
import { ReactComponent as Circles } from "../../../../Assets/IconsTechnology/Group 124.svg";
export default function CirclesInfo() {
  return (
    <section className={styles.circles}>
      <div className={styles.circlesSvg}>
        <Circles />
      </div>
      <div className={styles.circlesText}>
        <h3 className={styles.circlesTitle}>This Graph Show You</h3>
        <p className={styles.circlesParagraph}>
          As you can see this website, have awesome community to help you in
          this hard world. This
        </p>
      </div>
    </section>
  );
}
