<script>
  export let type = "";
</script>
<div
  class="badge"
  class:badge--size={type === "small"}
  aria-hidden="true"
>
  {#if type !== "small"}
    <slot />
  {/if}
</div>
<style>
  .badge {
    background-color: #2a508f;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
      Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: .75rem;
    font-weight: 400;
    line-height: 1;
    display: flex;
    height: 1rem;
    min-width: 1rem;
    padding: 0 .25rem;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: .5rem;
    position: absolute;
    top: 0;
    right: 0;
  }
</style>