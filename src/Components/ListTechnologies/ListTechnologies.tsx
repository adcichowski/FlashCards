import useAnimationTechnologies from "./Hook";
import { ReactComponent as Technologies1 } from "../../Assets/IconsTechnology/Technologies-1.svg";
import { ReactComponent as Technologies2 } from "../../Assets/IconsTechnology/Technologies-2.svg";
import { ReactComponent as Technologies3 } from "../../Assets/IconsTechnology/Technologies-3.svg";
import { ReactComponent as Technologies4 } from "../../Assets/IconsTechnology/Technologies-4.svg";
import styles from "./ListTechnologies.module.scss";
import { getRandomMinMax } from "../../Utils/Utils";

export default function ListTechnologies() {
  const { getBoxes } = useAnimationTechnologies();
  const listSVG = [Technologies1, Technologies2, Technologies3, Technologies4];
  const RenderRandomSVG = listSVG[getRandomMinMax(1, listSVG.length)];
  return (
    <div ref={getBoxes} className={styles.technologies}>
      <RenderRandomSVG />
    </div>
  );
}
