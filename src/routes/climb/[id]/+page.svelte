<script lang="ts">
  import ClimbDetails from "$lib/components/ClimbDetails.svelte";

  import { climbs } from "$lib/utilities/database";
  import PageMessage from "$lib/components/PageMessage.svelte";

  export let data: { id: string };
</script>

<div class="card bg-base-300 shadow-lg p-4 ">
  {#await climbs.known}
    <div role="status" class="animate-pulse">
      <div class="card bg-gray-700 h-[450px] w-full mb-4" />
      <div class="rounded-full bg-gray-700 h-8 w-72 mb-2" />
      <div class="rounded-full bg-gray-700 h-6 w-80" />
    </div>
  {:then _}
    {#if data.id in $climbs}
      <ClimbDetails id={data.id} climb={$climbs[data.id]} />
    {:else}
      <PageMessage>Couldn't find this climb! ☹️</PageMessage>
    {/if}
  {/await}
</div>
