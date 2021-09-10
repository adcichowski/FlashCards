import { useMemo, useState } from "react";
import { useModalContext } from "../../Context/ModalContext";
import { Button } from "../Button/Button";
import styles from "./Modal.module.scss";
import { ReactComponent as Star } from "../../Assets/Icons/star.svg";
import { useAuthContext } from "../../Context/AuthContext";
import { useCardContext } from "../../Context/CardContext";
import { useDeleteCard } from "../../Pages/Game/GenerateBoard/QuestionsBoard/useDeleteCard";
function RateModal() {
  const maxRateOnCard = useMemo(() => 5, []);
  const minRateOnCard = useMemo(() => -5, []);
  const { dispatch, state } = useModalContext();
  const { dispatch: authDispatch, state: authState } = useAuthContext();
  const { state: cardState } = useCardContext();
  const [rateValue, setRateValue] = useState(useMemo(() => 1, []));
  const { deleteCard } = useDeleteCard();
  const rateCard = () => {
    const {
      whoRate,
      answer,
      question,
      isFavorite,
      id,
      technology,
      rating,
      randomSvgCard,
    } = cardState;
    const ratedCard = {
      whoRate,
      answer,
      question,
      isFavorite,
      id,
      technology,
      rating,
      randomSvgCard,
    };
    const allRates = [...whoRate, { id: authState.idUser, rate: rateValue }];
    const overallCard =
      allRates.reduce((a, b) => a + b.rate, 0) / allRates.length;
    console.log(overallCard);
    if (overallCard < 2.7) {
      deleteCard(ratedCard, "generalCards");
      return;
    }
    const newRatedCard = {
      ...ratedCard,
      rating: overallCard,
      whoRate: allRates,
    };
    const indexOfRatedCard = authState.generalCards[
      ratedCard.technology
    ].findIndex(
      (card) =>
        card.answer === ratedCard.answer && card.question === ratedCard.question
    );
    const numberCards = authState.generalCards[ratedCard.technology].length;
    authDispatch({
      type: "setDeckCard",
      setUser: {
        ...authState,
        generalCards: {
          ...authState.generalCards,
          [ratedCard.technology]: [
            ...authState.generalCards[ratedCard.technology].slice(
              0,
              indexOfRatedCard
            ),
            newRatedCard,
            ...authState.generalCards[ratedCard.technology].slice(
              indexOfRatedCard + 1,
              numberCards
            ),
          ],
        },
      },
    });
    dispatch({ type: "closeModal" });
    // sendToFirestore(newRatedCard, "GeneralCards");
  };

  if (!state.isOpen) {
    return null;
  }
  const setYourRateCard = {
    initial: 0,
    add: () =>
      setRateValue(rateValue === maxRateOnCard ? rateValue : rateValue + 1),
    subtract: () =>
      setRateValue(rateValue === minRateOnCard ? rateValue : rateValue - 1),
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <p className={styles.modalTitle}>Rate Card</p>
        <div className={styles.blockButton}>
          <button
            className={styles.rateButton}
            onClick={() => setYourRateCard.subtract()}
          >
            -
          </button>
          <div className={styles.modalIcon}>
            <Star />
          </div>
          <button
            className={styles.rateButton}
            onClick={() => setYourRateCard.add()}
          >
            +
          </button>
        </div>
        <span className={styles.rateNumber}>{rateValue}</span>
        <p className={styles.modalText}>
          If the card overall will be smaller than 2.7 will be deleted!
        </p>
        <div className={styles.blockButton}>
          <Button
            type="button"
            onClick={() => dispatch({ type: "closeModal" })}
          >
            Close
          </Button>
          <Button onClick={() => rateCard()} type="button">
            Rate
          </Button>
        </div>
      </div>
    </div>
  );
}
export { RateModal };
RateModal.displayName = "RateModal";
