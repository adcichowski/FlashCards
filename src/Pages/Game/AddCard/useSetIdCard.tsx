import { useEffect, useState } from "react";
import { useAuthContext } from "../../../Context/AuthContext";
import { useCardContext } from "../../../Context/CardContext";

function useSetIdCard() {
  const [nameDatabase, setNameDatabase] = useState<
    "personalCards" | "generalCards" | ""
  >("");

  const { dispatch, state: stateCard } = useCardContext();
  const { state } = useAuthContext();
  useEffect(() => {
    if (!stateCard.isShow) dispatch({ type: "showEmptyCard" });
    if (stateCard.technology === "none" || !nameDatabase) return;
    const getCardsByTechnology = state[nameDatabase][stateCard.technology];
    const newValueId = !!getCardsByTechnology
      ? getCardsByTechnology.slice(-1)[0].id + 1
      : 1;
    if (stateCard.id !== newValueId) {
      dispatch({
        type: "editCard",
        setCard: { ...stateCard, id: newValueId },
      });
    }
  }, [dispatch, stateCard, state, nameDatabase]);
  return { setNameDatabase, nameDatabase };
}
export { useSetIdCard };
