<script lang="ts">
  export let width: string;
</script>

<div role="status" class="animate-pulse">
  <div class="flex justify-left items-center">
    <div class={`rounded-full bg-gray-700 h-5 ${width}`} />
  </div>
</div>
