<script lang="ts">
  import type { Climb } from "$lib/utilities/types";
  import type { UserInfo } from "firebase/auth";

  export let climb: Climb;
  export let profiles: { [id: string]: UserInfo };
</script>

<div class="card bg-base-300 shadow-md my-2 w-full">
  <div class="m-6">
    <div class="avatar">
      <div class="rounded-full w-16">
        <img src={profiles[climb.organizer].photoURL} alt="climb organizer" />
      </div>
    </div>
    <div class="inline">
      <p>
        Meet at <strong>{climb.meetLocation}</strong> at
        <strong
          >{climb.meetDate.toLocaleTimeString("en-US", {
            timeZone: "America/Chicago",
          })}</strong
        >
        to climb at
        <strong>{climb.climbLocation}</strong>
      </p>
    </div>
  </div>
</div>
