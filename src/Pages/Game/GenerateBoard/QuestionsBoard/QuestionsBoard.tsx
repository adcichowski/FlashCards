import { BackButton } from "../../../../Components/Button/BackButton/BackButton";
import { ICard } from "../../../../Types/Types";
import { CardByContext } from "../../../../Components/Pages/Game/CardByContext/CardByContext";
import styles from "./QuestionsBoard.module.scss";
import { Question } from "./Question/Question";
function QuestionsBoard({
  cardsData,
  technologyName,
}: {
  cardsData: { [index: string]: ICard[] };
  technologyName: string;
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
          <ul className={styles.listQuestion}>
            {cardsData[technologyName].map((card: ICard) => (
              <Question {...card} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export { QuestionsBoard };
