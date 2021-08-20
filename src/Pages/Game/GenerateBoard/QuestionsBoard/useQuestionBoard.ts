import { useCallback } from "react";
import { useCardContext } from "../../../../Context/CardContext";
import { ICard } from "../../../../Types/Types";

function useQuestionBoard() {
  const { dispatch, state } = useCardContext();
  const handleClickShowCard = useCallback(
    (card: ICard) => {
      dispatch({
        type: "showCard",
        setCard: { ...card, isFlip: false },
      });
    },
    [dispatch]
  );

  return { handleClickShowCard, state, dispatch };
}
export { useQuestionBoard };
