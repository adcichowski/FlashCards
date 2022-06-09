import { useCallback } from "react";
import { useCardContext } from "../../../../../context/CardContext";
import { ICard } from "../../../../../types/types";

function useQuestionBoard() {
  const { dispatch, state } = useCardContext();
  const handleClickShowCard = useCallback(
    (card: ICard) => {
      dispatch({
        type: "showCard",
        setCard: { ...card, isFlip: false },
      });
    },
    [dispatch],
  );

  return { handleClickShowCard, state, dispatch };
}
export { useQuestionBoard };
