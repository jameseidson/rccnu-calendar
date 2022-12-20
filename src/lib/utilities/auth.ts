import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { app } from "./firebase";
import { awaitable } from "./stores";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const user = awaitable((set) => onAuthStateChanged(auth, set));
export const googleSignIn = () => signInWithPopup(auth, provider);
export const googleSignOut = () => signOut(auth);
