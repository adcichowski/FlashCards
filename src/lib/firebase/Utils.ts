import { Card } from "../../Types";
import { db, auth } from "./index";
export function funcAuthFirebase() {
  function logOut() {
    auth.signOut();
  }
  return { logOut };
}
export function dataFirestore(nameDatabase: string) {
  function sendData(card: Card) {
    db.collection(nameDatabase).add(card);
  }
  async function getData() {
    let personalCards: Card[] = [];
    await db
      .collection(nameDatabase)
      .get()
      .then((data) =>
        data.forEach((cards) => {
          const cardData = cards.data() as Card;
          personalCards.push(cardData);
        })
      );
    return personalCards;
  }
  return { sendData, getData };
}
