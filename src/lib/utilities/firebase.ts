import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAY6A_i48q4BghB7PQNjCJneEzlzfAeozQ",
  authDomain: "rccnu-calendar.firebaseapp.com",
  databaseURL: "https://rccnu-calendar-default-rtdb.firebaseio.com",
  projectId: "rccnu-calendar",
  storageBucket: "rccnu-calendar.appspot.com",
  messagingSenderId: "616570603818",
  appId: "1:616570603818:web:d50540c4e2c28c58b2f653",
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

export const auth = getAuth(app);
export const googleSignIn = () => signInWithPopup(auth, provider);
export const googleSignOut = () => signOut(auth);
