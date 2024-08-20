<script>
	import { getContext } from "svelte";
	
	export let open = false;
	export let closeDelay = 250;

	const state = getContext("state");
	let ref;
	
	state.subscribe(isDrawerOpen => {
		if (open && !isDrawerOpen) {
			setTimeout(() => {
				open = false;
			}, closeDelay);
		}
	});

	$: if (open) {
		if (ref) ref.inert = false;
	} else {
		if (ref) ref.inert = true;
	}
</script>
<div
	bind:this={ref}
	class="drawer__panel"
	class:drawer__panel--open={open}
>
	{#if $$slots.header}
		<header class="drawer__panel-header">
			<slot name="header" />
		</header>
	{/if}
	<slot />
</div>

<style>
	.drawer__panel {
	  position: absolute;
	  background-color: var(--uikit-drawer-bg-color);
	  font-family: var(--uikit-drawer-font-family);
	  height: 100%;
	  width: 100%;
	  top: 0;
	  left: 0;
		right: 0;
		bottom: 0;
	  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	  opacity: 0;
		pointer-events: none;
		z-index: 1;
	}

	.drawer__panel-header {
	  position: relative;
	  display: flex;
	  flex-flow: row wrap;
	  align-items: center;
	  border-bottom: 1px solid #DFDFDF;
		height: 3rem;
		box-sizing: border-box;
	  padding: var(--uikit-drawer-header-padding);
	  gap: var(--uikit-drawer-header-gap);
	}

	.drawer__panel--open {
		/* transform: translate3d(0, 0, 0); */
		pointer-events: initial;
		opacity: 1;
	}
</style>