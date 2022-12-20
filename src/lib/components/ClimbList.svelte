<script lang="ts">
  import { climbs } from "$lib/utilities/database";
  import Climb from "./Climb.svelte";
</script>

{#each Object.entries($climbs) as [day, climbsOnDay] (day)}
  <div class="divider text-xl font-bold">{day}</div>
  {#each Object.entries(climbsOnDay) as [id, climb] (id)}
    <Climb {climb} />
  {/each}
{/each}
