import { useCallback } from "react";
import { useCardContext } from "../../../Context/CardContext";
import { Card } from "../../../Types";

export default function useCardByContext(saveAllDataCards: Card[]) {
  const { state, dispatch } = useCardContext();
  const getIndexOpenedCard = saveAllDataCards.findIndex(
    (item) => item.question === state.question
  );
  const handleClickNextCard = useCallback(() => {
    dispatch({
      type: "nextCard",
      setCard: { ...saveAllDataCards[getIndexOpenedCard + 1], isFlip: false },
    });
  }, [dispatch, saveAllDataCards, getIndexOpenedCard]);
  const handleClickPrevCard = useCallback(() => {
    dispatch({
      type: "nextCard",
      setCard: { ...saveAllDataCards[getIndexOpenedCard - 1], isFlip: false },
    });
  }, [dispatch, saveAllDataCards, getIndexOpenedCard]);
  const handleClickFlipCard = useCallback(() => {
    dispatch({ type: "flipCard" });
  }, [dispatch]);
  return {
    handleClickNextCard,
    handleClickPrevCard,
    handleClickFlipCard,
    state,
  };
}
