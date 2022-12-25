<script lang="ts">
  import { Share, ArrowRight, ArrowTopRightOnSquare } from "svelte-heros-v2";

  import type { Climb } from "$lib/utilities/types";
  import ClimbTitle from "./ClimbTitle.svelte";

  export let id: string;
  export let climb: Climb;

  let numAttendees = Object.keys(climb.attendees).length;
</script>

<div class="card bg-base-100 shadow-md text-left h-min w-full">
  <div class="card-body p-4">
    <div class=" flex justify-between">
      <ClimbTitle {climb} titleSize="text-xl" subtitleSize="text-lg" />

      <ul class="menu menu-horizontal h-14 bg-base-200 rounded-box">
        <li>
          <a>
            <Share />
          </a>
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
