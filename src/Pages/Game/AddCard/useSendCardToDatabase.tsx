import { useHistory } from "react-router";
import { useAuthContext } from "../../../Context/AuthContext";
import { useCardContext } from "../../../Context/CardContext";
import { useModalContext } from "../../../Context/ModalContext";
import { useCreateBoard } from "../../../lib/firebase/Utils";
import { useCreateCard } from "../../../Utils/Utils";

function useSendCardToDatabase(nameDatabase: string) {
  const { dispatch: dispatchModal } = useModalContext();
  const { state: authState } = useAuthContext();
  const { dispatch, state: cardState } = useCardContext();
  const history = useHistory();
  const createCard = useCreateCard();
  const createdBoard = useCreateBoard(authState.idUser);
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
    const classCard = createCard(card);
    try {
      console.log(card, classCard);
      classCard.validateFields();
      createdBoard.sendCardToFirestore(
        card,
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
