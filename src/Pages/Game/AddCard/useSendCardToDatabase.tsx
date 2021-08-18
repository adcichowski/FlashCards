import { useHistory } from "react-router";
import { useAuthContext } from "../../../Context/AuthContext";
import { useCardContext } from "../../../Context/CardContext";
import { useModalContext } from "../../../Context/ModalContext";
import { sendData } from "../../../lib/firebase/Utils";

function useSendCardToDatabase(nameDatabase: string) {
  const { dispatch: dispatchModal } = useModalContext();
  const { state: authState } = useAuthContext();
  const { state: cardState } = useCardContext();
  const history = useHistory();
  const { dispatch } = useCardContext();
  function sendCardToDatabase() {
    console.log(nameDatabase);
    const { id, isFavorite, technology, question, answer, rating } = cardState;
    const card = {
      id,
      isFavorite,
      technology,
      question,
      answer,
      rating,
      whoRate: [{ id: authState.idUser, rating }],
    };
    const personalDatabase = authState.idUser;
    if (nameDatabase === "personalCards") sendData(personalDatabase, card);
    if (nameDatabase === "generalCards") sendData("GeneralCards", card);
    dispatch({ type: "resetDataCard" });
    dispatchModal({
      type: "successModal",
      setModal: { message: `Card Saved` },
    });
    history.push("/game");
  }
  return { sendCardToDatabase };
}
export { useSendCardToDatabase };
