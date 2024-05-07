<script>
  export let current = false;
  export let href = undefined;
  export let title = undefined;
  export let disabled = false;
</script>

<li class="pagination__item">
  <a class="pagination__item-action"
    href={href}
    title={title}
    aria-disabled={disabled}
    aria-current={current ? 'page' : undefined}
    on:click
    on:focus
    on:blur>
    <slot />
    {#if current} 
      <span class="a11y-hide"> - current page</span>
    {/if}
  </a>
</li>
<style>
	.a11y-hide {
	  position: absolute !important;
	  width: 1px !important;
	  height: 1px !important;
	  padding: 0 !important;
	  margin: -1px !important;
	  overflow: hidden !important;
	  clip: rect(0, 0, 0, 0) !important;
	  border: 0 !important;
	}

	.pagination__item {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
  .pagination__item-action:visited,
  .pagination__item-action {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-decoration: none;
		background-color: #fff;
    color: #212121;
  }
  
  .pagination__item-action[aria-current="page"],
  .pagination__item-action:focus {
    box-shadow: inset 0 0 0 2px #2451b2;
    color: #15306a;
  }

  .pagination__item-action:not([disabled]):hover {
    background-color: #f2f2f2;
		box-shadow: inset 0 0 0 2px #212121;
  }

  @media (max-width:560px) {
    .pagination__item-action {
      width: 32px;
      height: 32px;
    }
  }
</style>