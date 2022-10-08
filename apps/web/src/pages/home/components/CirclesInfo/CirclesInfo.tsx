import styles from "./CirclesInfo.module.scss";
import CirclesSVG from "./CirclesAside.svg";
function CirclesInfo() {
  return (
    <section className={styles.circles}>
      <div className={styles.circlesSvg}>
        <CirclesSVG />
      </div>
      <div className={styles.circlesText}>
        <h3 className={styles.circlesTitle}>Look at this...</h3>
        <p className={styles.circlesParagraph}>
          This graph always show you what we have on the website, we can help themselves day after day. Stay with us,
          and send more information in cards.
        </p>
      </div>
    </section>
  );
}
export { CirclesInfo };
CirclesInfo.displayName = "CirclesInfo";
