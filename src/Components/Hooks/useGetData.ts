import { useEffect, useState } from "react";
import { useAuthContext } from "../../Context/AuthContext";
import { useModalContext } from "../../Context/ModalContext";

import { useCreateBoard } from "../../lib/firebase/Utils";

export function useGetData() {
  const { state, dispatch } = useAuthContext();
  const { dispatch: modalDispatch } = useModalContext();
  const [isUpdated, setIsUpdated] = useState(false);

  const createdBoard = useCreateBoard(state.idUser);
  useEffect(() => {
    try {
      if (state.isLogin && !state.idUser) throw Error("Not logged in");
      if (isUpdated) return;
      createdBoard.getCardsFromFirestore();
      const [personalCards, generalCards] = [
        createdBoard.personalCards,
        createdBoard.generalCards,
      ];

      dispatch({
        type: "setDeckCard",
        setUser: {
          ...state,
          personalCards,
          generalCards,
        },
      });
    } catch ({ message }) {
      modalDispatch({
        type: "errorModal",
        setModal: { message },
      });
    } finally {
      setIsUpdated(true);
    }
  }, [dispatch, state, modalDispatch, isUpdated, createdBoard]);
}
