import { useEffect, useState } from "react";
import { useAuthContext } from "../../Context/AuthContext";
import { useModalContext } from "../../Context/ModalContext";
import { getCards } from "../../lib/firebase/Utils";
import { getErrorMessage } from "../../Utils/Utils";
export function useGetData() {
  const { state, dispatch } = useAuthContext();
  const { dispatch: modalDispatch } = useModalContext();
  const [isUpdated, setIsUpdated] = useState(false);
  useEffect(() => {
    try {
      if (isUpdated) return;
      const getData = async () => {
        const { personalCards, generalCards } = await getCards(state.idUser);
        await dispatch({
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
      modalDispatch({
        type: "errorModal",
        setModal: { message: getErrorMessage(e) },
      });
    } finally {
      setIsUpdated(true);
    }
  }, [dispatch, state, modalDispatch, isUpdated]);
}
