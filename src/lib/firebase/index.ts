import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDoLMakTzMEu_varMbcq82iq8s_V3gnoM4",
  authDomain: "flashcards-9fc32.firebaseapp.com",
  projectId: "flashcards-9fc32",
  storageBucket: "flashcards-9fc32.appspot.com",
  messagingSenderId: "692617289051",
  appId: "1:692617289051:web:0a58c2e0f754ece017ce7e",
  measurementId: "G-69HC1ZX4NK",
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
