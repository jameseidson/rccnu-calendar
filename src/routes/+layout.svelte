<script lang="ts">
  import "../app.css";
  import { user } from "$lib/utilities/auth";
  import { addProfile } from "$lib/utilities/database";
  import SignIn from "$lib/components/SignIn.svelte";
  import Header from "$lib/components/Header.svelte";
  import Spinner from "$lib/components/Spinner.svelte";

  // TODO: This is bugged, I think user will be null or undefined if it doesnt exist in database so this won't run
  $: if ($user !== null && $user !== undefined) addProfile($user);
</script>

<div class="w-11/12 m-auto">
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
