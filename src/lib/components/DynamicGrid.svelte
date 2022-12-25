<script lang="ts">
  let innerWidth: number;
</script>

<svelte:window bind:innerWidth />

<div
  class={`grid gap-2 ${
    innerWidth >= 1330
      ? "grid-cols-3"
      : innerWidth < 900
      ? "grid-cols-1"
      : "grid-cols-2"
  }`}
>
  <slot />
</div>
