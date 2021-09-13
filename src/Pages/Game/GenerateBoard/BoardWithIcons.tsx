import styles from "./BoardWithIcons.module.scss";
import { ICard } from "../../../Types/Types";
import { BackButton } from "../../../Components/Button/BackButton/BackButton";
import { useAvaibleTechnologies } from "../../../Components/Pages/Game/useAvaibleTechnologies";
import { Link } from "react-router-dom";
import { capitalize } from "../../../Utils/Utils";
import { useAnimationGSAP } from "../../../Components/Hooks/useAnimationGSAP";
import { AnimateIconTech } from "../../../lib/gsap/AnimateIconTech";
import { useEffect } from "react";
import { useCardContext } from "../../../Context/CardContext";
import { ReactComponent as Heart } from "../../../Assets/Icons/heart.svg";
function BoardWithIcons({
  cardsData,
  typeBoard,
}: {
  cardsData: { [index: string]: ICard[] };
  typeBoard: "general" | "personal";
}) {
  const { dispatch, state } = useCardContext();
  useEffect(() => {
    if (state.isShow) {
      dispatch({
        type: "resetCard",
      });
    }
  });
  const { getElements } = useAnimationGSAP(AnimateIconTech);
  const { getAvaibleTechnologies } = useAvaibleTechnologies();
  const favoriteIcon = () => (
    <li className={styles.boxTechnology}>
      <Link
        to="game/personal-cards/favorite"
        className={`${styles.technology}`}
      >
        <p className={styles.technologyType}>All</p>
        <div className={styles.icon}>
          <Heart />
        </div>
        <p className={styles.nameTechnology}>Favorite Cards</p>
      </Link>
    </li>
  );
  const renderIcons = getAvaibleTechnologies(Object.keys(cardsData)).map(
    ({ type, name, isActive, render: Component }) => (
      <li key={name} className={styles.boxTechnology}>
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
          <h1 className={styles.title}>{`${capitalize(typeBoard)} Cards`}</h1>
          <div ref={getElements} className={styles.technology}>
            <ul className={styles.listTechnology}>
              {renderIcons}
              {typeBoard === "personal" && favoriteIcon}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
export { BoardWithIcons };
BoardWithIcons.displayName = "BoardWithIcons";
