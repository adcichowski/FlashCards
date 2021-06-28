import { useGameContext } from "../../Context/GameContext";
import { db, auth } from "./index";
export function useFuncAuthFirebase() {
  const { setUser } = useGameContext();
  function logOut() {
    auth.signOut();
    setUser({
      isLogin: false,
      idUser: "",
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
