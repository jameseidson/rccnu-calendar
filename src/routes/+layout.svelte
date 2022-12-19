<script>
  import "../app.css";

  import { user } from "$lib/utilities/stores";
  import SignIn from "$lib/components/SignIn.svelte";
  import Header from "$lib/components/Header.svelte";
</script>

{#await user.known}
  <h1>Awaiting Login</h1>
{:then _}
  {#if $user === null}
    <SignIn />
  {:else}
    <Header />
    <slot />
  {/if}
{/await}
