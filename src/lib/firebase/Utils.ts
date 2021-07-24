import { Card } from "../../Types";
import { db, auth } from "./index";
export function funcAuthFirebase() {
  function typeAuth(
    type: "login" | "register",
    email: string,
    password: string
  ) {
    switch (type) {
      case "login":
        auth.signInWithEmailAndPassword(email, password);
        break;
      case "register":
        auth.createUserWithEmailAndPassword(email, password);
        break;
      default:
        throw Error("Didnt write good type of auth action");
    }
  }
  return { typeAuth };
}
function sendData(nameDatabase: string, card: Card) {
  db.collection(nameDatabase).add(card);
}
function getData(nameDatabase: string) {
  let personalCards: Card[] = [];
  let generalCards: Card[] = [];
  async function getDataFromFirestore() {
    await db
      .collection(nameDatabase)
      .get()
      .then((data) =>
        data.forEach((cards) => {
          personalCards.push(cards.data() as Card);
        })
      );
    await db
      .collection("GeneralCards")
      .get()
      .then((data) =>
        data.forEach((cards) => {
          console.log(cards.data());
          generalCards.push(cards.data() as Card);
        })
      );
  }
  getDataFromFirestore();
  return [personalCards, generalCards];
}
export { sendData, getData };
