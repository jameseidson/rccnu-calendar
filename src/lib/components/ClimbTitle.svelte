<script lang="ts">
  import { Star } from "svelte-heros-v2";

  import type { Climb } from "$lib/utilities/types";

  export let climb: Climb;
  export let titleSize: "text-3xl" | "text-2xl" | "text-xl";
  export let subtitleSize: "text-2xl" | "text-xl" | "text-lg";
</script>

<div>
  <h1 class={`${titleSize} text-primary-content font-bold`}>
    {climb.climbLocation}
    {#if climb.withClub}
      <div class="tooltip" data-tip="This climb is organized by the club">
        <Star class="inline pb-1" />
      </div>
    {/if}
  </h1>

  <h2 class={subtitleSize}>
    <span class={`${subtitleSize} font-bold`}>
      {climb.meetLocation}
    </span>
    at
    <span class={`${subtitleSize} font-bold`}>
      {climb.meetDate.toLocaleTimeString("en-US", {
        timeZone: "America/Chicago",
        timeStyle: "short",
      })}
    </span>
  </h2>
</div>
