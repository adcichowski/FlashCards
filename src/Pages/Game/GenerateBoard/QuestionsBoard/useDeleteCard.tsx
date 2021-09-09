import { useCallback } from "react";
import { useHistory } from "react-router";
import { useAuthContext } from "../../../../Context/AuthContext";
import { useModalContext } from "../../../../Context/ModalContext";
import {
  deleteCardFromFirestore,
  sendToFirestore,
} from "../../../../lib/firebase/Utils";
import { ICard, ITypeBoard } from "../../../../Types/Types";
import { capitalize } from "../../../../Utils/Utils";

function useDeleteCard() {
  const { dispatch: dispatchModal } = useModalContext();
  const history = useHistory();
  const { state, dispatch } = useAuthContext();
  const deleteCard = useCallback(
    (card: ICard, typeBoard: ITypeBoard) => {
      const deckAfterDeletedCard = deleteCardFromFirestore(
        card,
        state[typeBoard]
      );
      if (!Object.values(deckAfterDeletedCard).length) {
        dispatchModal({
          type: "successModal",
          setModal: {
            message: `Technology ${capitalize(card.technology)} was deleted`,
          },
        });
        history.push("/game");
      }
      dispatch({
        type: "setDeckCard",
        setUser: { ...state, [typeBoard]: { ...(deckAfterDeletedCard || {}) } },
      });
      sendToFirestore(
        { ...deckAfterDeletedCard },
        typeBoard === "personalCards" ? state.idUser : "GeneralCards"
      );
    },
    [dispatch, dispatchModal, history, state]
  );

  return { deleteCard };
}
export { useDeleteCard };
