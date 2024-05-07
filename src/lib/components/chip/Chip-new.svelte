<script>
	import Icon from "$lib/components/icon";
	export let variant = "default";
	export let onClose = null;

	function isFunction(param) {
	  return typeof param === 'function';
	}

	function handleClick() {
		if (!isFunction(onClose)) return;
		onClose();
	}
</script>

<div 
	class="chip"
	class:chip--outlined={variant === "outlined"}
	{...$$restProps}
>
	<slot />
	{#if isFunction(onClose)}
	<button type="button" class="chip__action" on:click={handleClick}>
		<Icon>
			<path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"/>
		</Icon>
	</button>
	{/if}
</div>

<style>
	.chip {
		height: 32px;
		box-sizing: border-box;
		border-radius: 18px;
		line-height: 1;
		font-weight: 500;
  	display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0 12px;
		font-size: 0.8125rem;
		letter-spacing: .0178571429em;
  	color: #000000de;
		background-color: #f2f2f2;
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		appearance: none;
		cursor: pointer;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	}

	.chip:focus,
	.chip:hover {
		border-color: #000;
		box-shadow: inset 0 0 0 1px #000;
	}

	.chip--outlined {
		background-color: #fff;
		border: 2px solid #66676a;
	}

	.chip__action {
		box-sizing: border-box;
		align-items: center;
		justify-content: center;
    appearance: none;
		background-color: transparent;
		border: none;
		border-radius: 50%;
		color: #38393b;
		display: inline-flex;
		height: 32px;
		width: 32px;
		margin: 0;
		padding: 0;
		position: relative;
		touch-action: manipulation;
    user-select: none;
		transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
	}
</style>