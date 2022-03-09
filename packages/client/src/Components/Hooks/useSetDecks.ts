import { useEffect, useState } from "react";
import { useAuthContext } from "../../Context/AuthContext";
import { useModalContext } from "../../Context/ModalContext";
import { getCards } from "../../lib/firebase/Utils";
export function useSetDecks() {
  const { state, dispatch } = useAuthContext();
  const { dispatch: modalDispatch } = useModalContext();
  const [isUpdated, setIsUpdated] = useState(false);
  useEffect(() => {
    try {
      if (isUpdated) return;
      const getData = async () => {
        const [personalCards, generalCards] = await getCards(state.idUser);
        dispatch({
          type: "setDeckCard",
          setUser: {
            ...state,
            personalCards,
            generalCards,
          },
        });
      };
      getData();
    } catch (e) {
      if (e instanceof Error) {
        modalDispatch({
          type: "errorModal",
          setModal: { message: e.message },
        });
      }
    } finally {
      setIsUpdated(true);
    }
  }, [dispatch, state, modalDispatch, isUpdated]);
}
