<script lang="ts">
  import { Share, ArrowRight, ArrowTopRightOnSquare } from "svelte-heros-v2";

  import type { Climb } from "$lib/utilities/types";
  import ClimbTitle from "./ClimbTitle.svelte";
  import DynamicMenu from "./DynamicMenu.svelte";
  import SharePopup from "./SharePopup.svelte";

  export let id: string;
  export let climb: Climb;

  const sharePopupId = "share-" + id;
  let numAttendees = Object.keys(climb.attendees).length;
</script>

<SharePopup
  popupId={sharePopupId}
  shareableURL={`${window.location.origin}/climb/${id}`}
/>

<div class="card bg-base-100 shadow-md text-left h-min w-full">
  <div class="card-body p-4">
    <div class="flex justify-between">
      <span class="pl-2">
        <ClimbTitle {climb} titleSize="text-xl" subtitleSize="text-lg" />
      </span>

      <DynamicMenu>
        <label slot="item-1" for={sharePopupId}>
          <Share />
        </label>
        <a slot="item-2" href="/climb/{id}">
          <ArrowTopRightOnSquare />
        </a>
      </DynamicMenu>
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
