<script lang="ts">
  import { climbs } from "$lib/utilities/database";
  import ClimbCardList from "$lib/components/ClimbCardList.svelte";
  import PageMessage from "$lib/components/PageMessage.svelte";
  import ResponsiveGrid from "$lib/components/ResponsiveGrid.svelte";
</script>

<div class="card bg-base-300 shadow-lg p-4">
  {#await climbs.known}
    <div role="status" class="animate-pulse space-y-4">
      {#each Array(4) as _}
        <div class="grid place-items-center">
          <div class="rounded-full bg-gray-700 h-5 w-48" />
        </div>
        <ResponsiveGrid>
          <div class="card bg-gray-700 h-40 w-full" />
          <div class="card bg-gray-700 h-40 w-full" />
          <div class="card bg-gray-700 h-40 w-full" />
        </ResponsiveGrid>
      {/each}
    </div>
  {:then _}
    {#if Object.keys($climbs).length == 0}
      <PageMessage>There are no upcoming climbs! ☹️</PageMessage>
    {:else}
      <ClimbCardList climbs={$climbs} />
    {/if}
  {/await}
</div>
