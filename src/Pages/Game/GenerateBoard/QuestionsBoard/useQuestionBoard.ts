import { useAvaibleTechnologies } from "../../../../Components/Pages/Game/useAvaibleTechnologies";
import { useCardContext } from "../../../../Context/CardContext";
import { Card } from "../../../../Types";

export function useQuestionBoard(nameTechnology: string) {
  const { avaibleTechnologies } = useAvaibleTechnologies();
  const { dispatch, state } = useCardContext();
  const handleClickShowCard = (card: Card) => {
    dispatch({
      type: "showCard",
      setCard: { ...card, isFlip: false },
    });
  };

  const colorTechnology = avaibleTechnologies[nameTechnology].fill;

  return { handleClickShowCard, colorTechnology, state };
}
