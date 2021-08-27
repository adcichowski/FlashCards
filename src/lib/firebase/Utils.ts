import { ICard } from "../../Types/Types";
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

class Board {
  personalCards: { [index: string]: ICard[] };
  generalCards: { [index: string]: ICard[] };
  favoriteCards: { [index: string]: ICard[] };
  idUser: string;
  constructor(idUser: string) {
    this.idUser = idUser;
    this.personalCards = {};
    this.generalCards = {};
    this.favoriteCards = {};
  }

  async getCardsFromFirestore() {
    const [queryPersonalCards, queryGeneralCards] = await Promise.all(
      [this.idUser, "GeneralCards"].map((name) =>
        getDocs(query(collection(db, name)))
      )
    );
    await queryPersonalCards.forEach((cards) => {
      sortCardByTechnology(this.personalCards, cards.data() as ICard);
    });
    await queryGeneralCards.forEach((cards) => {
      sortCardByTechnology(this.generalCards, cards.data() as ICard);
    });
  }

  sendCardToFirestore(card: ICard, nameDatabase: string) {
    if (nameDatabase === "") throw Error("Pick deck to save card!");
    addDoc(collection(db, nameDatabase), card);
  }
}

export const useCreateBoard = (idUser: string) => {
  const createdBoard = new Board(idUser);
  return createdBoard;
};
