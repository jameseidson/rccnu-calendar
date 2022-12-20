import { getDatabase, ref, set, onValue } from "firebase/database";
import type { UserInfo } from "firebase/auth";

import { app } from "./firebase";
import { awaitable } from "./stores";

const database = getDatabase(app);

type Gym =
  | "Movement Lincoln Park"
  | "Movement Wrigleyville"
  | "First Ascent"
  | "Brooklyn Boulders";

export const addProfile = (user: UserInfo): void => {
  set(ref(database, `profiles/${user.uid}`), {
    name: user.displayName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    photoUrl: user.photoURL,
  });
};

export const climbs = awaitable((set) =>
  onValue(ref(database, "climbs"), (snapshot) => {
    set(snapshot.val());
  })
);
