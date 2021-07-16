import { useCardContext } from "../../../../Context/CardContext";
import { Card } from "../../../../Types";
import CardComponent from "../../Card/Card";
import BlooperSVG from "./BlooperSVG/BlooperSVG";
import styles from "./QuestionBoard.module.scss";
export default function QuestionBoard({
  blooperColors,
  cardsData,
  technologyBoardName,
}: {
  blooperColors: string;
  cardsData: Card[];
  technologyBoardName: string;
}) {
  const { dispatch } = useCardContext();
  return (
    <>
      <BlooperSVG fill={blooperColors} />
      <div className={styles.board}>
        <h1 className={styles.someFeature}>Some Feature</h1>
        <div className={styles.cardBoard}>
          <CardComponent />
        </div>
        <div className={styles.questionBoard}>
          <p className={styles.questionTitle}>Questions</p>
          <ul className={styles.listQuestion}>
            {cardsData.map((card: Card, id) =>
              card.technology === technologyBoardName ? (
                <li className={styles.questionCard}>
                  <button
                    onClick={() => {
                      dispatch({ type: "showCard", setCard: card });
                    }}
                    className={styles.questionCardInner}
                  >
                    <button className={styles.questionDots}></button>
                    <p className={styles.question}>{card.question}</p>
                    <div className={styles.questionId}>00{id}</div>
                  </button>
                </li>
              ) : undefined
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
