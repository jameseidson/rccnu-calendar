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

import { MeetLocation, ClimbLocation, type Climb } from "./types";
import { app } from "./firebase";
import { awaitable } from "./stores";

const database = getDatabase(app);

const climbToDb = (climb: Climb) => ({
  ...(climb.attendees.length && {
    attendees: Object.fromEntries(
      climb.attendees.map((attendee) => [attendee, true])
    ),
  }),
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
  attendees: entry.attendees ? Object.keys(entry.attendees) : [],
  withClub: entry.withClub,
});

export const climbs = awaitable<{ [date: string]: Climb[] }>((set) =>
  onValue(ref(database, "climbs"), (snapshot) => {
    const climbsInDb: any = snapshot.val();

    set(
      Object.entries(climbsInDb)
        .sort(
          ([, a]: any, [, b]: any) =>
            new Date(a.meetDate).getTime() - new Date(b.meetDate).getTime()
        )
        // group the climbs by the day they occur
        .reduce((grouped: any, [id, entry]: [string, any]) => {
          const climb = climbFromDb(entry);

          const day = climb.meetDate.toLocaleDateString();
          return {
            ...grouped,
            [day]: { ...(grouped[day] || {}), [id]: climb },
          };
        }, {})
    );
  })
);

export const addProfile = (user: UserInfo): void => {
  set(ref(database, `profiles/${user.uid}`), {
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  });
};

export const getProfile = async (id: string): Promise<UserInfo> => {
  const snapshot = await get(child(ref(database), `profiles/${id}`));

  return snapshot.val();
};

export const addClimb = (climb: Climb): void => {
  const entry = climbToDb(climb);

  const id = push(child(ref(database), `climbs`)).key;

  const updates = {
    [`/climbs/${id}`]: entry,
    [`/users/${climb.organizer}/organizing/${id}`]: true,
  };

  update(ref(database), updates);
};
