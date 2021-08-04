import { useCallback } from "react";
import { useAvaibleTechnologies } from "../../../../Components/Pages/Game/useAvaibleTechnologies";
import { useCardContext } from "../../../../Context/CardContext";
import { ReactComponent as NoneTechIcon } from "../../../../Assets/Icons/cancel.svg";
function useCardByContext() {
  const { state, dispatch } = useCardContext();
  const { avaibleTechnologies } = useAvaibleTechnologies();
  // const handleClickNextOrPrevCard = useCallback(
  //   (number) => () => {
  //     const getIndexOpenedCard = state.findIndex(
  //       (item) => item.question === state.question
  //     );
  //     dispatch({
  //       type: "getNextOrPrevCard",
  //       setCard: {
  //         ...state[getIndexOpenedCard + number],

  //         isFlip: false,
  //       },
  //     });
  //   },
  //   [dispatch, saveAllDataCards, state.question]
  // );
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
    handleClickFlipCard,
    getIconAndColor,
    state,
  };
}
export { useCardByContext };
