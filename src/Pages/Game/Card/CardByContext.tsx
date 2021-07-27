import { Card } from "../../../Types";
import { capitalize } from "../../../Utils/Utils";
import styles from "./CardByContext.module.scss";
import CardWave from "./CardWave";
import useCardByContext from "./useCardByContext";
export default function CardByContext({
  allSortedDataCards,
}: {
  allSortedDataCards: Card[];
}) {
  const {
    state,
    handleClickNextOrPrevCard,
    handleClickFlipCard,
    getIconWithColor,
  } = useCardByContext(allSortedDataCards);
  const { CardIcon, colorIcon } = getIconWithColor();
  if (!state.isShow) return null;

  return (
    <div className={styles.cardWrapper}>
      <p>{state.rating}</p>
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
          <button
            onClick={handleClickNextOrPrevCard(-1)}
            className={styles.button}
          >
            Prev Card
          </button>
          <button className={styles.button} onClick={handleClickFlipCard}>
            {state.isFlip ? "Show Question" : "Show Answer"}
          </button>
          <button
            onClick={handleClickNextOrPrevCard(1)}
            className={styles.button}
          >
            Next Card
          </button>
        </div>
      </div>
      <p>
        {state.isFavorite
          ? "Its your favorite card"
          : "Its not your favorite card"}
      </p>
    </div>
  );
}
