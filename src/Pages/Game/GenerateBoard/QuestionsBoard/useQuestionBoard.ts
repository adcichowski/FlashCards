import { useCallback } from "react";
import { useCardContext } from "../../../../Context/CardContext";
import { Card } from "../../../../Types/Types";

function useQuestionBoard(nameTechnology: string) {
  const { dispatch, state } = useCardContext();
  const handleClickShowCard = useCallback(
    (card: Card) => {
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
