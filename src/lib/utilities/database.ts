import { getDatabase, ref, set } from "firebase/database";
import type { UserInfo } from "firebase/auth";

import { app } from "./firebase";

const database = getDatabase(app);

export const addProfile = (user: UserInfo): void => {
  set(ref(database, `profiles/${user.uid}`), {
    name: user.displayName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    photoUrl: user.photoURL,
  });
};
