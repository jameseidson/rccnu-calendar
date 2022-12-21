import { getDatabase, ref, set, onValue } from "firebase/database";
import type { UserInfo } from "firebase/auth";

import { app } from "./firebase";
import { awaitable } from "./stores";

const database = getDatabase(app);

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

export const addProfile = (user: UserInfo): void => {
  set(ref(database, `profiles/${user.uid}`), {
    name: user.displayName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    photoUrl: user.photoURL,
  });
};

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
          const climb: Climb = {
            location: entry.location,
            date: new Date(entry.date),
            organizer: entry.organizer,
            attendees: Object.keys(entry.attendees),
            withClub: entry.withClub,
          };

          const day = climb.date.toLocaleDateString();
          return {
            ...grouped,
            [day]: { ...(grouped[day] || {}), [id]: climb },
          };
        }, {})
    );
  })
);
