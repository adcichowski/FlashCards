import { useEffect } from "react";
import { useAuthContext } from "../../Context/AuthContext";
import { useGameContext } from "../../Context/GameContext";
import { useMainContext } from "../../Context/MainContext";
import { getData } from "../../lib/firebase/Utils";

export function useGetData() {
  const {
    state: { idUser },
  } = useAuthContext();
  const { dispatch: gameDispatch } = useGameContext();
  const { dispatch } = useMainContext();
  useEffect(() => {
    if (!idUser) return;
    const [personalCards, generalCards] = getData(idUser);
    gameDispatch({
      type: "setData",
      setData: {
        personalCards,
        generalCards,
      },
    });
    return;
  }, [dispatch, gameDispatch, idUser]);
}
