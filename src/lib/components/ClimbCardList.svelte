<script lang="ts">
  import type { Climb } from "$lib/utilities/types";
  import ClimbCard from "./ClimbCard.svelte";
  import ResponsiveGrid from "./ResponsiveGrid.svelte";

  export let climbs: { [id: string]: Climb };

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

  let climbsByDay: { [day: string]: string[] };

  $: climbsByDay = Object.entries(climbs)
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
</script>

{#each Object.entries(climbsByDay) as [day, onDay] (day)}
  <div class="divider text-2xl font-bold">{prettyDay(day)}</div>
  <ResponsiveGrid>
    {#each onDay as id (id)}
      <ClimbCard {id} climb={climbs[id]} />
    {/each}
  </ResponsiveGrid>
{/each}
