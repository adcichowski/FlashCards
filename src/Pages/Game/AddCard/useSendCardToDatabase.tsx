import { useHistory } from "react-router";
import { useAuthContext } from "../../../Context/AuthContext";
import { useCardContext } from "../../../Context/CardContext";
import { useModalContext } from "../../../Context/ModalContext";
import { useCreateBoard } from "../../../Lib/firebase/Board";
import { useCreateCard } from "../../../Lib/firebase/Card";

function useSendCardToDatabase(
  nameDatabase: "personalCards" | "generalCards" | ""
) {
  const { dispatch: dispatchModal } = useModalContext();
  const { state: authState } = useAuthContext();
  const { dispatch, state: cardState } = useCardContext();
  const history = useHistory();
  const createdBoard = useCreateBoard(authState.idUser);
  const createCard = useCreateCard();
  function sendCardToDatabase() {
    const { id, isFavorite, technology, question, answer, rating } = cardState;
    const card = {
      id,
      isFavorite,
      technology,
      question,
      answer,
      rating,
      whoRate: [{ id: authState.idUser, rate: rating }],
    };
    try {
      const classCard = createCard(card);
      if (nameDatabase === "") throw Error("Select deck for Card");
      classCard.validateFields();
      createdBoard.personalCards = authState.personalCards;
      createdBoard.generalCards = authState.generalCards;
      createdBoard.addCardToDeck(card, nameDatabase);
      classCard.sendCardToFirestore(
        createdBoard[nameDatabase],
        nameDatabase === "personalCards" ? authState.idUser : "GeneralCards"
      );
      dispatch({ type: "resetCard" });
      dispatchModal({
        type: "successModal",
        setModal: { message: `Card Saved` },
      });
      history.push("/game");
    } catch ({ message }) {
      dispatchModal({ type: "errorModal", setModal: { message } });
    }
  }
  return { sendCardToDatabase };
}
export { useSendCardToDatabase };
