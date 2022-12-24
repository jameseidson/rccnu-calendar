import { climbs } from "$lib/utilities/database";

export const load = async () => await climbs.known;
