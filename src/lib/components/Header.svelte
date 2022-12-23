<script lang="ts">
  import { ArrowLeftOnRectangle, Plus } from "svelte-heros-v2";

  import { user, googleSignOut } from "$lib/utilities/auth";
  import logo from "$lib/assets/logo-purple-transparent.png";
  import AddClimbForm from "./AddClimbForm.svelte";
</script>

<AddClimbForm label="add-climb-form-popup" />

<div class="navbar bg-neutral rounded-2xl shadow-xl my-6 ">
  <div class="navbar-start">
    <label
      for="add-climb-form-popup"
      class="btn btn-circle btn-ghost btn-lg p-1"
    >
      <div
        class="btn btn-circle btn-success text-neutral no-animation w-full h-full"
      >
        <Plus />
      </div>
    </label>
  </div>

  <div class="navbar-center">
    <div class="flex-1">
      <a class="btn btn-ghost btn-lg p-0" href="/">
        <img class="h-full" src={logo} alt="RCCNU logo" />
      </a>
    </div>
  </div>

  <div class="navbar-end">
    <div class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-circle btn-ghost btn-lg p-1 avatar">
        <div class="w-full rounded-full">
          <img src={$user?.photoURL} alt="profile icon" />
        </div>
      </label>
      <ul
        tabindex="0"
        class="menu menu-compact dropdown-content bg-neutral shadow-xl rounded-box w-52 mt-3 p-2 "
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
