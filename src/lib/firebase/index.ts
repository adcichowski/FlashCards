import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDoLMakTzMEu_varMbcq82iq8s_V3gnoM4",
  authDomain: "flashcards-9fc32.firebaseapp.com",
  projectId: "flashcards-9fc32",
  storageBucket: "flashcards-9fc32.appspot.com",
  messagingSenderId: "692617289051",
  appId: "1:692617289051:web:0a58c2e0f754ece017ce7e",
  measurementId: "G-69HC1ZX4NK",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export const auth = firebase.auth();
export const db = firebase.firestore();
