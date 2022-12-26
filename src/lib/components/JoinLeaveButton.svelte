<script lang="ts">
  import { joinClimb, leaveClimb } from "$lib/utilities/database";
  import { user } from "$lib/utilities/auth";
  import type { Climb } from "$lib/utilities/types";

  import { XMark, Check, ArrowRight } from "svelte-heros-v2";

  export let id: string;
  export let climb: Climb;

  let mouseover = false;
</script>

{#if $user.uid in climb.attendees}
  <div
    on:click={() => leaveClimb(id)}
    on:mouseenter={() => (mouseover = true)}
    on:mouseleave={() => (mouseover = false)}
    class={$$props.class || ""}
  >
    {#if mouseover}
      <XMark class="text-error" />
    {:else}
      <Check class="text-success" />
    {/if}
  </div>
{:else}
  <div on:click={() => joinClimb(id)} class={$$props.class || ""}>
    <ArrowRight />
  </div>
{/if}
