<script lang="ts">
  import { Check, ClipboardDocument } from "svelte-heros-v2";
  export let popupId: string;
  export let shareableURL: string;

  let copied = false;
</script>

<input type="checkbox" id={popupId} class="modal-toggle" />

<label for={popupId} class="modal cursor-pointer">
  <label class="modal-box relative p-4">
    <h1 class="text-lg pb-2">Shareable URL</h1>
    <div class="input-group w-full">
      <input
        type="text"
        readonly
        value={shareableURL}
        class="input input-bordered w-full"
      />
      <button
        class="btn btn-square"
        on:click={() =>
          navigator.clipboard.writeText(shareableURL).then(() => {
            copied = true;
            new Promise((resolve) => setTimeout(resolve, 450)).then(
              () => (copied = false)
            );
          })}
      >
        {#if copied}
          <Check />
        {:else}
          <ClipboardDocument />
        {/if}
      </button>
    </div>
  </label>
</label>
