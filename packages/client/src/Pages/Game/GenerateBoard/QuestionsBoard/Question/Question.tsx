import { PersonalRate } from "./PersonalRate";
import Star from "../../../../../Assets/Icons/star.svg";
import Heart from "../../../../../Assets/Icons/heart.svg";
import { useQuestionBoard } from "../useQuestionBoard";
import { ICard, ITypeBoard } from "../../../../../Types/Types";
import styles from "./Question.module.scss";
import { useDeleteCard } from "./useDeleteCard";
import { Button } from "../../../../../Components/Button/Button";
import { useIsFavorire } from "./useIsFavorire";
const Question = ({ card, typeBoard }: { readonly card: ICard; readonly typeBoard: ITypeBoard }) => {
  const { deleteCard } = useDeleteCard();
  const { handleClickShowCard } = useQuestionBoard();

  const { isFavorite, setFavorite } = useIsFavorire(card);

  return (
    <li key={`${card.id}` + card.answer} className={styles.questionCard}>
      {typeBoard !== "favoriteCards" && (
        <button onClick={() => setFavorite(card)} className={`${styles.questionFavorite}`}>
          <Heart className={`${isFavorite ? styles.fill : ""}`} />
        </button>
      )}
      <div className={styles.deleteButton}>
        {typeBoard !== "generalCards" && (
          <Button size="small" type="button" onClick={() => deleteCard(card, typeBoard)}>
            Delete
          </Button>
        )}
      </div>
      <button onClick={() => handleClickShowCard({ ...card, isFavorite })} className={styles.questionCardInner}>
        <div className={styles.centerCard}>
          <p className={styles.question}>{card.question}</p>
          <div className={styles.questionId}>{card.id.toString().length >= 2 ? card.id : 0 + card.id}</div>
        </div>
        <div className={styles.questionRateGeneral}>
          <div className={styles.questionRate}>
            <span>Overall</span>
            {card.whoRate.reduce((prev, { rate }) => prev + rate, 0) / card.whoRate.length}x
            <div className={styles.star}>
              <Star />
            </div>
          </div>
        </div>
      </button>
      {typeBoard === "generalCards" && <PersonalRate card={card} />}
    </li>
  );
};

export { Question };
Question.displayName = "Question";
