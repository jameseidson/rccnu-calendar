<script lang="ts">
  import { googleSignIn } from "$lib/utilities/firebase";
  import logo from "$lib/assets/logo-purple-transparent.png";
</script>

<div class="grid place-items-center h-screen">
  <div
    class="card place-items-center p-4 space-y-4 w-100 bg-neutral shadow-xl "
  >
    <img class="max-w-sm" src={logo} alt="RCCNU logo" />
    <div
      class="tooltip tooltip-info w-full"
      data-tip="Please sign in with your NU email!"
    >
      <button on:click={googleSignIn} class="btn btn-primary btn-block"
        >Sign In</button
      >
    </div>
  </div>
</div>
