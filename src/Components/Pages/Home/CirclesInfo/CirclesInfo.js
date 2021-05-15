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
        <div>
          <h3>Find flexible, easily technology</h3>
          <p>Choose from many technologies to improve your experience</p>
        </div>
      </div>
    </section>
  );
}
