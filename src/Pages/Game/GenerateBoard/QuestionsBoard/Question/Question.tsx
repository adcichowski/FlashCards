import { PersonalRate } from "./PersonalRate";
import { ReactComponent as Star } from "../../../../../Assets/Icons/star.svg";
import { ReactComponent as Heart } from "../../../../../Assets/Icons/heart.svg";
import { useQuestionBoard } from "../useQuestionBoard";
import { ICard } from "../../../../../Types/Types";
import styles from "./Question.module.scss";
import { useCardContext } from "../../../../../Context/CardContext";
import { useCallback } from "react";
import { useDeleteCard } from "./useDeleteCard";
import { sendFunctionsToFirebase } from "../../../../../lib/firebase/Utils";
import { useAuthContext } from "../../../../../Context/AuthContext";
import { Button } from "../../../../../Components/Button/Button";
const Question = ({ card, typeBoard }: { card: ICard; typeBoard: string }) => {
  const { deleteCard } = useDeleteCard();
  const { handleClickShowCard } = useQuestionBoard();
  const { state } = useAuthContext();
  const { dispatch } = useCardContext();
  const { sendDeck } = sendFunctionsToFirebase();
  const setFavorite = useCallback(
    (card: ICard) => {
      if (card.isFavorite) return;
      sendDeck(
        {
          ...state.personalCards,
          favorites: [
            ...(state?.personalCards?.favorites?.length
              ? state.personalCards.favorites
              : []),
            card,
          ],
        },
        state.idUser
      );
      dispatch({
        type: "editCard",
        setCard: { ...card, isFlip: false, isFavorite: true },
      });
    },
    [sendDeck, dispatch, state.idUser, state.personalCards]
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
          <Button
            size="small"
            type="button"
            onClick={() => deleteCard(card, typeBoard)}
          >
            Delete
          </Button>
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
            {card.whoRate.reduce((prev, { rate }) => (prev += rate), 0) /
              card.whoRate.length}
            x
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
