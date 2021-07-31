import { BackButton } from "../../../../Components/Button/BackButton/BackButton";
import { Card } from "../../../../Types/Types";
import { CardByContext } from "../../../../Components/Pages/Game/CardByContext/CardByContext";
import styles from "./QuestionBoard.module.scss";
import { useQuestionBoard } from "./useQuestionBoard";
function QuestionBoard({
  cardsData,
  technologyBoardName,
}: {
  cardsData: Card[];
  technologyBoardName: string;
}) {
  const sortedCardsByTech = cardsData.filter(
    (card) => card.technology === technologyBoardName
  );
  const { handleClickShowCard, colorTechnology } =
    useQuestionBoard(technologyBoardName);
  return (
    <>
      <BackButton />
      <div className={styles.board}>
        <div className={styles.changeTech}></div>
        <div className={styles.cardBoard}>
          <CardByContext allSortedDataCards={sortedCardsByTech} />
        </div>
        <div className={styles.questionBoard}>
          <p className={styles.questionTitle}>Questions</p>
          <ul className={styles.listQuestion}>
            {sortedCardsByTech.map((card: Card, id) => (
              <li
                key={id}
                className={styles.questionCard}
                style={{ borderColor: colorTechnology }}
              >
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
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
export { QuestionBoard };
