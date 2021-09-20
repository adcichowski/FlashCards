import { useHistory } from "react-router";
import { useAuthContext } from "../../../Context/AuthContext";
import { useCardContext } from "../../../Context/CardContext";
import { useModalContext } from "../../../Context/ModalContext";
import {
  addCardToDeck,
  sendFunctionsToFirebase,
  validateCardFields,
} from "../../../lib/firebase/Utils";
function useSendCardToDatabase(deck: "personalCards" | "generalCards" | "") {
  const { dispatch: dispatchModal } = useModalContext();
  const { dispatch: authDispatch, state: authState } = useAuthContext();
  const { dispatch, state: cardState } = useCardContext();
  const history = useHistory();
  function sendCardToDatabase() {
    const { sendDeck, sendCard } = sendFunctionsToFirebase();
    const { id, isFavorite, technology, question, answer, randomSvgCard } =
      cardState;
    const card = {
      randomSvgCard,
      id,
      isFavorite,
      technology,
      question,
      answer,
      whoRate: [{ id: authState.idUser, rate: 5 }],
    };
    try {
      if (deck === "") throw Error("Select deck for Card");
      validateCardFields(card);
      const copyStateDeck = addCardToDeck(card, authState[deck]);
      authDispatch({
        type: "setDeckCard",
        setUser: {
          ...authState,
          [deck]: copyStateDeck,
        },
      });
      if (deck === "personalCards") sendDeck(copyStateDeck, authState.idUser);
      if (deck === "generalCards") sendCard(card);
      dispatch({ type: "resetCard" });
      dispatchModal({
        type: "successModal",
        setModal: { message: `Card Saved` },
      });
      history.push("/game");
    } catch (e) {
      if (e instanceof Error) {
        dispatchModal({
          type: "errorModal",
          setModal: { message: e.message },
        });
      }
    }
  }
  return { sendCardToDatabase };
}
export { useSendCardToDatabase };
