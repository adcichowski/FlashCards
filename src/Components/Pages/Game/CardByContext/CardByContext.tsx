import { capitalize } from "../../../../Utils/Utils";
import styles from "./CardByContext.module.scss";
import { CardWave } from "./CardWave";
import { useCardByContext } from "./useCardByContext";
import { ReactComponent as Star } from "../../../../Assets/Icons/star.svg";
import { ReactComponent as Heart } from "../../../../Assets/Icons/heart.svg";
import { Button } from "../../../Button/Button";
function CardByContext({ isEdit }: { isEdit?: boolean }) {
  const {
    state,
    dispatch,
    handleClickFlipCard,
    getIconAndColor,
    handleClickHideCard,
  } = useCardByContext();
  const { CardIcon, colorIcon } = getIconAndColor();
  if (!state.isShow) return null;
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.rating}>
        Rating
        <div className={styles.star}>
          <Star />
        </div>
        x{state.rating}
      </div>
      <div className={styles.card}>
        <div className={styles.wave}>
          <CardWave color={colorIcon} />
        </div>
        <div className={styles.cardTop}>
          <div style={{ fill: colorIcon }} className={styles.icon}>
            <CardIcon />
          </div>
          <span className={styles.iconText}>
            {capitalize(state.technology)}
          </span>
        </div>
        <div className={styles.cardCenterTop}>
          {state.isFlip ? (
            <div className={styles.answer}>{state.answer}</div>
          ) : (
            <div className={styles.question}>{state.question}</div>
          )}
        </div>
        <div className={styles.cardCenterBottom}>0{state.id}</div>
        <div className={styles.cardButtons}>
          <button className={styles.button}>Prev Card</button>
          <button className={styles.button} onClick={handleClickFlipCard}>
            {state.isFlip ? "Show Question" : "Show Answer"}
          </button>
          <button className={styles.button}>Next Card</button>
        </div>
      </div>
      <div className={styles.favorite}>
        <p className={styles.favoriteText}>
          {state.isFavorite ? "Favorite Card" : "Not Favorite Card"}
        </p>
        <div
          className={`${styles.favoriteIcon}  ${
            state.isFavorite && styles.fill
          }`}
        >
          <Heart />
        </div>
      </div>

      <div className={styles.functionallButtons}>
        {isEdit ? (
          <Button onClick={() => dispatch({ type: "randomSVG" })} type="button">
            Set Shape
          </Button>
        ) : null}
        <div className={styles.hideButton}>
          <Button type="button" onClick={handleClickHideCard}>
            Hide Card
          </Button>
        </div>
      </div>
    </div>
  );
}
export { CardByContext };
CardByContext.displayName = "CardByContext";
