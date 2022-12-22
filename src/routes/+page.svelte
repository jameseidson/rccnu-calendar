<script lang="ts">
  import type { UserInfo } from "firebase/auth";

  import AddClimb from "$lib/components/AddClimb.svelte";
  import ClimbList from "$lib/components/ClimbList.svelte";

  export let data: { profiles: { [key: string]: UserInfo } };
</script>

<AddClimb />
<ClimbList profiles={data.profiles} />
