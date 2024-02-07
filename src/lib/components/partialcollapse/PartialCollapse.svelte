<script>
	import generateId from "$lib/client/util/local-unique-id-generator.js";
	import { onMount } from "svelte";
	export let open = false;
	export let label = "";

	const uid = generateId("collapsible");
	const id = `uikit-collapsible-${uid}`;
	const contentId = `${id}-content`;

	let contentRef;
	let showReadMore = false;

	function handleClick() {
		if (!showReadMore) return;
		open = !open;
	}
	
	onMount(() => {
		const rect = contentRef.getBoundingClientRect();
		
		showReadMore = rect.height > 16*1.4*2;
	});
</script>
<div class="collapsible" {...$$restProps}>
	<button 
		class="collapsible__heading"
		type="button"
		aria-expanded={open}
		aria-controls={contentId}
		aria-label={label}
		style={open ? "height:auto;overflow:initial" : null }
		on:click={handleClick}
		data-expandable={showReadMore}
	>
		<div 
			bind:this={contentRef} 
			class="collapsible__content" 
			id={contentId}
		>
			<slot name="content"/>
		</div>
		{#if showReadMore}
		<div class="collapsible__actionLabel">{open ? "Read less" : "Read more"}</div>
		{/if}
	</button>
</div>

<style>
	.collapsible__heading {
		-webkit-tap-highlight-color: transparent;
		position: relative;
		box-sizing: border-box;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
		font-size: 1rem;
		color: #111;
		border: 0;
		border-radius: 4px;
		background-color: transparent;
		margin: 0;
		padding: 0;
		height: 2.8rem;
		overflow: hidden;
		touch-action: manipulation;
    user-select: none;
    appearance: none;
	}
	
	.collapsible__heading[data-expandable="true"] {
    cursor: pointer;
  }

	.collapsible__heading:focus-visible {
		outline: 2px solid #111;
	}
	
	.collapsible__content {
		position: relative;
		line-height: 1.4rem;
		text-align: left;
	}

	.collapsible__actionLabel {
		position: absolute;
		right: 0;
		bottom: 0;
		text-decoration: underline;
		background-color: #fff;
		padding: 4px;
		color: #285bc7;
	}

	.collapsible__heading[aria-expanded="true"] .collapsible__actionLabel {
		bottom: -1.2rem;
		background-color: transparent;
	}

	.collapsible__actionLabel:focus,
	.collapsible__actionLabel:hover {
		color: #1c3f8b;
	}

	@media (max-width: 560px) {
		.collapsible__heading {
			font-size: .875rem;
			height: 2.4rem;
		}

		.collapsible__content {
			line-height: 1.2rem;
		}
	}
</style>