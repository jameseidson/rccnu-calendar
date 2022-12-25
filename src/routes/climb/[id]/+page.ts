import { error } from "@sveltejs/kit";
import { get } from "svelte/store";

import { climbs } from "$lib/utilities/database";

export const load = async ({ params }: { params: { id: string } }) => {
  await climbs.known;

  if (params.id in get(climbs)) {
    return {
      id: params.id,
    };
  } else {
    throw error(404, "Couldn't find climb");
  }
};
