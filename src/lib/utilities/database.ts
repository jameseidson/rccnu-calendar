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
import defaultPhoto from "$lib/assets/default-photo.svg";

const database = getDatabase(app);

const climbToDb = (climb: Climb) => ({
  meetLocation: MeetLocation[climb.meetLocation],
  meetDate: climb.meetDate.valueOf(),
  climbLocation: ClimbLocation[climb.climbLocation],
  attendees: climb.attendees,
  withClub: climb.withClub,
});

const climbFromDb = (entry: { [id: string]: any }): Climb => ({
  meetLocation: entry.meetLocation,
  meetDate: new Date(entry.meetDate),
  climbLocation: entry.climbLocation,
  attendees: entry.attendees,
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

export const addProfileIfNew = (user: UserInfo): void => {
  const userRef = ref(database, `profiles/${user.uid}`);
  get(userRef).then((snapshot) => {
    if (!snapshot.exists()) {
      set(userRef, {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      } as Profile);
    }
  });
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
  const rootRef = ref(database);

  const entry = climbToDb({
    meetLocation: meetLocation,
    meetDate: meetDate,
    climbLocation: climbLocation,
    attendees: { [organizer!.uid]: organizer!.photoURL || defaultPhoto },
    withClub: withClub,
  });

  const id = push(child(rootRef, `climbs`)).key;

  const updates = {
    [`/climbs/${id}`]: entry,
    [`/users/${organizer!.uid}/attending/${id}`]: true,
  };

  update(rootRef, updates);
};

export const joinClimb = (climbId: string): void => {
  const attendee = getStore(user);

  update(ref(database), {
    [`climbs/${climbId}/attendees/${attendee!.uid}`]: attendee!.photoURL,
    [`users/${attendee!.uid}/attending/${climbId}`]: true,
  });
};

export const leaveClimb = (climbId: string): void => {
  const attendee = getStore(user);
  const rootRef = ref(database);
  const updates = { [`users/${attendee!.uid}/attending/${climbId}`]: null };

  get(child(rootRef, `climbs/${climbId}/attendees/`)).then((snapshot) => {
    if (snapshot.size === 1) {
      updates[`climbs/${climbId}`] = null;
    } else {
      updates[`climbs/${climbId}/attendees/${attendee!.uid}`] = null;
    }

    update(rootRef, updates);
  });
};
