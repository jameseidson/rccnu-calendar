<script lang="ts">
  import type { UserInfo } from "firebase/auth";

  import { climbs } from "$lib/utilities/database";
  import Climb from "./Climb.svelte";

  export let profiles: { [key: string]: UserInfo };
</script>

{#each Object.entries($climbs) as [day, climbsOnDay] (day)}
  <div class="divider text-xl font-bold">{day}</div>
  {#each Object.entries(climbsOnDay) as [id, climb] (id)}
    <Climb {climb} {profiles} />
  {/each}
{/each}
