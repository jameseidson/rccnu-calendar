<script lang="ts">
  import type { UserInfo } from "firebase/auth";

  import ClimbList from "$lib/components/ClimbList.svelte";

  export let data: { profiles: { [key: string]: UserInfo } };
</script>

<div class="card bg-base-300 shadow-lg p-4 ">
  <ClimbList profiles={data.profiles} />
</div>
