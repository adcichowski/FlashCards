import { Card } from "../../../../Types";
import CardByContext from "../../Card/CardByContext";
import BlooperSVG from "./BlooperSVG/BlooperSVG";
import styles from "./QuestionBoard.module.scss";
import { useQuestionBoard } from "./useQuestionBoard";
export default function QuestionBoard({
  cardsData,
  technologyBoardName,
}: {
  cardsData: Card[];
  technologyBoardName: string;
}) {
  const { handleClickShowCard, colorTechnology } =
    useQuestionBoard(technologyBoardName);
  return (
    <>
      <BlooperSVG fill={colorTechnology} />
      <div className={styles.board}>
        <h1 className={styles.someFeature}>Some Feature</h1>
        <div className={styles.cardBoard}>
          <CardByContext />
        </div>
        <div className={styles.questionBoard}>
          <p className={styles.questionTitle}>Questions</p>
          <ul className={styles.listQuestion}>
            {cardsData.map((card: Card, id) =>
              card.technology === technologyBoardName ? (
                <li key={id} className={styles.questionCard}>
                  <div
                    onClick={() => {
                      handleClickShowCard(card);
                    }}
                    className={styles.questionCardInner}
                  >
                    <button className={styles.questionDots}></button>
                    <p className={styles.question}>{card.question}</p>
                    <div className={styles.questionId}>0{card.id}</div>
                  </div>
                </li>
              ) : undefined
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
