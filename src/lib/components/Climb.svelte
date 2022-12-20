<script lang="ts">
  import type { Climb } from "$lib/utilities/database";

  export let climb: Climb;
</script>

<div
  class="card grid place-items-center bg-base-300 shadow-md my-2 h-20 w-full"
>
  <div class="inline">
    <strong>{climb.location}</strong> at
    <strong
      >{climb.date.toLocaleTimeString("en-US", {
        timeZone: "America/Chicago",
      })}</strong
    >
  </div>
</div>
