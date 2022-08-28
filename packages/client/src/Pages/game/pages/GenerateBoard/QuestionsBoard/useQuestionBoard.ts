import { useCallback } from "react";
import { useCardContext } from "src/context/CardContext";
import { ICard } from "src/types/types";

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
