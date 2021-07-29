import { useCallback } from "react";
import { useAvaibleTechnologies } from "../../../../Components/Pages/Game/useAvaibleTechnologies";
import { useCardContext } from "../../../../Context/CardContext";
import { Card } from "../../../../Types/Types";
import { ReactComponent as NoneTechIcon } from "../../../../Assets/Icons/cancel.svg";
function useCardByContext(saveAllDataCards: Card[]) {
  const { state, dispatch } = useCardContext();
  const { avaibleTechnologies } = useAvaibleTechnologies();
  const getIndexOpenedCard = saveAllDataCards.findIndex(
    (item) => item.question === state.question
  );
  const handleClickNextOrPrevCard = useCallback(
    (number) => () => {
      dispatch({
        type: "getNextOrPrevCard",
        setCard: {
          ...saveAllDataCards[getIndexOpenedCard + number],

          isFlip: false,
        },
      });
    },
    [dispatch, saveAllDataCards, getIndexOpenedCard]
  );
  const handleClickFlipCard = useCallback(() => {
    dispatch({ type: "flipCard" });
  }, [dispatch]);
  const getIconAndColor = () => {
    const CardIcon =
      state.technology === "none"
        ? NoneTechIcon
        : avaibleTechnologies[state.technology].render;
    const colorIcon =
      state.technology === "none"
        ? "#505050"
        : avaibleTechnologies[state.technology].fill;
    return { CardIcon, colorIcon };
  };
  return {
    handleClickNextOrPrevCard,
    handleClickFlipCard,
    getIconAndColor,
    state,
  };
}
export { useCardByContext };
