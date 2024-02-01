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
		position: relative;
		box-sizing: border-box;
		border: 0;
		background-color: transparent;
		margin: 0;
		padding: 0;
		height: 2.8rem;
		overflow: hidden;
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
	}
</style>