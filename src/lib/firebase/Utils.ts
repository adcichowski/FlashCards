import { Card } from "../../Types/Types";
import { db } from "./index";

function sendData(nameDatabase: string, card: Card) {
  db.collection(nameDatabase).add(card);
}
function getData(nameDatabase: string) {
  const personalCards: { [index: string]: Card[] } = {};
  const generalCards: { [index: string]: Card[] } = {};

  async function getDataFromFirestore() {
    const sortCardByTechnology = (
      object: { [index: string]: Card[] },
      card: Card
    ) => {
      if (object[card.technology] === undefined) {
        object[card.technology] = [];
        object[card.technology].push(card);
      }
    };
    await db
      .collection(nameDatabase)
      .get()
      .then((data) =>
        data.forEach((cards) => {
          sortCardByTechnology(personalCards, cards.data() as Card);
        })
      );
    await db
      .collection("GeneralCards")
      .get()
      .then((data) =>
        data.forEach((cards) => {
          sortCardByTechnology(generalCards, cards.data() as Card);
        })
      );
  }
  getDataFromFirestore();
  return [personalCards, generalCards];
}
export { sendData, getData };
