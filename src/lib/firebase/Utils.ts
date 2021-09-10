import { getDoc, doc, setDoc } from "firebase/firestore";
import { ICard, ICardsFromFirestore } from "../../Types/Types";
import { auth, db } from "./Settings";
import { collection, addDoc, getDocs } from "@firebase/firestore";
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

export async function getCards(idUser: string) {
  const decks = {
    personalCards: {
      data: {} as ICardsFromFirestore,
      query: await getDoc(doc(db, `PersonalCards/${idUser}`)),
    },
    generalCards: {
      data: {} as ICardsFromFirestore,
      query: await getDocs(collection(db, "GeneralCards")),
    },
  };
  decks.generalCards.query.forEach((card) => {
    const cardData = card.data() as ICard;
    if (!decks.generalCards.data[cardData.technology]) {
      decks.generalCards.data[cardData.technology] = [];
    }
    decks.generalCards.data[cardData.technology].push(cardData);
  });
  decks.personalCards.data = (await decks.personalCards.query.data()) || {};

  return [decks.personalCards.data, decks.generalCards.data];
}
export function addCardToDeck(card: ICard, deck: ICardsFromFirestore) {
  const copyDeck = { ...deck };
  if (copyDeck[card.technology] === undefined) copyDeck[card.technology] = [];
  const existedCard = copyDeck[card.technology].findIndex(
    (item) => item === card
  );
  if (existedCard) {
    copyDeck[card.technology][existedCard] = card;
  }
  copyDeck[card.technology].push(card);
  return copyDeck;
}

export function sendToFirestore(
  cards: ICardsFromFirestore | ICard,
  toCollectionFirestore: string
) {
  if (toCollectionFirestore !== "GeneralCards") {
    setDoc(doc(db, "PersonalCards", toCollectionFirestore), cards);
    return;
  }
  addDoc(collection(db, "GeneralCards"), cards);
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
  const filteredCards = cards[card.technology].filter((item) => {
    const keysCard = Object.keys(card) as Array<keyof ICard>;
    const keysItem = Object.keys(item) as Array<keyof ICard>;

    if (keysCard.length !== keysItem.length) {
      return false;
    }

    for (const key in keysCard) {
      console.log(keysCard[key]);
      if (keysCard[key] !== keysItem[key]) {
        return false;
      }
    }

    return true;
  });
  const deleteEmptyDeck = Object.fromEntries(
    Object.entries(cards).filter(
      ([technology]) => technology !== card.technology
    )
  );

  const deckCardAfterDeleted: ICardsFromFirestore =
    filteredCards.length === 0
      ? deleteEmptyDeck
      : {
          [card.technology]: filteredCards,
        };
  return deckCardAfterDeleted;
}
