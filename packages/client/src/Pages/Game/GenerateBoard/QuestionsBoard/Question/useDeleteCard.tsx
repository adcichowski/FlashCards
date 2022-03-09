import { useCallback } from "react";
import { useHistory } from "react-router";
import { useAuthContext } from "../../../../../Context/AuthContext";
import { useModalContext } from "../../../../../Context/ModalContext";
import { deleteCardFromFirestore, sendFunctionsToFirebase } from "../../../../../lib/firebase/Utils";
import { ICard, ICardsFromFirestore, ITypeBoard } from "../../../../../Types/Types";

function useDeleteCard() {
  const { sendDeck, sendCard } = sendFunctionsToFirebase();
  const { dispatch: dispatchModal } = useModalContext();
  const history = useHistory();
  const { state, dispatch } = useAuthContext();
  const deleteCard = useCallback(
    (card: ICard, typeBoard: ITypeBoard) => {
      if (typeBoard === "favoriteCards") {
        const deckAfterDeletedCard = state.personalCards.favorites.filter((cardFromState) => {
          const keysCard = Object.keys(cardFromState) as ReadonlyArray<keyof ICard>;
          return !keysCard.every((key) => cardFromState[key] === card[key]);
        });
        const deckWithoutCard = {
          ...state.personalCards,
          favorites: deckAfterDeletedCard,
        };

        dispatch({
          type: "setDeckCard",
          setUser: { ...state, personalCards: deckWithoutCard },
        });
        sendDeck(deckWithoutCard, state.idUser);
        if (deckWithoutCard.favorites.length === 0) {
          dispatchModal({
            type: "successModal",
            setModal: {
              message: `Favorite deck was deleted`,
            },
          });
          history.push("/game");
        }
        return;
      }

      const deckAfterDeletedCard = deleteCardFromFirestore(card, state["personalCards"]);
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
      if (typeBoard === "personalCards") {
        sendDeck(deckAfterDeletedCard as ICardsFromFirestore, state.idUser);
      }
    },
    [dispatch, dispatchModal, history, state, sendCard, sendDeck],
  );

  return { deleteCard };
}

export { useDeleteCard };
