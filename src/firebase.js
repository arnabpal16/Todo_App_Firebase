
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA-IoKPthHmzBPs5MchrXKY2Gekuw_4few",
  authDomain: "todo-app-practice-6b02a.firebaseapp.com",
  projectId: "todo-app-practice-6b02a",
  storageBucket: "todo-app-practice-6b02a.appspot.com",
  messagingSenderId: "283017825473",
  appId: "1:283017825473:web:662446106b928ebad85840"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)