<script lang="ts">
	import generateId from "$lib/client/util/local-unique-id-generator.js";
	export let open: boolean = false;
	
	const uid: string = generateId("accordion");
	const id: string = `uikit-accordion-${uid}`;
	const buttonId: string = `${id}-button`;
	const contentId: string = `${id}-content`;

  /**
   * Toggles the state of the accordion item between open and closed.
   * @function handleClick
   */
	function handleClick(): void {
		open = !open;
	}
</script>
<div class="accordion" class:open={open}>
	<button 
		type="button" 
		id={buttonId} 
		aria-controls={contentId} 
		aria-expanded={open} 
		class="accordion__button"
		on:click={handleClick}
	>
		<span>
			<slot name="label" />
		</span>
		<svg class="icon" focusable="false" role="presentation" viewBox="0 0 24 24">
			<path d="M7.41 8.58 12 13.17l4.59-4.59L18 10l-6 6-6-6 1.41-1.42Z"/>
		</svg>
	</button>
	<div 
		id={contentId} 
		role="region" 
		aria-labelledby={buttonId} 
		class="accordion__content"
	>
		<slot />
	</div>
</div>

<style>	
	.accordion {
		position: relative;
		border: 1px solid #c5c5c7;
		border-radius: .25rem;
		overflow: hidden;
	}

	.accordion__button {
		width: 100%;
		box-sizing: border-box;
		-webkit-tap-highlight-color: transparent;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
		font-size: .875rem;
    font-weight: 500;
    letter-spacing: .04em;
    line-height: 1.875rem;
    text-decoration: none;
    text-transform: initial;
    display: flex;
    align-items: center;
		justify-content: space-between;
    position: relative;
    height: 36px;
    padding: 0 .5rem;
    border: 1px solid transparent;
    border-top-left-radius: .25rem;
		border-top-right-radius: .25rem;
    background-color: #fff;
		color: #212121;
    overflow: hidden;
    cursor: pointer;
    touch-action: manipulation;
    user-select: none;
    appearance: none;
		transition: background-color .25s ease-in-out;
	}

	.accordion__button:focus-visible {
		outline: 2px solid #0052c9;
	}

	.accordion__button:hover {
		background-color: #f7f7f7;
	}

	.open .accordion__button {
		border-bottom: 1px solid #c5c5c7;
		background-color: #f7f7f7;
	}
	
	.accordion__content {
		display: none;
		padding: .5rem;
	}
	
	.open .accordion__content  {
		display: block;
	}

	.icon {
		width: 24px;
		height: 24px;
		fill: #212121;
		transition: transform .15s ease-in-out;
	}

	.open .icon {
		transform: rotate(180deg);
	}

</style>