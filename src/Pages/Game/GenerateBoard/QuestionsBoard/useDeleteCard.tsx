import { useHistory } from "react-router";
import { useAuthContext } from "../../../../Context/AuthContext";
import { useModalContext } from "../../../../Context/ModalContext";
import {
  deleteCardFromFirestore,
  sendDeckToFirestore,
} from "../../../../lib/firebase/Utils";
import { ICard } from "../../../../Types/Types";
import { capitalize } from "../../../../Utils/Utils";

function useDeleteCard() {
  const { dispatch: dispatchModal } = useModalContext();
  const history = useHistory();
  const { state, dispatch } = useAuthContext();
  const deleteCard = (card: ICard) => {
    const deckAfterDeletedCard = deleteCardFromFirestore(
      card,
      state.personalCards
    );
    if (deckAfterDeletedCard) {
      dispatchModal({
        type: "successModal",
        setModal: {
          message: `Tehnology ${capitalize(card.technology)} was deleted`,
        },
      });
      history.push("/game");
    }
    dispatch({
      type: "setDeckCard",
      setUser: { ...state, personalCards: { ...deckAfterDeletedCard } },
    });
    sendDeckToFirestore({ ...deckAfterDeletedCard }, state.idUser);
  };
  return { deleteCard };
}
export { useDeleteCard };
