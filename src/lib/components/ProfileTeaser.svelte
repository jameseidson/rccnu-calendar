<script lang="ts">
  export let photoURL: string;
  export let displayName: string;
</script>

<span class="align-middle whitespace-nowrap">
  <span class="avatar align-middle">
    <div class="w-6 rounded-full">
      <img src={photoURL} alt="profile icon" />
    </div>
  </span>

  <strong class="align-middle">
    {displayName}
  </strong>
</span>
