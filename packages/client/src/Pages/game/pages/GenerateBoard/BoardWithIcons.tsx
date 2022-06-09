import styles from "./BoardWithIcons.module.scss";
import { BackButton } from "../../../../components/Button/BackButton/BackButton";
import { useAvaibleTechnologies } from "../../../../components/Pages/Game/useAvaibleTechnologies";
import { Link, useLocation } from "react-router-dom";
import { capitalize } from "../../../../Utils/Utils";
import { useAnimationGSAP } from "../../../../hooks/useAnimationGSAP";
import { AnimateIconTech } from "../../../../lib/gsap/AnimateIconTech";
import { useEffect } from "react";
import { useCardContext } from "../../../../context/CardContext";
import { useQuery } from "react-query";
function BoardWithIcons() {
  const { dispatch, state } = useCardContext();
  const typeBoard = useLocation().pathname.split("/").slice(-1)[0];
  const { data: cardsData, isLoading } = useQuery(`${typeBoard} cards`, async () => {});
  useEffect(() => {
    if (state.isShow) {
      dispatch({
        type: "resetCard",
      });
    }
  });
  const { getElements } = useAnimationGSAP(AnimateIconTech);
  const { getAvaibleTechnologies } = useAvaibleTechnologies();
  // const FavoriteIcon = () => (
  //   <Link
  //     to={
  //       cardsData?.favorites?.length
  //         ? `/game/${typeBoard}/favorite`
  //         : `/game/${typeBoard}`
  //     }
  //     className={styles.favoriteIcon}
  //   >
  //     <div>Favorite Cards</div>
  //     <div
  //       className={`${styles.heart} ${
  //         cardsData?.favorites?.length ? "" : styles.linkDisable
  //       }`}
  //     >
  //       <Heart />
  //     </div>
  //   </Link>
  // );
  const renderIcons =
    !isLoading &&
    cardsData !== undefined &&
    getAvaibleTechnologies(Object.keys(cardsData)).map(({ type, name, isActive, render: Component }) => (
      <li key={name} className={styles.boxTechnology}>
        <Link
          to={isActive ? `/game/${typeBoard}/${name}` : `/game/${typeBoard}`}
          className={`${styles.technology} ${isActive ? styles.activeLink : styles.linkDisable}`}
        >
          <p className={styles.technologyType}>{type}</p>
          <div className={styles.icon}>
            <Component />
          </div>
          <p className={styles.nameTechnology}>{capitalize(name)}</p>
        </Link>
      </li>
    ));

  return (
    <>
      <BackButton pathTo="/game" />
      <div className={styles.board}>
        <div className={styles.boardTechnologies}>
          <h1 className={styles.title}>{`${capitalize(typeBoard)} Cards`}</h1>
          <div ref={getElements} className={styles.technology}>
            <ul className={styles.listTechnology}>{renderIcons}</ul>
          </div>
          {/* {typeBoard === "personal" && <FavoriteIcon />} */}
        </div>
      </div>
    </>
  );
}
export { BoardWithIcons };
BoardWithIcons.displayName = "BoardWithIcons";
