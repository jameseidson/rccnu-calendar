<script lang="ts">
  import ClimbDetails from "$lib/components/ClimbDetails.svelte";

  import { climbs } from "$lib/utilities/database";
  import PageMessage from "$lib/components/PageMessage.svelte";

  export let data: { id: string };
</script>

<div class="card bg-base-300 shadow-lg p-4 ">
  {#if data.id in $climbs}
    <ClimbDetails id={data.id} climb={$climbs[data.id]} />
  {:else}
    <PageMessage>
      The climb was deleted because you were the last attendee! ☹️
    </PageMessage>
  {/if}
</div>
