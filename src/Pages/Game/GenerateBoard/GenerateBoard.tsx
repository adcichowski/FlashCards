import styles from "./GenerateBoard.module.scss";
import { ICard } from "../../../Types/Types";
import { BackButton } from "../../../Components/Button/BackButton/BackButton";
import { useAvaibleTechnologies } from "../../../Components/Pages/Game/useAvaibleTechnologies";
import { Link } from "react-router-dom";
import { capitalize } from "../../../Utils/Utils";
import { useAnimationGSAP } from "../../../Components/Hooks/useAnimationGSAP";
import { AnimateIconTech } from "../../../Lib/gsap/AnimateIconTech";
import { useEffect } from "react";
import { useCardContext } from "../../../Context/CardContext";
function GenerateBoard({
  cardsData,
  typeBoard,
}: {
  cardsData: { [index: string]: ICard[] };
  typeBoard: "general" | "personal";
}) {
  const { dispatch, state } = useCardContext();
  useEffect(() => {
    if (state.technology !== "none") {
      dispatch({
        type: "resetCard",
      });
    }
  });
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
          <p className={styles.technologyType}>{type}</p>
          <div className={styles.icon}>
            <Component />
          </div>
          <p className={styles.nameTechnology}>{capitalize(name)}</p>
        </Link>
      </li>
    )
  );

  return (
    <>
      <BackButton />
      <div className={styles.board}>
        <div className={styles.boardTechnologies}>
          <p className={styles.title}>{`${capitalize(typeBoard)} Cards`}</p>
          <div ref={getElements} className={styles.technology}>
            <ul className={styles.listTechnology}>{renderIcons}</ul>
          </div>
        </div>
      </div>
    </>
  );
}
export { GenerateBoard };
GenerateBoard.displayName = "GenerateBoard";
