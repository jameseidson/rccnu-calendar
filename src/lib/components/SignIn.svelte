<script lang="ts">
  import { googleSignIn } from "$lib/utilities/firebase";
</script>

<button on:click={googleSignIn} class="btn btn-primary">Sign In</button>
