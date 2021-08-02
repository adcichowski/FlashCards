import styles from "./GenerateBoard.module.scss";
import { Card } from "../../../Types/Types";
import { BackButton } from "../../../Components/Button/BackButton/BackButton";
import { useAvaibleTechnologies } from "../../../Components/Pages/Game/useAvaibleTechnologies";
import { Link } from "react-router-dom";
import { capitalize } from "../../../Utils/Utils";
import { useAnimationGSAP } from "../../../Components/Hooks/useAnimationGSAP";
import { AnimateIconTech } from "../../../lib/gsap/AnimateIconTech";
function GenerateBoard({
  cardsData,
  typeBoard,
}: {
  cardsData: { [index: string]: Card[] };
  typeBoard: "general" | "personal";
}) {
  console.log(cardsData);
  const { getElements } = useAnimationGSAP(AnimateIconTech);
  const { getAvaibleTechnologies } = useAvaibleTechnologies();
  const renderIcons = getAvaibleTechnologies(Object.keys(cardsData)).map(
    ({ type, name, isActive, render: Component }) => (
      <li key={name}>
        <Link
          to={`/game/${typeBoard}-cards/${name}`}
          className={`${styles.technology} ${
            isActive ? "" : styles.linkDisable
          }`}
        >
          <div>
            <div className={styles.icon}>
              <p className={styles.technologyType}>{type}</p>
              <Component />
            </div>
            <p className={styles.nameTechnology}>{capitalize(name)}</p>
          </div>
        </Link>
      </li>
    )
  );

  return (
    <>
      <BackButton />
      <div className={styles.board}>
        <h3 className={styles.title}>{`${capitalize(typeBoard)} Cards`}</h3>
        <div ref={getElements} className={styles.technology}>
          <ul className={styles.listTechnology}>{renderIcons}</ul>
        </div>
      </div>
    </>
  );
}
export { GenerateBoard };
