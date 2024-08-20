<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import { get } from "svelte/store";
  import { debounce } from "$lib/client/util/utilities";
	
  export let state;
	export let gap = 2;
  export let debounceDelay = 100; 

	const controller = new AbortController();
	let x = 0;
	let y = 0;
	let ref: HTMLDivElement;
	let raf: number;
	let anchor: HTMLElement | null;
	let tooltipRect: DOMRect;
	let open = get(state.open);

	const handleWindowResize = debounce(() => {
		if (raf) {
			window.cancelAnimationFrame(raf);
		}

		raf = window.requestAnimationFrame(updatePosition);
	}, debounceDelay) as (event: UIEvent) => void;

	function handleMouseEnter() {
		updatePosition();
		state.open.set(true);
	}
	
	function handleMouseLeave() {
		state.open.set(false);
	}

	function updatePosition() {
    if (!anchor || !tooltipRect) return;

		const anchorRect = anchor.getBoundingClientRect();
		const yWithGap = anchorRect.bottom + gap;
		
    x = (anchorRect.x + tooltipRect.width) > window.innerWidth 
      ? anchorRect.right - tooltipRect.width 
      : anchorRect.x;
		y = (yWithGap + tooltipRect.height) > window.innerHeight 
      ? anchorRect.top - tooltipRect.height - gap 
      : yWithGap;
	}

	state.open.subscribe(isOpen => {
		open = isOpen;
	});

	onMount(() => {
		anchor = document.getElementById(state.anchorId) as HTMLElement;
		tooltipRect = ref.getBoundingClientRect();

		if (anchor instanceof Element) {
			updatePosition();
			anchor.addEventListener("mouseenter", handleMouseEnter, { signal: controller.signal });
			anchor.addEventListener("mouseleave", handleMouseLeave, { signal: controller.signal });
		}
	}); 

	onDestroy(() => {
		controller.abort();
	});
</script>

<svelte:window on:resize={handleWindowResize} />

<div 
	bind:this={ref}
	id={state.id} 
	class="tooltip" 
	class:tooltip--open={ open }
	role="tooltip"
	style={`transform:translate3d(${x}px,${y}px,0)`}
>
	<slot />
</div>

<style>
:root {
	--uikit-tooltip-background-color: #3c4043;
	--uikit-tooltip-font-size: .75rem;
	--uikit-tooltip-font-color: #fff;
	--uikit-tooltip-padding: 0 .5rem;
	--uikit-tooltip-border-radius: 0.1875rem;
	--uikit-tooltip-transition-duration: .15s;
}

.tooltip {
	position: fixed;
	top: 0;
	left: 0;
	border-radius: var(--uikit-tooltip-border-radius);
	background-color: var(--uikit-tooltip-background-color);
	min-height: 1.5rem;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	font-size: var(--uikit-tooltip-font-size);
	color: var(--uikit-tooltip-font-color);
	display: inline-flex;
	align-items: center;
	padding: var(--uikit-tooltip-padding);
	line-height: 1;
	pointer-events: none;
	opacity: 0;
	transition: opacity var(--uikit-tooltip-transition-duration);
}

.tooltip--open {
	opacity: 1;
	pointer-events: initial;
}
</style>