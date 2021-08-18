import { Card } from "../../Types/Types";
import { auth, db } from "./Settings";
import { collection, query, getDocs, addDoc } from "@firebase/firestore";
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
const sortCardByTechnology = (
  object: { [index: string]: Card[] },
  card: Card
) => {
  if (object[card.technology] === undefined) {
    object[card.technology] = [];
  }
  object[card.technology].push(card);
  return object[card.technology].sort((a, b) => a.id - b.id);
};
function getDeckCardFromFirestore(nameDatabase: string) {
  const personalCards: { [index: string]: Card[] } = {};
  const generalCards: { [index: string]: Card[] } = {};

  async function getDataFromFirestore() {
    const [queryPersonalCards, queryGeneralCards] = await Promise.all(
      [nameDatabase, "GeneralCards"].map((name) =>
        getDocs(query(collection(db, name)))
      )
    );
    await queryPersonalCards.forEach((cards) => {
      sortCardByTechnology(personalCards, cards.data() as Card);
    });
    await queryGeneralCards.forEach((cards) => {
      sortCardByTechnology(generalCards, cards.data() as Card);
    });
  }
  getDataFromFirestore();
  return [personalCards, generalCards];
}
export { sendData, getDeckCardFromFirestore, doActionWithEmailPass };

class Board {
  personalCards: { [index: string]: Card[] };
  generalCards: { [index: string]: Card[] };
  idUser: string;
  constructor(idUser: string) {
    this.idUser = idUser;
    this.personalCards = {};
    this.generalCards = {};
  }
  async getCardsFromFirestore() {
    const [queryPersonalCards, queryGeneralCards] = await Promise.all(
      [this.idUser, "GeneralCards"].map((name) =>
        getDocs(query(collection(db, name)))
      )
    );
    await queryPersonalCards.forEach((cards) => {
      sortCardByTechnology(this.personalCards, cards.data() as Card);
    });
    await queryGeneralCards.forEach((cards) => {
      sortCardByTechnology(this.generalCards, cards.data() as Card);
    });
  }
}

export const useCreateBoard = (idUser: string) => {
  const createdBoard = new Board(idUser);
  console.log(createdBoard, "tu je board");
};
