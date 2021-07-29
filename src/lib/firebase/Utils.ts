import { Card } from "../../Types/Types";
import { db } from "./index";

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
          generalCards.push(cards.data() as Card);
        })
      );
  }
  getDataFromFirestore();
  return [personalCards, generalCards];
}
export { sendData, getData };
