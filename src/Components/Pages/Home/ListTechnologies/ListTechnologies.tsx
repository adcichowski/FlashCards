import { ReactComponent as Technologies1 } from "../../../../Assets/Pages/Home/ListTechnologies/Technologies-1.svg";
import { ReactComponent as Technologies2 } from "../../../../Assets/Pages/Home/ListTechnologies/Technologies-2.svg";
import { ReactComponent as Technologies3 } from "../../../../Assets/Pages/Home/ListTechnologies/Technologies-3.svg";
import { ReactComponent as Technologies4 } from "../../../../Assets/Pages/Home/ListTechnologies/Technologies-4.svg";
import styles from "./ListTechnologies.module.scss";
import { getRandomMinMax } from "../../../../Utils/Utils";
import { useAnimationGSAP } from "../../../Hooks/useAnimationGSAP";

export default function ListTechnologies() {
  const { getElements } = useAnimationGSAP("BounceBoxes");
  const listSVG = [Technologies1, Technologies2, Technologies3, Technologies4];
  const RenderRandomSVG = listSVG[getRandomMinMax(1, listSVG.length)];
  return (
    <div ref={getElements} className={styles.technologies}>
      <RenderRandomSVG />
    </div>
  );
}
