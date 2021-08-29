import { ICard } from "../../Types/Types";
import { auth, db } from "./Settings";
import { collection, addDoc } from "@firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
function doActionWithEmailPass(
  action: "register" | "login",
  email: string,
  password: string
) {
  switch (action) {
    case "register":
      return createUserWithEmailAndPassword(auth, email, password);

    case "login":
      return signInWithEmailAndPassword(auth, email, password);
  }
}

function sendData(nameDatabase: string, card: any) {
  addDoc(collection(db, nameDatabase), card);
}
export const sortCardByTechnology = (
  object: { [index: string]: ICard[] },
  card: ICard
) => {
  if (object[card.technology] === undefined) {
    object[card.technology] = [];
  }
  object[card.technology].push(card);
  return object[card.technology].sort((a, b) => a.id - b.id);
};

export { sendData, doActionWithEmailPass };
