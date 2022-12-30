<script lang="ts">
  import "../app.css";
  import { googleSignOut, user } from "$lib/utilities/auth";
  import SignIn from "$lib/components/SignIn.svelte";
  import Header from "$lib/components/Header.svelte";
  import Spinner from "$lib/components/Spinner.svelte";
  import PageMessage from "$lib/components/PageMessage.svelte";
</script>

<div class="w-11/12 m-auto">
  {#await user.known}
    <div class="grid place-items-center h-screen">
      <Spinner size="12" />
    </div>
  {:then _}
    {#if $user === null}
      <SignIn />
    {:else if !$user.email || !$user.email.endsWith("@u.northwestern.edu")}
      <PageMessage>
        You must sign in with your Northwestern gmail account to see available
        climbs.
        <button class="btn btn-error mt-4" on:click={googleSignOut}>
          Sign Out
        </button>
      </PageMessage>
    {:else}
      <Header />
      <slot />
    {/if}
  {/await}
</div>
