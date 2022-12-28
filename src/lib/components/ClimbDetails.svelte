<script lang="ts">
  import { MagnifyingGlass, Share } from "svelte-heros-v2";

  import { getProfile } from "$lib/utilities/database";
  import type { Climb } from "$lib/utilities/types";
  import ClimbTitle from "./ClimbTitle.svelte";
  import MapDirections from "./MapDirections.svelte";
  import ProfileTeaser from "./ProfileTeaser.svelte";
  import DynamicMenu from "./DynamicMenu.svelte";
  import SharePopup from "./SharePopup.svelte";
  import JoinLeaveButton from "./JoinLeaveButton.svelte";

  export let id: string;
  export let climb: Climb;

  const sharePopupId = "share-" + id;
  let searchQuery: string = "";
  let attendeeIds = Object.keys(climb.attendees);
</script>

<SharePopup
  popupId={sharePopupId}
  shareableURL={`${window.location.origin}/climb/${id}`}
/>

<MapDirections origin={climb.meetLocation} destination={climb.climbLocation} />
<div class="pb-4" />

<div class="flex justify-between align-middle">
  <span class="pr-2">
    <ClimbTitle {climb} titleSize="text-3xl" subtitleSize="text-2xl" />
  </span>
  <DynamicMenu>
    <label slot="item-1" for={sharePopupId}>
      <Share />
    </label>
    <JoinLeaveButton {id} {climb} slot="item-2" />
  </DynamicMenu>
</div>

<label class="input-group input-group-sm w-full">
  <span class="bg-base-100"><MagnifyingGlass /></span>
  <input
    type="text"
    bind:value={searchQuery}
    placeholder="Search attendees"
    class="input input-md w-full"
  />
</label>

<div
  class="overflow-x-scroll overflow-y-hidden whitespace-nowrap space-x-2 w-auto h-100 pt-2 pb-4"
>
  {#await Promise.all(attendeeIds.map((id) => getProfile(id)))}
    <div role="status" class="animate-pulse">
      <div class="flex justify-left items-center">
        <div class="rounded-full bg-gray-700 h-5 w-full" />
      </div>
    </div>
  {:then attendees}
    {#each attendees as attendee, i (attendeeIds[i])}
      {#if attendee.displayName.includes(searchQuery)}
        <ProfileTeaser
          displayName={attendee.displayName}
          photoURL={attendee.photoURL}
        />
      {/if}
    {/each}
  {/await}
</div>
