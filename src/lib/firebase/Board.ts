import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "./Settings";
import { ICard } from "../../Types/Types";
export interface ICardsFromFirestore {
  [index: string]: ICard[];
}
class Board {
  personalCards: ICardsFromFirestore;
  generalCards: ICardsFromFirestore;
  favoriteCards: ICardsFromFirestore;
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
        getDoc(doc(db, "Board", name))
      )
    );
    this.personalCards = (await queryPersonalCards).data() || {};
    this.generalCards = (await queryGeneralCards).data() || {};
  }

  validateDeck(deck: "personalCards" | "generalCards" | "") {
    if (deck === "") throw Error("Deck is not choosen");
  }

  addCardToDeck(card: ICard, deck: "personalCards" | "generalCards" | "") {
    if (deck === "") throw Error("Deck is not choosen");
    if (this[deck][card.technology] === undefined) {
      this[deck][card.technology] = [];
    }
    this[deck][card.technology].push(card);
  }

  sendDeckToFirestore(card: { [index: string]: ICard[] }, deck: string) {
    if (deck === "") throw Error("Pick deck to save card!");
    setDoc(doc(db, "Board", deck), card);
  }
}

export const useCreateBoard = (idUser: string) => {
  const createdBoard = new Board(idUser);
  return createdBoard;
};
