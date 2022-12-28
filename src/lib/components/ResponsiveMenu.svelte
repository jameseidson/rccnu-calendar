<script lang="ts">
  let innerWidth: number;
</script>

<svelte:window bind:innerWidth />

<ul
  class={`menu rounded-box bg-base-200 h-min ${
    innerWidth <= 500 ? "" : "menu-horizontal h-14"
  }`}
>
  <li>
    <slot name="item-1" />
  </li>
  <li>
    <slot name="item-2" />
  </li>
</ul>
