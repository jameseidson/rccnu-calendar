<script lang="ts">
  import { climbs } from "$lib/utilities/database";
  import ClimbCardList from "$lib/components/ClimbCardList.svelte";
</script>

<div class="card bg-base-300 shadow-lg p-4 ">
  <ClimbCardList climbs={$climbs} />
</div>
