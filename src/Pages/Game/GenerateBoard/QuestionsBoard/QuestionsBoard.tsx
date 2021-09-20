import { BackButton } from "../../../../Components/Button/BackButton/BackButton";
import { ICard } from "../../../../Types/Types";
import { CardByContext } from "../../../../Components/Pages/Game/CardByContext/CardByContext";
import styles from "./QuestionsBoard.module.scss";
import { Question } from "./Question/Question";
import { Technologies } from "../../../../Components/Pages/Game/useAvaibleTechnologies";

function QuestionsBoard({
  cardsData,
  technologyName,
  typeBoard,
}: {
  cardsData: { [index: string]: ICard[] };
  technologyName: Technologies | "favorites";
  typeBoard: "personalCards" | "generalCards";
}) {
  return (
    <div>
      <BackButton />
      <div className={styles.board}>
        <div>{/* add ui to change technology */}</div>
        <div className={styles.cardBoard}>
          <CardByContext />
        </div>
        <div className={styles.questionBoard}>
          <p className={styles.boardTitle}>Questions</p>
          {cardsData[technologyName]?.length && (
            <ul className={styles.listQuestion}>
              {cardsData[technologyName].map((card: ICard) => (
                <Question
                  key={card.question + card.id}
                  typeBoard={typeBoard}
                  card={card}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
export { QuestionsBoard };
