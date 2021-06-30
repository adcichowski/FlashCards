import useAnimationCircles from "./Hook";

import styles from "./CirclesInfo.module.scss";
import { ReactComponent as CirclesSVG } from "../../../../Assets/Pages/Home/CirclesAside.svg";
export default function CirclesInfo() {
  const { getElements } = useAnimationCircles();

  return (
    <section className={styles.circles}>
      <div ref={getElements} className={styles.circlesSvg}>
        <CirclesSVG />
      </div>
      <div className={styles.circlesText}>
        <h3 className={styles.circlesTitle}>Look at this...</h3>
        <p className={styles.circlesParagraph}>
          This graph always show you what we have on the website, we can help
          themselves day after day. Stay with us, and send more information in
          cards.
        </p>
      </div>
    </section>
  );
}
