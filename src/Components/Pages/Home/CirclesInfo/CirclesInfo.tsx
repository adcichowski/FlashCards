import styles from "./CirclesInfo.module.scss";
import { ReactComponent as Circles } from "../../../../Assets/IconsTechnology/Group 124.svg";
export default function CirclesInfo() {
  return (
    <section className={styles.circles}>
      <div className={styles.circlesSvg}>
        <Circles />
      </div>
      <div className={styles.circlesText}>
        <h3 className={styles.circlesTitle}>Look at this...</h3>
        <p className={styles.circlesParagraph}>
          This graph always show you what we have on the website, we can help
          themselves day after day. Stay with us, and send more information in
          cards, together we can stand to
        </p>
      </div>
    </section>
  );
}
