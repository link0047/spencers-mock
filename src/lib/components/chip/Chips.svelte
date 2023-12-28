<script>
  export let label = "";
</script>
<div 
	class="chips" 
	role="grid" 
	aria-label={label} 
	{...$$restProps}
>
  <slot />
</div>
<style>
  .chips {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    position: relative;
    gap: 8px;
  }

  .chips:empty {
    display: none;
  }
</style>