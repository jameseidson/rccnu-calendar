<script lang="ts">
  import { climbs } from "$lib/utilities/database";
  import ClimbCardList from "$lib/components/ClimbCardList.svelte";
  import PageMessage from "$lib/components/PageMessage.svelte";
</script>

<div class="card bg-base-300 shadow-lg p-4">
  {#if Object.keys($climbs).length == 0}
    <PageMessage>There are no upcoming climbs! ☹️</PageMessage>
  {:else}
    <ClimbCardList climbs={$climbs} />
  {/if}
</div>
