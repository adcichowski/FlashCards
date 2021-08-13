import { useEffect, useState } from "react";
import { useCardContext } from "../../../Context/CardContext";
import { useGameContext } from "../../../Context/GameContext";

function useSetIdCard() {
  const [nameDatabase, setNameDatabase] = useState<
    "personalCards" | "generalCards" | ""
  >("");

  const { dispatch, state: stateCard } = useCardContext();
  const { state } = useGameContext();
  useEffect(() => {
    if (!stateCard.isShow) dispatch({ type: "showEmptyCard" });
    if (stateCard.technology === "none" || !nameDatabase) return;
    const getCardsFromDataByTechnology =
      state[nameDatabase][stateCard.technology];
    const newValueId = !!getCardsFromDataByTechnology
      ? getCardsFromDataByTechnology.slice(-1)[0].id + 1
      : 1;
    if (stateCard.id !== newValueId) {
      dispatch({
        type: "editingCard",
        setCard: { ...stateCard, id: newValueId },
      });
    }
  }, [dispatch, stateCard, state, nameDatabase]);
  return { setNameDatabase, nameDatabase };
}
export { useSetIdCard };
