import { get } from "svelte/store";

import { climbs, getProfile } from "$lib/utilities/database";

export const load = async () => {
  await climbs.known;

  const profileIds: Set<string> = new Set();
  for (const climbsOnDate of Object.values(get(climbs))) {
    for (const climb of Object.values(climbsOnDate)) {
      profileIds.add(climb.organizer);
      climb.attendees.forEach((attendee) => profileIds.add(attendee));
    }
  }

  const ids = [...profileIds];
  const profiles = await Promise.all(ids.map((id) => getProfile(id)));

  return {
    profiles: Object.fromEntries(ids.map((id, i) => [id, profiles[i]])),
  };
};
