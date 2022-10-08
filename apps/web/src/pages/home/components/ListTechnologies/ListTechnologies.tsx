import Technologies1 from "./Technologies-1.svg";
import styles from "./ListTechnologies.module.scss";
import { useAnimationGSAP } from "../../../../hooks/useAnimationGSAP";
import { BounceBoxes } from "../../../../lib/gsap/BounceBoxes";
function ListTechnologies() {
  const { getElements } = useAnimationGSAP(BounceBoxes);

  return (
    <div ref={getElements} className={styles.technologies}>
      <Technologies1 />
    </div>
  );
}
export { ListTechnologies };
ListTechnologies.displayName = "ListTechnologies";
