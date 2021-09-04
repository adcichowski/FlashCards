import { useHistory } from "react-router";
import { useAuthContext } from "../../../Context/AuthContext";
import { useCardContext } from "../../../Context/CardContext";
import { useModalContext } from "../../../Context/ModalContext";
import {
  addCardToDeck,
  sendDeckToFirestore,
  validateCardFields,
} from "../../../lib/firebase/Utils";
import { getErrorMessage } from "../../../Utils/Utils";
function useSendCardToDatabase(
  nameDatabase: "personalCards" | "generalCards" | ""
) {
  const { dispatch: dispatchModal } = useModalContext();
  const { dispatch: authDispatch, state: authState } = useAuthContext();
  const { dispatch, state: cardState } = useCardContext();
  const history = useHistory();
  function sendCardToDatabase() {
    const {
      id,
      isFavorite,
      technology,
      question,
      answer,
      rating,
      randomSvgCard,
    } = cardState;
    const card = {
      randomSvgCard,
      id,
      isFavorite,
      technology,
      question,
      answer,
      rating,
      whoRate: [{ id: authState.idUser, rate: rating }],
    };
    try {
      if (nameDatabase === "") throw Error("Select deck for Card");
      validateCardFields(card);
      const copyStateDeck = authState[nameDatabase];
      addCardToDeck(card, copyStateDeck);
      authDispatch({
        type: "setDeckCard",
        setUser: {
          ...authState,
          [nameDatabase]: copyStateDeck,
        },
      });
      sendDeckToFirestore(
        authState[nameDatabase],
        nameDatabase === "personalCards" ? authState.idUser : "GeneralCards"
      );
      dispatch({ type: "resetCard" });
      dispatchModal({
        type: "successModal",
        setModal: { message: `Card Saved` },
      });
      history.push("/game");
    } catch (e) {
      dispatchModal({
        type: "errorModal",
        setModal: { message: getErrorMessage(e) },
      });
    }
  }
  return { sendCardToDatabase };
}
export { useSendCardToDatabase };
