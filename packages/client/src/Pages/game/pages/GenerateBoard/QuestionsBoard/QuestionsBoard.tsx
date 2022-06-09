import { BackButton } from "../../../../../components/Button/BackButton/BackButton";
import { CardByContext } from "../../../components/CardByContext/CardByContext";
import styles from "./QuestionsBoard.module.scss";

function QuestionsBoard() {
  // {
  //   cardsData,
  //   typeBoard,
  // }: {
  //   readonly cardsData: readonly ICard[];
  //   readonly typeBoard: "personalCards" | "generalCards" | "favoriteCards";
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
          {/* {!!cardsData?.length && (
            <ul className={styles.listQuestion}>
              {cardsData.map((card: ICard) => (
                <Question
                  key={card.question + card.id}
                  typeBoard={typeBoard}
                  card={card}
                />
              ))}
            </ul>
          )} */}
        </div>
      </div>
    </div>
  );
}
export { QuestionsBoard };
