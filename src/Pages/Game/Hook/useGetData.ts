import { useEffect } from "react";
import { useGameContext } from "../../../Context/GameContext";
import { useMainContext } from "../../../Context/MainContext";
import { dataFirestore } from "../../../lib/firebase/Utils";
import { Card } from "../../../Types";

export function useGetData(nameCollection: string) {
  const { getData } = dataFirestore(nameCollection);
  const { state: gameState, dispatch: gameDispatch } = useGameContext();
  const { dispatch } = useMainContext();
  useEffect(() => {
    try {
      getData().then((cards: Card[]) => {
        gameDispatch({
          type: "setData",
          setData: {
            personalCards: cards,
          },
        });
      });
    } catch (e) {
      dispatch({
        type: "openModal",
        setModal: {
          type: "error",
          message: e.message,
        },
      });
    }
  }, [gameState.personalCards, dispatch, gameDispatch, getData]);
}
