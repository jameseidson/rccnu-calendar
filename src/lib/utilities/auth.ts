import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";

import { app } from "./firebase";
import { awaitable } from "./stores";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const user = awaitable<User | null>((set) =>
  onAuthStateChanged(auth, set)
);
export const googleSignIn = () => signInWithPopup(auth, provider);
export const googleSignOut = () => signOut(auth);
