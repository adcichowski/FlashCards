import { useHistory } from "react-router";
import { useAuthContext } from "../../../Context/AuthContext";
import { useCardContext } from "../../../Context/CardContext";
import { useMainContext } from "../../../Context/MainContext";
import { sendData } from "../../../lib/firebase/Utils";
import { Card } from "../../../Types/Types";

export default function useSendCardToDatabase(nameDatabase: string) {
  const { dispatch: dispatchModal } = useMainContext();
  const { state: authState } = useAuthContext();
  const history = useHistory();
  const { dispatch } = useCardContext();
  const sendCardToDatabase = (card: Card) => {
    const personalDatabase = authState.idUser;
    if (nameDatabase === "personalCards") sendData(personalDatabase, card);
    if (nameDatabase === "generalCards") sendData("GeneralCards", card);
    dispatch({ type: "resetDataCard" });
    dispatchModal({
      type: "successModal",
      setModal: { message: `Card Saved` },
    });
    history.push("/game");
  };
  return { sendCardToDatabase };
}
