import { useAuthContext } from "../../../../Context/AuthContext";
import { ICard, PersonRating } from "../../../../Types/Types";
import { useModalContext } from "../../../../Context/ModalContext";
import { SmallButton } from "../../../../Components/Button/SmallButton";
import { ReactComponent as Star } from "../../../../Assets/Icons/star.svg";
import styles from "./QuestionsBoard.module.scss";
function PersonalRate({ card }: { card: ICard }) {
  const { state: stateAuth } = useAuthContext();
  const { dispatch: dispatchModal } = useModalContext();
  const yourRate = card.whoRate.find(
    (person: PersonRating) => person.id === stateAuth.idUser
  );
  return yourRate ? (
    <div
      className={`${styles.questionRatePesonal} ${styles.questionRatePesonalInfo}`}
    >
      Your {yourRate.rate}x
      <div className={styles.smallStar}>
        <Star />
      </div>
    </div>
  ) : (
    <div className={styles.questionRatePesonal}>
      <SmallButton
        type="button"
        onClick={() => dispatchModal({ type: "rateModal" })}
      >
        Rate
      </SmallButton>
    </div>
  );
}
PersonalRate.displayName = "PersonalRate";
export { PersonalRate };
