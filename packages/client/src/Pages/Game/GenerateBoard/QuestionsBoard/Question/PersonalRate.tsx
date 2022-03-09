import { useAuthContext } from "../../../../../Context/AuthContext";
import { ICard, PersonRating } from "../../../../../Types/Types";
import { useModalContext } from "../../../../../Context/ModalContext";
import Star from "../../../../../Assets/Icons/star.svg";
import styles from "./Question.module.scss";
import { useCardContext } from "../../../../../Context/CardContext";
import { Button } from "../../../../../Components/Button/Button";
function PersonalRate({ card }: { readonly card: ICard }) {
  const { state: stateAuth } = useAuthContext();
  const { dispatch: dispatchModal } = useModalContext();
  const { state: stateCard, dispatch: dispatchCard } = useCardContext();
  const yourRate = card.whoRate.find((person: PersonRating) => person.id === stateAuth.idUser);
  return yourRate ? (
    <div className={`${styles.questionRatePesonal} ${styles.questionRatePesonalInfo}`}>
      Your {yourRate.rate}x
      <div className={styles.smallStar}>
        <Star />
      </div>
    </div>
  ) : (
    <div className={styles.questionRatePesonal}>
      <Button
        size="small"
        type="button"
        onClick={() => {
          dispatchCard({
            type: "editCard",
            setCard: { ...stateCard, ...card },
          });
          dispatchModal({ type: "rateModal" });
        }}
      >
        Rate
      </Button>
    </div>
  );
}
PersonalRate.displayName = "PersonalRate";
export { PersonalRate };
