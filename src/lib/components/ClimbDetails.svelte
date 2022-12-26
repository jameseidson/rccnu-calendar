<script lang="ts">
  import { MagnifyingGlass, Share, ArrowRight } from "svelte-heros-v2";

  import { getProfile } from "$lib/utilities/database";
  import type { Climb } from "$lib/utilities/types";
  import ClimbTitle from "./ClimbTitle.svelte";
  import MapDirections from "./MapDirections.svelte";
  import ProfileTeaser from "./ProfileTeaser.svelte";
  import SkeletonLoader from "./SkeletonLoader.svelte";
  import DynamicMenu from "./DynamicMenu.svelte";
  import SharePopup from "./SharePopup.svelte";

  export let id: string;
  export let climb: Climb;

  const sharePopupId = "share-" + id;
  let searchQuery: string = "";
  let organizerId = Object.keys(climb.organizer)[0];
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
    <a slot="item-2"> <ArrowRight /> </a>
  </DynamicMenu>
</div>

{#await getProfile(organizerId)}
  <SkeletonLoader width="w-80" />
{:then organizer}
  <div class="text-md py-2">
    <span class="align-middle"> Organized by </span>
    <ProfileTeaser
      displayName={organizer.displayName}
      photoURL={organizer.photoURL}
    />
  </div>
{/await}

{#if attendeeIds.length !== 0}
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
      <SkeletonLoader width="w-full" />
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
{:else}
  No attendees yet!
{/if}
