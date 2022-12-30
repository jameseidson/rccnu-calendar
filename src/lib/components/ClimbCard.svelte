<script lang="ts">
  import { Share, ArrowTopRightOnSquare } from "svelte-heros-v2";

  import type { Climb } from "$lib/utilities/types";
  import ClimbTitle from "./ClimbTitle.svelte";
  import ResponsiveMenu from "./ResponsiveMenu.svelte";
  import SharePopup from "./SharePopup.svelte";
  import JoinLeaveButton from "./JoinLeaveButton.svelte";

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

      <ResponsiveMenu>
        <label slot="item-1" for={sharePopupId}>
          <Share />
        </label>
        <a slot="item-2" href="/climb/{id}">
          <ArrowTopRightOnSquare />
        </a>
      </ResponsiveMenu>
    </div>

    <div class="flex justify-between align-middle mr-1">
      <div class="avatar-group -space-x-6">
        {#each Object.entries(climb.attendees).slice(0, 19) as [id, photoURL] (id)}
          <div class="avatar">
            <div class="w-10">
              <img
                src={photoURL}
                referrerpolicy="no-referrer"
                alt="attendee icon"
              />
            </div>
          </div>
        {/each}
        {#if numAttendees > 20}
          <div class="avatar placeholder">
            <div class="bg-neutral-focus text-neutral-content w-10 ">
              <span>+{numAttendees - 20}</span>
            </div>
          </div>
        {/if}
      </div>

      <JoinLeaveButton {id} {climb} class="btn btn-circle btn-ghost" />
    </div>
  </div>
</div>
