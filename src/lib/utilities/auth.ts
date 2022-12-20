import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { readable } from "svelte/store";

import { app } from "./firebase";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function initUser() {
  const { subscribe } = readable<User | null>(undefined, (set) =>
    onAuthStateChanged(auth, set)
  );

  const known = new Promise<void>((resolve) => {
    let unsubscribe = subscribe((user) => {
      if (user !== undefined) {
        resolve();
        unsubscribe();
      }
    });
  });

  return { subscribe, known };
}

export const user = initUser();
export const googleSignIn = () => signInWithPopup(auth, provider);
export const googleSignOut = () => signOut(auth);
