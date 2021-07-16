import { useCardContext } from "../../../Context/CardContext";
import styles from "./Card.module.scss";

export default function Card() {
  const { state, dispatch } = useCardContext();
  if (!state.isShow) return null;
  console.log(state);
  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>Ikona </div>
      <div className={styles.cardCenter}>
        {state.isFlip} ? {state.question} : {state.answer}
      </div>
      <button onClick={() => dispatch({ type: "flipCard" })}>
        Show Answer
      </button>
    </div>
  );
}
