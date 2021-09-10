import { PersonalRate } from "./PersonalRate";
import { ReactComponent as Star } from "../../../../../Assets/Icons/star.svg";
import { ReactComponent as Heart } from "../../../../../Assets/Icons/heart.svg";
import { useQuestionBoard } from "../useQuestionBoard";
import { SmallButton } from "../../../../../Components/Button/SmallButton";
import { ICard } from "../../../../../Types/Types";
import styles from "./Question.module.scss";
import { useCardContext } from "../../../../../Context/CardContext";
import { useCallback } from "react";
import { useDeleteCard } from "../useDeleteCard";
const Question = ({ card, typeBoard }: { card: ICard; typeBoard: string }) => {
  const { deleteCard } = useDeleteCard();
  const { handleClickShowCard } = useQuestionBoard();
  const { dispatch } = useCardContext();
  const setFavorite = useCallback(
    (card: ICard) => {
      dispatch({
        type: "editCard",
        setCard: { ...card, isFlip: false, isFavorite: !card.isFavorite },
      });
    },
    [dispatch]
  );
  return (
    <li key={card.id + card.answer} className={styles.questionCard}>
      <button
        onClick={() => setFavorite(card)}
        className={`${styles.questionFavorite} ${
          card.isFavorite && styles.fill
        }`}
      >
        <Heart />
      </button>
      <div className={styles.deleteButton}>
        {typeBoard === "personalCards" && (
          <SmallButton
            type="button"
            onClick={() => deleteCard(card, typeBoard)}
          >
            Delete
          </SmallButton>
        )}
      </div>
      <button
        onClick={() => handleClickShowCard(card)}
        className={styles.questionCardInner}
      >
        <div className={styles.centerCard}>
          <p className={styles.question}>{card.question}</p>
          <div className={styles.questionId}>
            {card.id.toString().length >= 2 ? card.id : "0" + card.id}
          </div>
        </div>
        <div className={styles.questionRateGeneral}>
          <div className={styles.questionRate}>
            <span>Overall</span>
            {card.rating}x
            <div className={styles.star}>
              <Star />
            </div>
          </div>
        </div>
      </button>
      {typeBoard === "personalCards" || <PersonalRate card={card} />}
    </li>
  );
};
export { Question };
Question.displayName = "Question";
