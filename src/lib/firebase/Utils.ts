import { getDoc, doc, setDoc, query, where, arrayUnion, updateDoc } from "firebase/firestore";
import { ICard, ICardsFromFirestore, Mutable } from "../../Types/Types";
import { auth, db } from "./Settings";
import { collection, addDoc, getDocs, deleteDoc } from "@firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export function doActionWithEmailPass(action: "register" | "login", email: string, password: string) {
  return action === "register"
    ? createUserWithEmailAndPassword(auth, email, password)
    : signInWithEmailAndPassword(auth, email, password);
}

export async function getCards(idUser: string) {
  const decks = {
    personalCards: {
      data: {} as Mutable<ICardsFromFirestore>,
      query: await getDoc(doc(db, `PersonalCards`, idUser)),
    },
    generalCards: {
      data: {} as Mutable<ICardsFromFirestore>,
      query: await getDocs(collection(db, "GeneralCards")),
    },
  };
  decks.generalCards.query.forEach((card) => {
    const cardData = card.data() as Mutable<ICard>;
    !decks.generalCards.data[cardData.technology]
      ? (decks.generalCards.data[cardData.technology] = [])
      : // eslint-disable-next-line
        (decks.generalCards.data[cardData.technology] = [cardData, ...decks.generalCards.data[cardData.technology]]);
  });
  const card = decks.personalCards.query.data() as ICardsFromFirestore;
  decks.personalCards.data = card;

  return [decks.personalCards.data, decks.generalCards.data];
}
export function addCardToDeck(card: ICard, deck: ICardsFromFirestore) {
  const copyDeck = { ...deck };

  copyDeck[card.technology] ??= [];
  return [...copyDeck[card.technology], card];
}
export async function rateCardInFirestore(card: ICard) {
  const cardRef = collection(db, "GeneralCards");
  const q = query(
    cardRef,
    where("answer", "==", card.answer),
    where("question", "==", card.question),
    where("technology", "==", card.technology),
    where("randomSvgCard", "==", card.randomSvgCard),
    where("id", "==", card.id),
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
export function sendFunctionsToFirebase() {
  function sendDeck(deck: ICardsFromFirestore, idUser: string) {
    setDoc(doc(db, "PersonalCards", idUser), deck);
  }
  function sendCard(card: ICard) {
    addDoc(collection(db, "GeneralCards"), card);
  }
  return { sendDeck, sendCard };
}

export function validateCardFields(card: ICard) {
  if (card.technology === "none") throw Error("Set technology in card");
  if (card.answer === "") throw Error("Answer field is empty!");
  if (card.question === "") throw Error("Question field is empty!");
  if (card.id === 0) throw Error("Select card deck");
}

export function deleteCardFromFirestore(deletedCard: ICard, cardsFromState: ICardsFromFirestore) {
  const copyStateCards = { ...cardsFromState };
  const deckWithoutDeletedCard = copyStateCards[deletedCard?.technology]?.filter((cardFromState) => {
    const keysCard = Object.keys(cardFromState) as ReadonlyArray<keyof ICard>;
    return !keysCard.every((key) => cardFromState[key] === deletedCard[key]);
  });
  const deleteEmptyDeck = Object.fromEntries(
    Object.entries(copyStateCards)?.filter(([technology]) => technology !== deletedCard.technology),
  );
  const deckCardAfterDeleted =
    deckWithoutDeletedCard?.length === 0
      ? deleteEmptyDeck
      : {
          [deletedCard.technology]: deckWithoutDeletedCard,
        };
  return deckCardAfterDeleted;
}
