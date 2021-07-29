import { useCallback } from "react";
import { useAvaibleTechnologies } from "../../../../Components/Pages/Game/useAvaibleTechnologies";
import { useCardContext } from "../../../../Context/CardContext";
import { Card } from "../../../../Types/Types";

function useQuestionBoard(nameTechnology: string) {
  const { avaibleTechnologies } = useAvaibleTechnologies();
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

  const colorTechnology = avaibleTechnologies[nameTechnology].fill;

  return { handleClickShowCard, colorTechnology, state };
}
export { useQuestionBoard };
