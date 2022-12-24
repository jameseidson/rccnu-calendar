<script lang="ts">
  import { climbs } from "$lib/utilities/database";
  import ClimbInfoList from "$lib/components/ClimbInfoList.svelte";
</script>

<div class="card bg-base-300 shadow-lg p-4 ">
  <ClimbInfoList climbs={$climbs} />
</div>
