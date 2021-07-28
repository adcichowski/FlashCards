import { ReactComponent as Technologies1 } from "../../../../Assets/Pages/Home/ListTechnologies/Technologies-1.svg";
import styles from "./ListTechnologies.module.scss";
import { useAnimationGSAP } from "../../../Hooks/useAnimationGSAP";
import { BounceBoxes } from "../../../../lib/gsap/BounceBoxes";
export default function ListTechnologies() {
  const { getElements } = useAnimationGSAP(BounceBoxes);
  return (
    <div ref={getElements} className={styles.technologies}>
      <Technologies1 />
    </div>
  );
}
