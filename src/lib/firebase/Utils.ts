import { Card } from "../../Types/Types";
import { auth, db } from "./index";
import { collection, query, getDocs, addDoc, doc } from "@firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
function createUserEmailPass(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}
function signUserEmailPass(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}
function sendData(nameDatabase: string, card: Card) {
  addDoc(collection(db, nameDatabase), card);
}
function getData(nameDatabase: string) {
  const q = query(collection(db, nameDatabase));
  const personalCards: { [index: string]: Card[] } = {};
  const generalCards: { [index: string]: Card[] } = {};

  async function getDataFromFirestore() {
    const sortCardByTechnology = (
      object: { [index: string]: Card[] },
      card: Card
    ) => {
      if (object[card.technology] === undefined) {
        object[card.technology] = [];
      }
      object[card.technology].push(card);
    };
    const querySnapshot = await getDocs(q);
    await querySnapshot.forEach((cards) => {
      sortCardByTechnology(personalCards, cards.data() as Card);
    });

    await querySnapshot.forEach((cards) => {
      sortCardByTechnology(generalCards, cards.data() as Card);
    });
  }
  getDataFromFirestore();
  return [personalCards, generalCards];
}
export { sendData, getData, createUserEmailPass, signUserEmailPass };
