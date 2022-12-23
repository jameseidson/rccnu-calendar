<script lang="ts">
  import { googleSignIn } from "$lib/utilities/auth";
  import logo from "$lib/assets/logo-purple-transparent.png";
</script>

<div class="grid place-items-center h-screen">
  <div class="card place-items-center p-4 m-4 space-y-4 bg-neutral shadow-xl ">
    <img class="w-96 max-w-full" src={logo} alt="RCCNU logo" />
    <div
      class="tooltip tooltip-info w-full"
      data-tip="Please use your Northwestern email!"
    >
      <button on:click={googleSignIn} class="btn btn-primary btn-block">
        Sign In
      </button>
    </div>
  </div>
</div>
