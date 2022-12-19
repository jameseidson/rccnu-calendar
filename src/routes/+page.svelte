<script lang="ts">
  import { googleSignOut } from "$lib/utilities/firebase";
</script>

<button on:click={googleSignOut} class="btn btn-primary">Sign Out</button>
