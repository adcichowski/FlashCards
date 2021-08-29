import { useEffect, useState } from "react";
import { useAuthContext } from "../../Context/AuthContext";
import { useModalContext } from "../../Context/ModalContext";

import { useCreateBoard } from "../../Lib/firebase/Board";

export function useGetData() {
  const { state, dispatch } = useAuthContext();
  const { dispatch: modalDispatch } = useModalContext();
  const [isUpdated, setIsUpdated] = useState(false);

  const createdBoard = useCreateBoard(state.idUser);
  useEffect(() => {
    try {
      if (isUpdated) return;
      const getData = async () => {
        await createdBoard.getCardsFromFirestore();
        await dispatch({
          type: "setDeckCard",
          setUser: {
            ...state,
            personalCards: createdBoard.personalCards,
            generalCards: createdBoard.generalCards,
          },
        });
      };
      getData();
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
