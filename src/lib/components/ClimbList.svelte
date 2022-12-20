<script lang="ts">
  import { climbs } from "$lib/utilities/database";

  $: climbs.known.then(() => console.log($climbs));
</script>

<h1>Climb List</h1>
