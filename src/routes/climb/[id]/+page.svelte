<script lang="ts">
  import ClimbDetails from "$lib/components/ClimbDetails.svelte";

  import { climbs } from "$lib/utilities/database";

  export let data: { id: string; attendees: string[] };
</script>

<div class="card bg-base-300 shadow-lg p-4 ">
  <ClimbDetails id={data.id} climb={$climbs[data.id]} />
</div>
