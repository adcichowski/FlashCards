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
import { useSetDecks } from "../../../Components/Hooks/useSetDecks";
function BoardWithIcons({
  cardsData,
  typeBoard,
}: {
  cardsData: { [index: string]: ICard[] };
  typeBoard: "general" | "personal";
}) {
  useSetDecks();
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
  const FavoriteIcon = () => (
    <Link
      to={
        cardsData?.favorites?.length
          ? `/game/${typeBoard}-cards/favorite`
          : `/game/${typeBoard}-cards`
      }
      className={styles.favoriteIcon}
    >
      <div>Favorite Cards</div>
      <div
        className={`${styles.heart} ${
          cardsData?.favorites?.length ? "" : styles.linkDisable
        }`}
      >
        <Heart />
      </div>
    </Link>
  );
  const renderIcons = getAvaibleTechnologies(Object.keys(cardsData || {})).map(
    ({ type, name, isActive, render: Component }) => (
      <li key={name} className={styles.boxTechnology}>
        <Link
          to={
            isActive
              ? `/game/${typeBoard}-cards/${name}`
              : `/game/${typeBoard}-cards`
          }
          className={`${styles.technology} ${
            isActive ? styles.activeLink : styles.linkDisable
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
      <BackButton pathTo="/game" />
      <div className={styles.board}>
        <div className={styles.boardTechnologies}>
          <h1 className={styles.title}>{`${capitalize(typeBoard)} Cards`}</h1>
          <div ref={getElements} className={styles.technology}>
            <ul className={styles.listTechnology}>{renderIcons}</ul>
          </div>
          {typeBoard === "personal" && <FavoriteIcon />}
        </div>
      </div>
    </>
  );
}
export { BoardWithIcons };
BoardWithIcons.displayName = "BoardWithIcons";
