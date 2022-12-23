<script lang="ts">
  import type { UserInfo } from "firebase/auth";

  import { climbs } from "$lib/utilities/database";
  import Climb from "./Climb.svelte";

  export let profiles: { [key: string]: UserInfo };

  const prettyDay = (day: string) => {
    const fields = day.split("/");
    const date = new Date(
      Number(fields[2]),
      Number(fields[0]) - 1,
      Number(fields[1])
    );

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  let innerWidth: number;
</script>

<svelte:window bind:innerWidth />

{#each Object.entries($climbs) as [day, climbsOnDay] (day)}
  <div class="divider text-2xl font-bold">{prettyDay(day)}</div>
  <div
    class={`grid gap-2 grid-cols-${
      innerWidth < 900 ? "1" : innerWidth >= 1330 ? "3" : "2"
    }`}
  >
    {#each Object.entries(climbsOnDay) as [id, climb] (id)}
      <Climb {climb} {profiles} />
    {/each}
  </div>
{/each}
