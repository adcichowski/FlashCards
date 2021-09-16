import {
  getDoc,
  doc,
  setDoc,
  query,
  where,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import { ICard, ICardsFromFirestore } from "../../Types/Types";
import { auth, db } from "./Settings";
import { collection, addDoc, getDocs, deleteDoc } from "@firebase/firestore";
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
  if (copyDeck[card.technology] === undefined) {
    copyDeck[card.technology] = [];
  }
  copyDeck[card.technology].push(card);
  console.log(copyDeck);
  return copyDeck;
}
export async function rateCardInFirestore(card: ICard) {
  const cardRef = collection(db, "GeneralCards");
  const q = query(
    cardRef,
    where("answer", "==", card.answer),
    where("question", "==", card.question),
    where("technology", "==", card.technology),
    where("randomSvgCard", "==", card.randomSvgCard),
    where("id", "==", card.id)
  );
  const refIdCard = (await getDocs(q))?.docs[0]?.id;

  if (refIdCard) {
    if (card.whoRate.reduce((prev, { rate }) => (prev += rate), 0) < 2) {
      await deleteDoc(doc(db, "GeneralCards", refIdCard));
      return;
    }
    await updateDoc(doc(db, "GeneralCards", refIdCard), {
      whoRate: arrayUnion({
        id: card.whoRate.slice(-1)[0].id,
        rate: card.whoRate.slice(-1)[0].rate,
      }),
    });
    return;
  }
}
export async function sendToFirestore(
  cards: ICardsFromFirestore | ICard,
  toCollectionFirestore: string
) {
  if (toCollectionFirestore !== "GeneralCards") {
    setDoc(doc(db, "PersonalCards", toCollectionFirestore), cards);
    return;
  }

  await addDoc(collection(db, "GeneralCards"), cards);
}

export function validateCardFields(card: ICard) {
  if (card.technology === "none") throw Error("Set technology in card");
  if (card.answer === "") throw Error("Answer field is empty!");
  if (card.question === "") throw Error("Question field is empty!");
  if (card.id === 0) throw Error("Select card deck");
}

export function deleteCardFromFirestore(
  deletedCard: ICard,
  cardsFromState: ICardsFromFirestore
) {
  const copyStateCards = { ...cardsFromState };
  const filteredCards = copyStateCards[deletedCard.technology].filter(
    (cardFromState) => {
      const keysCard = Object.keys(cardFromState) as Array<keyof ICard>;
      return !keysCard.every((key) => {
        return cardFromState[key] === deletedCard[key];
      });
    }
  );
  const deleteEmptyDeck = Object.fromEntries(
    Object.entries(copyStateCards).filter(
      ([technology]) => technology !== deletedCard.technology
    )
  );

  const deckCardAfterDeleted: ICardsFromFirestore =
    filteredCards.length === 0
      ? deleteEmptyDeck
      : {
          [deletedCard.technology]: filteredCards,
        };
  return deckCardAfterDeleted;
}
