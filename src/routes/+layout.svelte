<script lang="ts">
  import "../app.css";

  import { user } from "$lib/utilities/auth";
  import { addProfile, climbs } from "$lib/utilities/database";
  import SignIn from "$lib/components/SignIn.svelte";
  import Header from "$lib/components/Header.svelte";
  import Spinner from "$lib/components/Spinner.svelte";

  $: if ($user !== null && $user !== undefined) addProfile($user);
</script>

<div class="px-4">
  {#await Promise.all([user.known, climbs.known])}
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
