import { useEffect, useState } from "react";
import { useAuthContext } from "../../../Context/AuthContext";
import { useCardContext } from "../../../Context/CardContext";
import { getRandomMinMax } from "../../../Utils/Utils";

function useSetIdCard() {
  const [nameDatabase, setNameDatabase] = useState<
    "personalCards" | "generalCards" | ""
  >("");

  const { dispatch, state: stateCard } = useCardContext();
  const { state } = useAuthContext();
  useEffect(() => {
    if (stateCard.technology === "none" || !nameDatabase) return;
    const getCardsByTechnology =
      state["personalCards"][stateCard.technology] || [];
    const newValueId =
      getCardsByTechnology.length !== 0
        ? getCardsByTechnology.slice(-1)[0].id + 1
        : 1;
    if (nameDatabase === "personalCards") {
      if (stateCard.id !== newValueId) {
        dispatch({
          type: "editCard",
          setCard: { ...stateCard, id: newValueId },
        });
      }
    }
    if (
      nameDatabase === "generalCards" &&
      (stateCard.id === newValueId || stateCard.id === 0)
    ) {
      dispatch({
        type: "editCard",
        setCard: { ...stateCard, id: getRandomMinMax(1, 100) },
      });
      return;
    }
  }, [dispatch, stateCard, state, nameDatabase]);
  return { setNameDatabase, nameDatabase };
}
export { useSetIdCard };
