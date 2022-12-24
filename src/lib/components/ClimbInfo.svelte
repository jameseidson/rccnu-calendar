<script lang="ts">
  import {
    Share,
    ArrowRight,
    ArrowTopRightOnSquare,
    User,
    Star,
  } from "svelte-heros-v2";

  import type { Climb } from "$lib/utilities/types";

  export let climb: Climb;

  let numAttendees = Object.keys(climb.attendees).length;
</script>

<div class="card bg-base-100 shadow-md text-left h-min w-full">
  <div class="card-body p-4">
    <div class=" flex justify-between">
      <div>
        <div class="text-xl text-primary-content font-bold">
          {climb.climbLocation}
          {#if climb.withClub}
            <div class="tooltip" data-tip="This climb is organized by the club">
              <Star class="inline pb-1" />
            </div>
          {/if}
        </div>

        <div>
          <span class="text-lg font-bold">
            {climb.meetLocation}
          </span>
          at
          <span class="text-lg font-bold">
            {climb.meetDate.toLocaleTimeString("en-US", {
              timeZone: "America/Chicago",
              timeStyle: "short",
            })}
          </span>
        </div>
      </div>

      <ul class="menu menu-horizontal h-14 bg-base-200 rounded-box">
        <li>
          <a>
            <Share />
          </a>
        </li>
        <li>
          <a>
            <ArrowTopRightOnSquare />
          </a>
        </li>
      </ul>
    </div>

    <div class="text-md mt-4">
      <User class="inline mb-1" size="18" />
      <strong>
        {climb.organizer.displayName}
      </strong>
      {#if numAttendees > 0}
        and <strong>
          {`${numAttendees} other${numAttendees === 1 ? "" : "s"}`}
        </strong>
      {/if}
    </div>

    <div class="flex justify-between align-middle mr-1">
      <div class="avatar-group -space-x-6">
        <div class="avatar">
          <div class="w-10">
            <img src={climb.organizer.photoURL} alt="profile icon" />
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
