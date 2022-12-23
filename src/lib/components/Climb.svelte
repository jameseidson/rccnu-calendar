<script lang="ts">
  import type { UserInfo } from "firebase/auth";
  import {
    Share,
    ArrowRight,
    ArrowTopRightOnSquare,
    User,
    Star,
  } from "svelte-heros-v2";

  import type { Climb } from "$lib/utilities/types";

  export let climb: Climb;
  export let profiles: { [id: string]: UserInfo };
</script>

<div class="card bg-base-100 shadow-md text-left h-min w-full">
  <figure />
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
        {profiles[climb.organizer].displayName}
      </strong>
      {#if climb.attendees.length > 0}
        and <strong
          >{`${climb.attendees.length} other${
            climb.attendees.length === 1 ? "" : "s"
          }`}</strong
        >
      {/if}
    </div>

    <div class="flex justify-between align-middle mr-1">
      <div class="avatar-group -space-x-6">
        <div class="avatar">
          <div class="w-10">
            <img src={profiles[climb.organizer].photoURL} alt="profile icon" />
          </div>
        </div>
        {#each climb.attendees.slice(0, 19) as attendee (attendee)}
          <div class="avatar">
            <div class="w-10">
              <img src={profiles[attendee].photoURL} alt="profile icon" />
            </div>
          </div>
        {/each}
        {#if climb.attendees.length > 20}
          <div class="avatar placeholder">
            <div class="w-10 bg-neutral-focus text-neutral-content">
              <span>+{climb.attendees.length - 20}</span>
            </div>
          </div>
        {/if}
      </div>

      <button class="btn btn-circle btn-ghost "><ArrowRight /></button>
    </div>
  </div>
</div>
