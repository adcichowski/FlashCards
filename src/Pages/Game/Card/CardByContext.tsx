import { useAvaibleTechnologies } from "../../../Components/Pages/Game/useAvaibleTechnologies";
import { Card } from "../../../Types";
import { capitalize } from "../../../Utils/Utils";
import styles from "./CardByContext.module.scss";
import CardWave from "./CardWave";
import useCardByContext from "./useCardByContext";
export default function CardByContext({
  saveAllDataCards,
}: {
  saveAllDataCards: Card[];
}) {
  const { avaibleTechnologies } = useAvaibleTechnologies();
  const {
    state,
    handleClickPrevCard,
    handleClickNextCard,
    handleClickFlipCard,
  } = useCardByContext(saveAllDataCards);
  if (!state.isShow) return null;
  const CardIcon = avaibleTechnologies[state.technology].render;
  const colorTechnology = avaibleTechnologies[state.technology].fill;
  return (
    <div className={styles.cardWrapper}>
      <p>{state.rating}</p>
      <div className={styles.card}>
        <div className={styles.wave}>
          <CardWave color={colorTechnology} />
        </div>
        <div className={styles.cardTop}>
          <div
            style={{ fill: colorTechnology }}
            className={`${styles[state.technology]} ${styles.icon}`}
          >
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
          <button onClick={handleClickPrevCard} className={styles.button}>
            Prev Card
          </button>
          <button className={styles.button} onClick={handleClickFlipCard}>
            {state.isFlip ? "Show Question" : "Show Answer"}
          </button>
          <button onClick={handleClickNextCard} className={styles.button}>
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
