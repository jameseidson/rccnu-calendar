<script lang="ts">
  import "../app.css";

  import { user } from "$lib/utilities/stores";
  import SignIn from "$lib/components/SignIn.svelte";
  import Header from "$lib/components/Header.svelte";
  import Spinner from "$lib/components/Spinner.svelte";
</script>

<div class="px-4">
  {#await user.known}
    <div class="grid place-items-center h-screen">
      <Spinner size="12" />
    </div>
  {:then _}
    {#if $user === null}
      <SignIn />
    {:else}
      <Header />
      <slot />
    {/if}
  {/await}
</div>
