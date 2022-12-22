<script lang="ts">
  import type { MeetLocation, ClimbLocation } from "$lib/utilities/database";

  export let value: string;
  export let title: string;
  export let placeholder: string;
  export let options: typeof MeetLocation | typeof ClimbLocation;
</script>

<div class="mt-2">
  <span class="label-text text-lg">{title}</span>
  <select bind:value class="select select-bordered w-full">
    <option disabled selected>{placeholder}</option>
    {#each Object.keys(options).filter((k) => isNaN(Number(k))) as option}
      <option>{option}</option>
    {/each}
  </select>
</div>
