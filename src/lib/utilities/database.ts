import {
  getDatabase,
  ref,
  push,
  set,
  get,
  child,
  onValue,
  update,
} from "firebase/database";
import type { UserInfo } from "firebase/auth";
import { get as getStore } from "svelte/store";

import { MeetLocation, ClimbLocation, type Climb, type Profile } from "./types";
import { app } from "./firebase";
import { awaitable } from "./stores";
import { user } from "./auth";

const database = getDatabase(app);

const climbToDb = (climb: Climb) => ({
  ...(Object.keys(climb.attendees).length && { attendees: climb.attendees }),
  ...{
    meetLocation: MeetLocation[climb.meetLocation],
    meetDate: climb.meetDate.toUTCString(),
    climbLocation: ClimbLocation[climb.climbLocation],
    organizer: climb.organizer,
    withClub: climb.withClub,
  },
});

const climbFromDb = (entry: { [id: string]: any }): Climb => ({
  meetLocation: entry.meetLocation,
  meetDate: new Date(entry.meetDate),
  climbLocation: entry.climbLocation,
  organizer: entry.organizer,
  attendees: entry.attendees ? entry.attendees : {},
  withClub: entry.withClub,
});

export const climbs = awaitable<{ [id: string]: Climb }>((set) =>
  onValue(ref(database, "climbs"), (snapshot) => {
    set(
      Object.fromEntries(
        Object.entries(snapshot.val()).map(([id, entry]: [string, any]) => [
          id,
          climbFromDb(entry),
        ])
      )
    );
  })
);

export const addProfile = (user: UserInfo): void => {
  set(ref(database, `profiles/${user.uid}`), {
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  } as Profile);
};

export const getProfile = async (id: string): Promise<Profile> => {
  const snapshot = await get(child(ref(database), `profiles/${id}`));

  return snapshot.val();
};

export const addClimb = (
  meetLocation: MeetLocation,
  meetDate: Date,
  climbLocation: ClimbLocation,
  withClub: boolean
): void => {
  const organizer = getStore(user);

  const entry = climbToDb({
    meetLocation: meetLocation,
    meetDate: meetDate,
    climbLocation: climbLocation,
    // @ts-ignore
    organizer: { [organizer.uid]: organizer.photoURL },
    withClub: withClub,
  });

  const id = push(child(ref(database), `climbs`)).key;

  const updates = {
    [`/climbs/${id}`]: entry,
    //@ts-ignore
    [`/users/${organizer.uid}/organizing/${id}`]: true,
  };

  update(ref(database), updates);
};
