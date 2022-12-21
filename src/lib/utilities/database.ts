import {
  getDatabase,
  ref,
  push,
  set,
  child,
  onValue,
  update,
} from "firebase/database";
import type { UserInfo } from "firebase/auth";

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
    location: climb.location,
    date: climb.date.toUTCString(),
    organizer: climb.organizer,
    withClub: climb.withClub,
  },
});

const climbFromDb = (entry: { [key: string]: any }): Climb => ({
  location: entry.location,
  date: new Date(entry.date),
  organizer: entry.organizer,
  attendees: entry.attendees ? Object.keys(entry.attendees) : [],
  withClub: entry.withClub,
});

export const climbLocations = [
  "Movement Lincoln Park",
  "Movement Wrigleyville",
  "First Ascent",
  "Brooklyn Boulders",
];

export type ClimbLocation = typeof climbLocations[number];

export interface Climb {
  location: ClimbLocation;
  date: Date;
  organizer: string;
  attendees: string[];
  withClub: Boolean;
}

export const climbs = awaitable<{ [key: string]: Climb[] }>((set) =>
  onValue(ref(database, "climbs"), (snapshot) => {
    const climbsInDb: any = snapshot.val();

    set(
      Object.entries(climbsInDb)
        .sort(
          ([, a]: any, [, b]: any) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        )
        // group the climbs by the day they occur
        .reduce((grouped: any, [id, entry]: [string, any]) => {
          const climb = climbFromDb(entry);

          const day = climb.date.toLocaleDateString();
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
    name: user.displayName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    photoUrl: user.photoURL,
  });
};

export const addClimb = (climb: Climb, day: string): void => {
  const entry = climbToDb(climb);

  console.log(entry);

  const key = push(child(ref(database), `climbs`)).key;

  const updates = {
    [`/climbs/${key}`]: entry,
    [`/users/${climb.organizer}/organizing/${key}`]: true,
  };

  update(ref(database), updates);
};
