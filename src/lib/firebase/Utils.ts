import { db, auth } from "./index";
export function funcAuthFirebase() {
  function logOut() {
    auth.signOut();
  }
  return { logOut };
}
export function dataFirestore(nameDatabase: string) {
  function sendData(
    Technology: string,
    Question: string,
    Answer: string,
    isFavorite: boolean
  ) {
    db.collection(nameDatabase).add({
      Technology,
      Question,
      Answer,
      isFavorite,
    });
  }
  async function getData() {
    let personalCards: object[] = [];
    await db
      .collection(nameDatabase)
      .get()
      .then((data) =>
        data.forEach((cards) => personalCards.push(cards.data()))
      );
    return personalCards;
  }
  return { sendData, getData };
}
