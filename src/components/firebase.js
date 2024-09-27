import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCKoIajnfOrhixgSn6GeuAEWFaOsaSRo_c",
  authDomain: "todo-list-ac0bc.firebaseapp.com",
  projectId: "todo-list-ac0bc",
  storageBucket: "todo-list-ac0bc.appspot.com",
  messagingSenderId: "841705522118",
  appId: "1:841705522118:web:7cce50451e805553d6e8c7",
  measurementId: "G-QTETQGP7MK",
  databaseURL: "https://todo-list-ac0bc-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth, app };
