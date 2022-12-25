<script lang="ts">
  import {
    Share,
    ArrowRight,
    ArrowTopRightOnSquare,
    Check,
    ClipboardDocument,
  } from "svelte-heros-v2";

  import type { Climb } from "$lib/utilities/types";
  import ClimbTitle from "./ClimbTitle.svelte";

  export let id: string;
  export let climb: Climb;

  const shareableURL = `${window.location.origin}/climb/${id}`;
  const modalId = "share-" + id;
  let numAttendees = Object.keys(climb.attendees).length;
  let innerWidth: number;
  let copied = false;
</script>

<svelte:window bind:innerWidth />

<input type="checkbox" id={modalId} class="modal-toggle" />

<label for={modalId} class="modal cursor-pointer">
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

<div class="card bg-base-100 shadow-md text-left h-min w-full">
  <div class="card-body p-4">
    <div class="flex justify-between">
      <span class="pl-2">
        <ClimbTitle {climb} titleSize="text-xl" subtitleSize="text-lg" />
      </span>

      <ul
        class={`menu rounded-box bg-base-200 ${
          innerWidth <= 500 ? "" : "menu-horizontal h-14"
        }`}
      >
        <li>
          <label for={modalId}>
            <Share />
          </label>
        </li>
        <li>
          <a href="/climb/{id}">
            <ArrowTopRightOnSquare />
          </a>
        </li>
      </ul>
    </div>

    <div class="flex justify-between align-middle mr-1">
      <div class="avatar-group -space-x-6">
        <div class="avatar">
          <div class="w-10">
            <img src={Object.values(climb.organizer)[0]} alt="profile icon" />
          </div>
        </div>
        {#each Object.entries(climb.attendees).slice(0, 19) as [id, photoURL] (id)}
          <div class="avatar">
            <div class="w-10">
              <img src={photoURL} alt="profile icon" />
            </div>
          </div>
        {/each}
        {#if numAttendees > 20}
          <div class="avatar placeholder">
            <div class="w-10 bg-neutral-focus text-neutral-content">
              <span>+{numAttendees - 20}</span>
            </div>
          </div>
        {/if}
      </div>

      <button class="btn btn-circle btn-ghost "><ArrowRight /></button>
    </div>
  </div>
</div>
