import { PersonalRate } from "./PersonalRate";
import { ReactComponent as Star } from "../../../../../Assets/Icons/star.svg";
import { ReactComponent as Heart } from "../../../../../Assets/Icons/heart.svg";
import { ReactComponent as FillHeart } from "../../../../../Assets/Icons/heart-fill.svg";
import { useQuestionBoard } from "../useQuestionBoard";
import { SmallButton } from "../../../../../Components/Button/SmallButton";
import { ICard } from "../../../../../Types/Types";
import styles from "./Question.module.scss";
const Question = ({ card, typeBoard }: { card: ICard; typeBoard: string }) => {
  const { handleClickShowCard } = useQuestionBoard();
  return (
    <li key={card.id} className={styles.questionCard}>
      <div className={styles.questionFavorite}>
        {card.isFavorite ? <FillHeart /> : <Heart />}
      </div>
      <div className={styles.deleteButton}>
        {typeBoard === "personal" && (
          <SmallButton type="button">Delete</SmallButton>
        )}
      </div>
      <button
        onClick={() => {
          handleClickShowCard(card);
        }}
        className={styles.questionCardInner}
      >
        <div>
          <p className={styles.question}>{card.question}</p>
          <div className={styles.questionId}>0{card.id}</div>
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
      {typeBoard === "personal" || <PersonalRate card={card} />}
    </li>
  );
};
export { Question };
Question.displayName = "Question";
