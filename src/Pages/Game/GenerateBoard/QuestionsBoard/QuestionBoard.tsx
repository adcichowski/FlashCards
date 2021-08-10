import { BackButton } from "../../../../Components/Button/BackButton/BackButton";
import { Card } from "../../../../Types/Types";
import { CardByContext } from "../../../../Components/Pages/Game/CardByContext/CardByContext";
import styles from "./QuestionBoard.module.scss";
import { useQuestionBoard } from "./useQuestionBoard";
import { useRef } from "react";
function QuestionBoard({
  cardsData,
  technologyName,
}: {
  cardsData: { [index: string]: Card[] };
  technologyName: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { handleClickShowCard } = useQuestionBoard(technologyName);
  return (
    <>
      <BackButton />
      <div className={styles.board}>
        <div className={styles.cardBoard}>
          <CardByContext />
        </div>
        <div ref={ref} className={styles.questionBoard}>
          <p className={styles.boardTitle}>Questions</p>
          <ul className={styles.listQuestion}>
            {cardsData[technologyName]
              .sort((a, b) => a.id - b.id)
              .map((card: Card, id) => (
                <li key={card.question} className={styles.questionCard}>
                  <div
                    onClick={() => {
                      handleClickShowCard(card);
                    }}
                    className={styles.questionCardInner}
                  >
                    <button className={styles.questionDots}></button>
                    <p className={styles.question}>{card.question}</p>
                    <p>{card.rating}</p>
                    <div className={styles.questionId}>0{card.id}</div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
export { QuestionBoard };
