<script lang="ts">
  import ClimbDetails from "$lib/components/ClimbDetails.svelte";

  import { climbs } from "$lib/utilities/database";

  export let data: { id: string };
</script>

<div class="card bg-base-300 shadow-lg p-4 ">
  {#if data.id in $climbs}
    <ClimbDetails id={data.id} climb={$climbs[data.id]} />
  {:else}
    <h1 class="text-xl grid place-items-center">
      The climb was deleted because you were the last attendee!
    </h1>
  {/if}
</div>
