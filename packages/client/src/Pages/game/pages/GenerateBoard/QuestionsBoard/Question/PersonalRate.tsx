import { useAuthContext } from "../../../../../../context/AuthContext";
import { ICard, PersonRating } from "../../../../../../types/types";
import { useModalContext } from "../../../../../../context/ModalContext";
import Star from "../../../../../Assets/Icons/star.svg";
import styles from "./Question.module.scss";
import { useCardContext } from "../../../../../../context/CardContext";
import { Button } from "../../../../../../components/Button/Button";
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
