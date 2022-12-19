import { onAuthStateChanged, type User } from "firebase/auth";
import { readable } from "svelte/store";

import { auth } from "./firebase";

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
