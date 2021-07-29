import { BackButton } from "../../../../Components/Button/BackButton/BackButton";
import { Card } from "../../../../Types/Types";
import { CardByContext } from "../../AddCard/CardByContext/CardByContext";
import { BlooperSVG } from "./BlooperSVG/BlooperSVG";
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
  console.log(sortedCardsByTech);
  const { handleClickShowCard, colorTechnology } =
    useQuestionBoard(technologyBoardName);
  return (
    <>
      <BackButton />
      <BlooperSVG fill={colorTechnology} />
      <div className={styles.board}>
        <div className={styles.someFeature}></div>
        <div className={styles.cardBoard}>
          <CardByContext allSortedDataCards={sortedCardsByTech} />
        </div>
        <div className={styles.questionBoard}>
          <p className={styles.questionTitle}>Questions</p>
          <ul className={styles.listQuestion}>
            {sortedCardsByTech.map((card: Card, id) => (
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
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
export { QuestionBoard };
