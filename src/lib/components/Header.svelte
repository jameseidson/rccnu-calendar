<script lang="ts">
  import { ArrowLeftOnRectangle } from "svelte-heros-v2";

  import { user } from "$lib/utilities/stores";
  import { googleSignOut } from "$lib/utilities/firebase";
  import logo from "$lib/assets/logo-purple-transparent.png";
</script>

<div class="grid place-items-center">
  <div class="navbar bg-neutral w-11/12 my-5 rounded-lg">
    <div class="flex-1">
      <a class="btn btn-ghost btn-lg p-0" href="/">
        <img class="h-full" src={logo} alt="RCCNU logo" />
      </a>
    </div>

    <div class="dropdown dropdown-end">
      <label
        tabindex="0"
        class="btn btn-ghost btn-circle btn-lg p-1
       avatar"
      >
        <div class="w-full rounded-full">
          <img src={$user?.photoURL} alt="profile icon" />
        </div>
      </label>
      <ul
        tabindex="0"
        class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-neutral rounded-box w-52"
      >
        <li>
          <button on:click={googleSignOut}>
            <ArrowLeftOnRectangle />
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  </div>
</div>
