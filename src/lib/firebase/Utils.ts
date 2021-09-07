import { getDoc, doc, setDoc } from "firebase/firestore";
import { ICard, ICardsFromFirestore } from "../../Types/Types";
import { auth, db } from "./Settings";
import { collection, addDoc } from "@firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
export function doActionWithEmailPass(
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

export function sendData(nameDatabase: string, card: any) {
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

export async function getCards(idUser: string) {
  const [queryPersonalCards, queryGeneralCards] = await Promise.all(
    [idUser, "GeneralCards"].map((name) => getDoc(doc(db, "Board", name)))
  );
  const personalCards = (await queryPersonalCards).data() || {};
  const generalCards = (await queryGeneralCards).data() || {};
  return { personalCards, generalCards };
}
export function addCardToDeck(card: ICard, deck: ICardsFromFirestore) {
  if (deck[card.technology] === undefined) {
    deck[card.technology] = [];
  }
  deck[card.technology].push(card);
}

export function sendDeckToFirestore(
  cards: ICardsFromFirestore,
  toCollectionFirestore: string
) {
  setDoc(doc(db, "Board", toCollectionFirestore), cards);
}

export function validateCardFields(card: ICard) {
  if (card.technology === "none") throw Error("Set technology in card");
  if (card.answer === "") throw Error("Answer field is empty!");
  if (card.question === "") throw Error("Question field is empty!");
  if (card.id === 0) throw Error("Select card deck");
}

export function deleteCardFromFirestore(
  card: ICard,
  cards: ICardsFromFirestore
) {
  const filteredCards = cards[card.technology].filter(
    (item) => item.id !== card.id && item.answer !== card.answer
  );
  const deckCardAfterDeleted: ICardsFromFirestore =
    filteredCards.length === 0
      ? {}
      : {
          ...cards,
          [card.technology]: filteredCards,
        };
  return deckCardAfterDeleted;
}
