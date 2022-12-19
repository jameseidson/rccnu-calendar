<script lang="ts">
  export let size: string;
</script>

<div>
  <div
    class="absolute radial-progress text-neutral"
    style="--value:100; --size:{size}rem"
  />
  <div
    class="radial-progress text-primary animate-spin"
    style="--value:25; --size:{size}rem"
  />
</div>
