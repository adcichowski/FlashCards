import { useGameContext } from "../../Context/GameContext";
import { db, auth } from "./index";
export function useFuncAuthFirebase() {
  const { dispatch } = useGameContext();
  function logOut() {
    auth.signOut();
    dispatch({
      type: "logOut",
    });
  }
  return { logOut };
}
export function useSendData() {
  function sendData(
    Database: string,
    Technology: string,
    Question: string,
    Answer: string
  ) {
    db.collection(Database).add({
      Technology,
      Question,
      Answer,
    });
  }
  function getData() {}
  return { sendData, getData };
}
