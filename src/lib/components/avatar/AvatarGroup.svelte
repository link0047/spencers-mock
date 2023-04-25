<script>
  export let stacked = false;
</script>

<div class="avatar-group" class:avatar-group--stacked={stacked} role="group">
  <slot />
</div>

<style>
  .avatar-group {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    gap: 8px;
  }

  .avatar-group--stacked {
    gap: 0;
  }

  .avatar-group--stacked :global(.avatar:not(:first-child)) {
    border: 4px solid #fff;
    margin-left: calc(-1.5rem * 1);
  }
</style>
