import { useAvaibleTechnologies } from "../../../Components/Pages/Game/useAvaibleTechnologies";
import { useCardContext } from "../../../Context/CardContext";
import { capitalize } from "../../../Utils/Utils";
import styles from "./CardByContext.module.scss";
import CardWave from "./CardWave";
export default function CardByContext() {
  const { state, dispatch } = useCardContext();
  const { avaibleTechnologies } = useAvaibleTechnologies();
  if (!state.isShow) return null;
  const CardIcon = avaibleTechnologies[state.technology].render;
  return (
    <div className={styles.cardWrapper}>
      <p>{state.rating}</p>
      <div className={styles.card}>
        <div className={styles.wave}>
          <CardWave />
        </div>
        <div className={styles.cardTop}>
          <div className={`${styles[state.technology]} ${styles.icon}`}>
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
          <button
            className={styles.button}
            onClick={() => dispatch({ type: "flipCard" })}
          >
            {state.isFlip ? "Show Question" : "Show Answer"}
          </button>
          <button className={styles.button}>Next Card</button>
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
