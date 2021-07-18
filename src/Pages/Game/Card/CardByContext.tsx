import { useAvaibleTechnologies } from "../../../Components/Pages/Game/useAvaibleTechnologies";
import { useCardContext } from "../../../Context/CardContext";
import styles from "./CardByContext.module.scss";

export default function CardByContext() {
  const { state, dispatch } = useCardContext();
  const { avaibleTechnologies } = useAvaibleTechnologies();
  if (!state.isShow) return null;
  console.log(avaibleTechnologies[state.technology].render);
  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>Ikona</div>
      <div className={styles.cardCenter}>
        {state.isFlip ? state.answer : state.question}
      </div>
      <div className={styles.cardButtons}>
        <button>Prev Card</button>
        <button onClick={() => dispatch({ type: "flipCard" })}>
          {state.isFlip ? "Show Question" : "Show Answer"}
        </button>
        <button>Next Card</button>
      </div>
    </div>
  );
}
