<script>
	import generateId from "$lib/client/util/local-unique-id-generator";
	import Button from "$lib/components/button/Button-new.svelte";
	export let open = false;
	export let height = "";
	export let hasScrim = true;
	
	const uid = generateId("collapsible");
	const id = `uikit-collapsible-${uid}`;
	const buttonId = `${id}-button`;
	
	function handleClick() {
	  open = !open;
	}
</script>

<div 
	{id}
	role="region"
	class="collapsible"
	class:collapsible--hasScrim={hasScrim && height !== ""}
	aria-hidden={open}
	style={`--collapsible-height:${open ? "" : height || 0}`}
>
	<slot />
</div>
<Button id={buttonId} aria-expanded={open} aria-controls={id} variant="ghost" on:click={handleClick}>
	{ open ? "See less" : "See More" }
</Button>

<style>
	:root {
		--collapsible-height: auto;
	}
	
	.collapsible {
		position: relative;
		height: var(--collapsible-height, auto);
		overflow: hidden;
	}

	.collapsible--hasScrim:after {
		content: "";
    height: 1.2rem;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, hsla(0, 0%, 100%, 0), #fff);
    z-index: 1;
	}

	.collapsible--hasScrim[aria-hidden="true"]:after {
		opacity: 0;
		pointer-events: none;
	}

	.collapsible :global(.btn.btn--ghost) {
		color: #1957b4;
	}

	.collapsible :global(.btn.btn--ghost):hover {
		border-color: transparent!important;
		background-color: transparent!important;
		text-decoration: underline;
	}
</style>
