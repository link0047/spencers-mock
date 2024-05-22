<script lang="ts">
	import generateId from "$lib/client/util/local-unique-id-generator.js";
	import { onMount } from "svelte";
	
	export let open: boolean = false;
	export let label: string = "";
	export let readMoreText: string = "Read more";
  export let readLessText: string = "Read less";
	export let minimumContentHeightEm: number = 2;

	const uid: string = generateId("expandable-section");
	const id: string = `uikit-expandable-section-${uid}`;
	const contentId: string = `${id}-content`;

	let contentRef: HTMLDivElement;
	let showReadMore: boolean = false;

	function handleClick(): void {
		if (!showReadMore) return;
		open = !open;
	}
	
	onMount(() => {
		const { height } = contentRef.getBoundingClientRect();
		const lineHeightInPixels = parseFloat(getComputedStyle(contentRef).lineHeight);
    const minHeightInPixels = minimumContentHeightEm * lineHeightInPixels;
    showReadMore = height > minHeightInPixels;
	});
</script>
<div class="expandable-section">
	<button 
		class="expandable-section__controller"
		type="button"
		aria-expanded={open}
		aria-controls={contentId}
		aria-label={label}
		style={open ? `height:auto;overflow:initial;--line-count:${minimumContentHeightEm}` : `--line-count:${minimumContentHeightEm}` }
		data-expandable={showReadMore}
		on:click={handleClick}
		on:click
		on:blur
		on:focus
	>
		<div 
			bind:this={contentRef} 
			class="expandable-section__content" 
			id={contentId}
  		role="region"
		>
			<slot name="content"/>
		</div>
		{#if showReadMore}
			<div class="expandable-section__actionLabel">{open ? readLessText : readMoreText}</div>
		{/if}
	</button>
</div>

<style>
	:root {
		--line-height: 1.4rem;
		--line-count: 2;
	}

	.expandable-section__controller {
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
		height: calc(var(--line-height, 1.4rem) * var(--line-count));
		overflow: hidden;
		touch-action: manipulation;
    user-select: none;
    appearance: none;
	}
	
	.expandable-section__controller[data-expandable="true"] {
    cursor: pointer;
  }

	.expandable-section__controller:focus-visible {
		outline: 2px solid #111;
	}
	
	.expandable-section__content {
		position: relative;
		line-height: var(--line-height, 1.4rem);
		text-align: left;
	}

	.expandable-section__actionLabel {
		position: absolute;
		right: 0;
		bottom: 0;
		text-decoration: underline;
		background-color: #fff;
		padding: 4px;
		color: #285bc7;
	}

	.expandable-section__controller[aria-expanded="true"] .expandable-section__actionLabel {
		bottom: calc((var(--line-height, 1.4rem) - .2rem) * -1);
		background-color: transparent;
	}

	.expandable-section__actionLabel:focus,
	.expandable-section__actionLabel:hover {
		color: #1c3f8b;
	}

	@media (max-width: 560px) {
		.expandable-section__controller {
			font-size: .875rem;
			height: calc((var(--line-height, 1.4rem) - .2rem) * 2);
		}

		.expandable-section__content {
			line-height: calc(var(--line-height, 1.4rem) - .2rem);
		}
	}
</style>