import { BackButton } from "../../../../Components/Button/BackButton/BackButton";
import { Card } from "../../../../Types/Types";
import { CardByContext } from "../../../../Components/Pages/Game/CardByContext/CardByContext";
import styles from "./QuestionBoard.module.scss";
import { ReactComponent as Star } from "../../../../Assets/Icons/star.svg";
import { ReactComponent as Heart } from "../../../../Assets/Icons/heart.svg";
import { ReactComponent as FillHeart } from "../../../../Assets/Icons/heart-fill.svg";
import { useQuestionBoard } from "./useQuestionBoard";
import { useModalContext } from "../../../../Context/ModalContext";
import { SmallButton } from "../../../../Components/Button/SmallButton";
function QuestionBoard({
  cardsData,
  technologyName,
}: {
  cardsData: { [index: string]: Card[] };
  technologyName: string;
}) {
  const { dispatch: dispatchModal } = useModalContext();
  const { handleClickShowCard, state } = useQuestionBoard();
  return (
    <div>
      <BackButton />
      <div className={styles.board}>
        <div></div>
        <div className={styles.cardBoard}>
          <div className={state.isShow ? styles.cardWrapper : ""}>
            <CardByContext />
          </div>
        </div>
        <div className={styles.questionBoard}>
          <p className={styles.boardTitle}>Questions</p>
          <ul className={styles.listQuestion}>
            {cardsData[technologyName].map((card: Card, id) => (
              <li key={card.question} className={styles.questionCard}>
                <div className={styles.questionFavorite}>
                  {card.isFavorite ? <FillHeart /> : <Heart />}
                </div>
                <div className={styles.deleteButton}>
                  <SmallButton type="button">Delete</SmallButton>
                </div>
                <button
                  onClick={() => {
                    handleClickShowCard(card);
                  }}
                  className={styles.questionCardInner}
                >
                  <div className={styles.centerCardQuestion}>
                    <p className={styles.question}>{card.question}</p>
                    <div className={styles.questionId}>0{card.id}</div>
                  </div>
                  <div className={styles.blockQuestionRate}>
                    <div className={styles.questionRate}>
                      <p>Overall</p>
                      {card.rating}x
                      <Star />
                    </div>
                    <div></div>
                  </div>
                </button>
                <div
                  className={styles.questionRatePesonal}
                  onClick={() => dispatchModal({ type: "rateModal" })}
                >
                  Your 5x <Star />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export { QuestionBoard };
