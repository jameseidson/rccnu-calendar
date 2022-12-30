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
import { addProfileIfNew } from "./database";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const user = awaitable<User | null>((set) =>
  onAuthStateChanged(auth, set)
);

export const googleSignIn = async () => {
  const newUser = await signInWithPopup(auth, provider).then(
    (credential) => credential.user
  );

  if (newUser.email && newUser.email.endsWith("@u.northwestern.edu")) {
    addProfileIfNew(newUser);
  }
};

export const googleSignOut = () => signOut(auth);
