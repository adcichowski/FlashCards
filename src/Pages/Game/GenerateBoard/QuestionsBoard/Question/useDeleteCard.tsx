import { useCallback } from "react";
import { useHistory } from "react-router";
import { useAuthContext } from "../../../../../Context/AuthContext";
import { useModalContext } from "../../../../../Context/ModalContext";
import {
  deleteCardFromFirestore,
  sendFunctionsToFirebase,
} from "../../../../../lib/firebase/Utils";
import {
  ICard,
  ICardsFromFirestore,
  ITypeBoard,
} from "../../../../../Types/Types";

function useDeleteCard() {
  const { sendDeck, sendCard } = sendFunctionsToFirebase();
  const { dispatch: dispatchModal } = useModalContext();
  const history = useHistory();
  const { state, dispatch } = useAuthContext();
  const deleteCard = useCallback(
    (card: ICard, typeBoard: ITypeBoard) => {
      const deckAfterDeletedCard = deleteCardFromFirestore(
        card,
        state[typeBoard]
      );
      console.log(deckAfterDeletedCard, "to");
      if (Object.values(deckAfterDeletedCard).length === 0) {
        dispatchModal({
          type: "successModal",
          setModal: {
            message: `Technology deck was deleted`,
          },
        });
        history.push("/game");
      }
      dispatch({
        type: "setDeckCard",
        setUser: { ...state, [typeBoard]: { ...(deckAfterDeletedCard || {}) } },
      });

      if (typeBoard === "generalCards") sendCard(card);
      if (typeBoard === "personalCards")
        sendDeck(deckAfterDeletedCard as ICardsFromFirestore, state.idUser);
    },
    [dispatch, dispatchModal, history, state, sendCard, sendDeck]
  );

  return { deleteCard };
}
export { useDeleteCard };