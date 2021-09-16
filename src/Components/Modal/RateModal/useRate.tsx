import { useMemo, useState } from "react";
import { useAuthContext } from "../../../Context/AuthContext";
import { useCardContext } from "../../../Context/CardContext";
import { useModalContext } from "../../../Context/ModalContext";
import { rateCardInFirestore } from "../../../lib/firebase/Utils";
import { useDeleteCard } from "../../../Pages/Game/GenerateBoard/QuestionsBoard/useDeleteCard";

export function useRate() {
  const maxRateOnCard = useMemo(() => 5, []);
  const minRateOnCard = useMemo(() => 1, []);
  const { dispatch: authDispatch, state: authState } = useAuthContext();
  const { state: cardState } = useCardContext();
  const { deleteCard } = useDeleteCard();
  const { dispatch } = useModalContext();
  const [rateValue, setRateValue] = useState(useMemo(() => 1, []));
  const setYourRateCard = {
    initial: 0,
    add: () =>
      setRateValue(rateValue === maxRateOnCard ? rateValue : rateValue + 1),
    subtract: () =>
      setRateValue(rateValue === minRateOnCard ? rateValue : rateValue - 1),
  };
  const rateCard = () => {
    const {
      whoRate,
      answer,
      question,
      isFavorite,
      id,
      technology,
      randomSvgCard,
    } = cardState;
    const ratedCard = {
      whoRate,
      answer,
      question,
      isFavorite,
      id,
      technology,
      randomSvgCard,
    };
    const allRates = [...whoRate, { id: authState.idUser, rate: rateValue }];
    const overallCard =
      allRates.reduce((a, b) => a + b.rate, 0) / allRates.length;
    const newRatedCard = {
      ...ratedCard,
      rating: Math.floor(overallCard),
      whoRate: allRates,
    };
    if (overallCard < 2) {
      deleteCard(ratedCard, "generalCards");
      dispatch({ type: "closeModal" });
      return;
    }
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
    rateCardInFirestore(newRatedCard);
  };
  return { rateCard, setYourRateCard, rateValue };
}
