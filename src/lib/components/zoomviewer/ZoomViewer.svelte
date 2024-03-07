<script>
	import { onDestroy } from "svelte";
	export let src = "";
	export let detailedSrc = "";
	import { browser } from "$app/environment";
	
	let ref;
	let x = 0;
	let y = 0;
	let state = "idle";
	let userIntendsToView = false;
	let loaded = false;

	function zoomOut({ target }) {
		if (browser) {
			if (!ref.contains(target)) {
				state = "idle";
				document.removeEventListener("click", zoomOut);
			}
		}
	}

	function handleFocus() {
		state = "focused"
		userIntendsToView = true;
	}
	
	function handlePointerMove({ offsetX, offsetY }) {
		x = offsetX;
		y = offsetY;
	}

	function handlePointerEnter() {
		userIntendsToView = true;
	}

	function detailedImageLoaded() {
		loaded = true;
	}

	function handlePointerDown(event) {

		if (browser && loaded) {
			document.addEventListener("click", zoomOut);
		}
	}

	function handlePointerUp() {
		if (state === "idle" || state === "focused") {
			state = "zoomedIn";
		} else if (state === "zoomedIn") {
			state = "idle";
			document.removeEventListener("click", zoomOut);
		}
	}

	function handleKeyDown({ key }) {
		if (key === "+" || key === "=") {
			if (browser && loaded) {
				state = "zoomedIn";
				document.addEventListener("click", zoomOut);
			} else {
				userIntendsToView = true;
			}
		}

		if (state === "zoomedIn") {
			switch (key) {
				case "ArrowUp":
					y -= 23;
					break;
				case "ArrowDown":
					y += 23;
					break;
				case "ArrowLeft":
					x -= 23;
					break;
				case "ArrowRight":
					x += 23;
					break;
				case "-":
					state = "idle";
					break;
				default:
					break;
			}
      
    }
	}

	onDestroy(() => {
		if(browser) {
			document.removeEventListener("click", zoomOut);
		}
	})
</script>
<div
	bind:this={ref}
	data-state={state}
	class="zoomviewer"
	role="button"
  aria-label="Zoom viewer"
	on:focus={handleFocus}
	on:pointermove={handlePointerMove}
	on:pointerdown={handlePointerDown}
	on:pointerup={handlePointerUp}
	on:pointerenter={handlePointerEnter}
	on:keydown={handleKeyDown}
	tabindex="0"
>
	<img 
		class="zoomviewer__image"
		loading="eager"
		width="640"
		height="640"
		decoding="async"
		{src}
		alt=""
	/>
	<img 
		class="zoomviewer__detailed-image"
		loading="eager"
		width="640"
		height="640"
		decoding="async"
		data-src={detailedSrc}
		src={userIntendsToView ? detailedSrc : undefined}
		on:load={detailedImageLoaded}
		style={state === "zoomedIn" ? `transform-origin:${x}px ${y}px;transform:scale(2.33333)` : null}
		alt=""
	/>
</div>
<style>
	.zoomviewer {
		position: relative;
		width: fit-content;
		box-sizing: border-box;
		background-color: #fff;
		border: 1px solid transparent;
		border-radius: 4px;
		overflow: hidden;
	}

	[data-state="zoomedIn"].zoomviewer {
		border-color: #000;
	}

	.zoomviewer:focus-visible {
		outline: 2px solid #0570de;
	}

	.zoomviewer:hover {
		/* border-color: #111; */
	}

	.zoomviewer__image {
		min-width: 320px;
		width: 100%;
		opacity: 1;
		cursor: zoom-in;
		object-fit: contain;
		object-position: top;
		display: block;
		aspect-ratio: 1 / 1;
	}
	
	.zoomviewer__detailed-image {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
		z-index: 1;
		pointer-events: none;
		box-sizing: border-box;
		display: block;
		transform: scale(1);
		transition: transform 0.12s ease-in-out 0s;
		transform-origin: 98.8759% 12.5%;
		object-fit: contain;
		min-width: 300px;
	}

	[data-state="zoomedIn"] .zoomviewer__image {
		opacity: 0;
	}

	[data-state="zoomedIn"] .zoomviewer__detailed-image {
		opacity: 1;
		pointer-events: initial;
		cursor: zoom-out;
	}
</style>