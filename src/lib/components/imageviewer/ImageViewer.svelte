<script lang="ts">
	import { onDestroy } from "svelte";
	/**
   * @typedef {Object} Props
   * @property {string} src - Source URL for the thumbnail image.
   * @property {string} detailedSrc - Source URL for the detailed image.
   * @property {string} alt - Alternate text for the images.
   */

  /** @type {Props} */
	export let src = "";
	export let detailedSrc = "";
	export let alt = "";
	export let enableDoubleTapZoom = false;
	
	/** @type {HTMLDivElement|null} */
	let ref: HTMLDivElement;
	let state = "idle";
	let x = 0;
	let y = 0;
	let tapDelay = 250;
	let lastTapTime = 0;
	let userInteracted = false;
	let userIntendsToView = false;
	let userIntendsToZoomIn = false;
	let detailedImageHasLoaded = false;

	/**
   * Zoom out the detailed image.
   */
	function zoomOut() {
		state = "idle";
		x = 0;
		y = 0;
		document.removeEventListener("click", handleClick);
	}

	/**
	 * Handle click events, either inside or outside the zoomed-in image area.
	 * @param {MouseEvent} event
	 */
	function handleClick(event) {
		if (!ref.contains(event.target)) {
			zoomOut();
		} else {
			if (userInteracted) {
				zoomOut();
				userInteracted = false;
				return;
			}
			
			userInteracted = true;
		}
	}

	/**
   * Handle keydown events.
   * @param {KeyboardEvent} event
   */
	function handleKeyDown(event) {
		const { key } = event;
	}

	/**
   * Handle focus on the image viewer.
   */
	function handleFocus() {
		userIntendsToView = true;
	}

	/**
   * Handle pointer enter events.
   * @param {PointerEvent} event
   */
	function handlePointerEnter(event) {
		if (event.pointerType === "mouse") {
			userIntendsToView = true;
		}
	}

	/**
   * Handle pointer down events.
   * @param {PointerEvent} event
   */
	function handlePointerDown(event) {
		if (event.pointerType === "touch") {
			const currentTime = new Date().getTime();
			if ( currentTime - lastTapTime < tapDelay) {
				console.log("double tap");
			}
			lastTapTime = currentTime;			
			userIntendsToView = true;
		}

		x = event.offsetX;
		y = event.offsetY;
		console.log("down", {x, y});
	}

	/**
   * Handle pointer move events.
   * @param {PointerEvent} event
   */
	function handlePointerMove(event) {
		event.preventDefault();
		if (state !== "zoomedIn") return;
		
		x = event.offsetX;
		y = event.offsetY;
		console.log("move",{x, y});
	}

	/**
   * Handle pointer up events.
   * @param {PointerEvent} event
   */
	function handlePointerUp(event) {
		if (!detailedImageHasLoaded) {
			userIntendsToZoomIn = true;
		} else {
			if (enableDoubleTapZoom) return;
			state = "zoomedIn";
			document.addEventListener("click", handleClick);
		}
		console.log("up",{x, y});
	}
	
	/**
   * Callback for when the detailed image has loaded.
   */
	function detailedImageLoaded() {
		detailedImageHasLoaded = true;
		if (userIntendsToZoomIn) {
			if (enableDoubleTapZoom) return;
			state = "zoomedIn";
			document.addEventListener("click", handleClick);
		}
	}

	/** @type {DestroyCallback} */
	function cleanup() {
		document.removeEventListener("click", handleClick);
	}

	onDestroy(cleanup);
</script>

<div
	bind:this={ref}
	data-state={state}
	class="imageviewer"
	role="button"
  aria-label="Image viewer"
	on:focus={handleFocus}
	on:pointermove={handlePointerMove}
	on:pointerdown={handlePointerDown}
	on:pointerup={handlePointerUp}
	on:pointerenter={handlePointerEnter}
	on:keydown={handleKeyDown}
	tabindex="0"
>
	<img 
		class="imageviewer__image"
		loading="eager"
		width="640"
		height="640"
		decoding="async"
		draggable="false"
		{src}
		{alt}
	/>
	<img 
		class="imageviewer__detailed-image"
		loading="eager"
		width="640"
		height="640"
		decoding="async"
		draggable="false"
		data-src={detailedSrc}
		src={userIntendsToView ? detailedSrc : undefined}
		on:load={detailedImageLoaded}
		style={state === "zoomedIn" ? `transform-origin:${x}px ${y}px;transform:scale(2.33333)` : null}
		alt="{alt}(detailed version)"
	/>
	{#if enableDoubleTapZoom}
	<div class="imageviewer__label">Double tap to zoom</div>
	{/if}
</div>

<style>
	.imageviewer {
		position: relative;
		min-width: 320px;
		width: fit-content;
		box-sizing: border-box;
		border: 1px solid transparent;
		border-radius: 4px;
		overflow: hidden;
		touch-action: manipulation;
		user-select: none;
	}

	[data-state="zoomedIn"].imageviewer {
		border-color: #000;
	}

	.imageviewer:focus-visible {
		outline: 2px solid #0570de;
	}
	
	.imageviewer__image {
		display: block;
		width: 100%;
		height: auto;
		aspect-ratio: 1 / 1;
		cursor: zoom-in;
	}
	
	.imageviewer__detailed-image {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		display: block;
		transform: scale(1);
		transition: transform 0.12s ease-in-out 0s;
		pointer-events: none;
		opacity: 0;
		touch-action: manipulation;
		cursor: zoom-out;
	}

	[data-state="zoomedIn"] .imageviewer__image {
		opacity: 0;
	}

	[data-state="zoomedIn"] .imageviewer__detailed-image {
		opacity: 1;
		pointer-events: initial;
	}

	.imageviewer__label {
		position: absolute;
		top: 50%;
		left: 50%;
		opacity: 1;
		transform: translate3d(-50%, 250%, 0);
		animation: slideAndFadeIn .5s ease-out forwards;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #616161;
		color: #fff;
		font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol;
		font-size: .875rem;
		border-radius: 1rem;
		padding: 0 1rem;
		min-height: 32px;
	}

	@keyframes slideAndFadeIn {
    0% {
			opacity: 0;
			transform: translate3d(-50%, 250%, 0);
    }
    100% {
			opacity: 1;
			transform: translate3d(-50%, -50%, 0);
    }
	}	
</style>
