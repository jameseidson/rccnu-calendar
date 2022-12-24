<script lang="ts">
  import type { Climb } from "$lib/utilities/types";
  import ClimbInfo from "./ClimbInfo.svelte";

  export let climbs: { [id: string]: Climb };

  let climbsByDay: { [day: string]: string[] } = Object.entries(climbs)
    .sort(
      ([, a]: any, [, b]: any) =>
        new Date(a.meetDate).getTime() - new Date(b.meetDate).getTime()
    )
    // group the climbs by the day they occur
    .reduce((grouped: any, [id, climb]: [string, Climb]) => {
      const day = climb.meetDate.toLocaleDateString();
      return {
        ...grouped,
        [day]: [...(grouped[day] || []), id],
      };
    }, []);

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

{#each Object.entries(climbsByDay) as [day, onDay] (day)}
  <div class="divider text-2xl font-bold">{prettyDay(day)}</div>
  <div
    class={"grid gap-2 grid-cols-" +
      (innerWidth < 900 ? "1" : innerWidth >= 1330 ? "3" : "2")}
  >
    {#each onDay as id (id)}
      <ClimbInfo climb={climbs[id]} />
    {/each}
  </div>
{/each}
