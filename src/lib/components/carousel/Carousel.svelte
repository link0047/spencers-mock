<script>
	import { onMount, onDestroy, afterUpdate } from "svelte";
	import IndicatorDots from "$lib/components/carousel/Indicator.svelte";
	import generateId from "$lib/client/util/local-unique-id-generator.js";
  import { browser } from "$app/environment";
	
	export let label = "Featured Items Carousel";
	export let slideIndex = 0
	export let orientation = "horizontal";
	export let gap = 8;
	export let loop = false;
	export let slidesPerView = 1;
	export let displayIndicator = false;

	const orientations = new Set(["horizontal","vertical"]);
	const uid = generateId("carousel");
	const id = `uikit-carousel-${uid}`;
	const trackId = `${id}-track`;
	let carouselRef;
	let carouselTrackRef;
	let atResetPoint = false;
	let transitioning = false;
	let touchStart = false;
	let trackStyles = "";
	let slideRects = [];
	let slides = [];
	let firstChildIndex;
	let lastChildIndex;
	let startResetIndex;
	let lastResetIndex;
	let len = 0;
	let move = 0;
	let position = null;
	let direction = null;
	let observer;
	let resizeObserver;
	
	if (!orientations.has(orientation)) {
		console.warn(`Invalid orientation "${orientation}" passed. Using default orientation "horizontal".`);
		variant = "horizontal";
	}

	function calculateDistance(pos1, pos2) {
		// Calculate the Euclidean distance between two points
		return Math.sqrt((pos2.x - pos1.x) ** 2 + (pos2.y - pos1.y) ** 2);
	}

  function isDecimal(num) {
    // Check if the number is not NaN and has a fractional part
    return !isNaN(num) && num % 1 !== 0;
  }
	
	function insertBefore(referenceNode, newNode) {
		// Insert newNode before referenceNode in the DOM
		referenceNode.parentNode.insertBefore(newNode, referenceNode);
	}
	
	function closestPoint(num, points) {
		// Find the point in the array closest to the given number
		return points.reduce((closest, current, currentIndex) => {
			const currentDistance = Math.abs(num - current.x);
			const closestDistance = Math.abs(num - closest.x);
			return currentDistance < closestDistance ? { x: current.x, idx: currentIndex } : closest;
		});
	}

	function getPosition({pageX, pageY }) {
		return {
			x: pageX,
			y: pageY
		};
	}

	function applyCarouselStyles() {
		const slideWidth = `calc((100% - ${(slidesPerView - 1) * gap}px) / ${slidesPerView})`;
		const slideMargin = `${gap}px`;
    if (browser) {
      const styleElement = document.createElement("style");
      styleElement.textContent = `.carousel .carousel__slide{margin-right:${slideMargin};flex: 0 0 ${slideWidth}}`;
      document.head.appendChild(styleElement);
    }
	}

	function generateClones() {
		
	}
	
	function prevSlide() {
		if (transitioning) return;
		gotoSlide(Math.floor(--slideIndex), "right");
	}
	
	function nextSlide() {
		if (transitioning) return;
		gotoSlide(Math.ceil(++slideIndex), "left");
	}
	
	export function gotoSlide(index, direction) {
		const endIndex = carouselTrackRef.childElementCount - 1;

		if (!loop) {
			if (index < 0) {
				slideIndex = 0;
				return;
			}
			
			if (index > endIndex) {
				slideIndex = endIndex;
				return;
			}
		}

		if (loop && atResetPoint) {
			const dir = direction === "left" ? -1 : 1;
			const reset = (index + 1 === startResetIndex || index - 1 === lastResetIndex) 
				? {idx: lastChildIndex, next: lastChildIndex + dir } 
				: {idx: firstChildIndex, next: firstChildIndex + dir };
			
			carouselTrackRef.style.transition = "none";
			carouselTrackRef.style.transform = `translate3d(${-slideRects[reset.idx].x}px,0,0)`;
			requestAnimationFrame(() => {
				carouselTrackRef.style.transition = "transform .3s";
				carouselTrackRef.style.transform = `translate3d(${-slideRects[reset.next].x}px,0,0)`;
				slideIndex = reset.next;
				move = -Number(slideRects[reset.next].x);
				atResetPoint = false;
			});
			return;
		} 
		
		if (!slideRects.length) return;
    console.log("index", index);
		const rect = { x: slideRects[index].x }; 
		transitioning = true;
		carouselTrackRef.style.transition = 'transform .3s';
		carouselTrackRef.style.transform = `translate3d(${-rect.x}px,0,0)`;
		slideIndex = index;
		move = -Number(rect.x);
	}
	
	function handleIntersect(entries, observer) {
		entries.forEach((entry, i) => {
			const rect = {
				x: (entry.boundingClientRect.width + gap) * i
			};
			slideRects.push(rect);
		});

		observer.disconnect();
	}
	
	function handleResize(entries) {
		for (const entry of entries) {
			// const rect = entry.contentRect;
			slideRects.length = 0;
			slides.forEach(slide => observer.observe(slide));
			
		}
	}
	
	function handleTransitionEnd() {
		transitioning = false;
		if (slideIndex === startResetIndex || slideIndex === lastResetIndex) {
			atResetPoint = true;
		}
	}
	
	function handlePointerDown(event) {
		touchStart = true;
		position = getPosition(event);
    if (browser) {
	  	document.addEventListener("pointermove", handlePointerMove);
	  	document.addEventListener("pointerup", handlePointerUp);
    }
	}
	
	function handlePointerMove(event) {
		if (!touchStart) return;
		if (loop && atResetPoint) {
			const index = slideIndex === startResetIndex ? lastChildIndex : firstChildIndex;
			carouselTrackRef.style.transition = "none";
			carouselTrackRef.style.transform = `translate3d(${-slideRects[index].x}px,0,0)`;
			slideIndex = index;
			move = -Number(slideRects[index].x);
			atResetPoint = false;
			return;
		}

		const currentPosition = getPosition(event);
		const dir = position.x > currentPosition.x ? -1 : 1;

		if (position.x < currentPosition.x) {
			direction = "right";
		} else if (position.x > currentPosition.x) {
			direction = "left";
		}

		const distance = calculateDistance(position, currentPosition);
		move += Math.round(distance) * dir;
		carouselTrackRef.style.transition = "none";
		carouselTrackRef.style.transform = `translate3d(${move}px,0,0)`;
		position = currentPosition;
	}
	
	function handlePointerUp(event) {
		if (direction) {
			const localMove = move > 0 ? move : move * -1;
			const currentPosition = (direction === "right" && slideIndex === 0)
				? { x: 0, idx: 0 }
				: closestPoint(localMove, slideRects.slice(0, slides.length));
			const x = currentPosition.x * -1;

			carouselTrackRef.style.transition = "transform .3s";
			carouselTrackRef.style.transform = `translate3d(${x}px,0,0)`;
			move = x;
			slideIndex = currentPosition.idx ? currentPosition.idx : 0;
		}

		touchStart = false;
		direction = null;
		document.removeEventListener("pointermove", handlePointerMove);
		document.removeEventListener("pointerup", handlePointerUp);
	}

	onMount(() => {
		applyCarouselStyles();
		slides = Array.from(carouselTrackRef.children);
		len = slides.length - 1;
		firstChildIndex = (loop) ? slidesPerView : 0;
		lastChildIndex = (loop) ? len - slidesPerView : len;
		startResetIndex = firstChildIndex - 1;
		lastResetIndex = carouselTrackRef.childElementCount - slidesPerView;
		slideIndex = firstChildIndex;
		observer = new IntersectionObserver(handleIntersect, { root: carouselRef, rootMargin: '0px', threshold: 0.5 });
		slides.forEach(slide => observer.observe(slide));
		resizeObserver = new ResizeObserver(handleResize);
		resizeObserver.observe(carouselRef);
	});

	onDestroy(() => {
		if (browser) {
		  document.removeEventListener("pointermove", handlePointerMove);
		  document.removeEventListener("pointerup", handlePointerUp);
    }
	})
</script>
<div
	bind:this={carouselRef}
	{id}
	class="carousel"
	data-orientation={orientation}
	aria-roledescription="carousel"
	aria-label={label}
	role="region"
>
	<div aria-live="polite" role="status">
		<h4 class="a11y-hide">
			"Slide "
			<span class="carousel__index">{slideIndex}</span>
		</h4>
	</div>
	<div class="carousel__viewport">
		<div class="carousel__controls">
			<button class="previous" aria-controls={trackId} aria-label="Previous Slide" on:click={prevSlide}>
				<svg class="icon" role="presentation" focusable="false" viewBox="0 0 24 24">
					<path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
				</svg>
			</button>
			<button class="next" aria-controls={trackId} aria-label="Next Slide" on:click={nextSlide}>
				<svg class="icon" role="presentation" focusable="false" viewBox="0 0 24 24">
					<path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
				</svg>
			</button>
			<div class="carousel__indicator">
				{#if displayIndicator}
					<IndicatorDots />
				{/if}
			</div>
		</div>
		<div 
		  bind:this={carouselTrackRef} 
			id={trackId} 
			class="carousel__track" 
			style={trackStyles.length ? trackStyles : null}
			on:pointerdown={handlePointerDown}
			on:transitionend={handleTransitionEnd}
		>
			<slot />
		</div>
	</div>
</div>

<style>
	:root {
		--dot-container-height: 12px;
	}

	.a11y-hide {
      position: absolute !important;
      height: 1px;
      width: 1px;
      overflow: hidden;
      clip: rect(1px 1px 1px 1px);
      clip: rect(1px, 1px, 1px, 1px);
      white-space: nowrap;
    }
	
	.carousel {
		position: relative;
	}
	
	.carousel__viewport {
		position: relative;
		width: 100%;
		overflow: hidden;
	}

	.carousel__track {
		display: flex;
		transition: transform .3s;
		padding: 0 0 var(--dot-container-height);
	}

	.carousel__indicator {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		z-index: 1;
		bottom: 0;
		width: 100%;
		pointer-events: none;
	}

	.previous {
		left: 2px;
	}

	.next {
		right: 2px;
	}

	.next,
	.previous {
		position: absolute;
    top: 50%;
		height: 40px;
		max-width: 40px;
		width: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		margin: 0;
		border: none;
		outline: 0;
    border-radius: 50%;
		z-index: 1;
		background-color: transparent;
		overflow: hidden;
		-ms-touch-action: manipulation;
		touch-action: manipulation;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		-webkit-appearance: none;
		appearance: none;
    box-shadow: 0 0.0625rem 0.125rem 0.0625rem #00000026;
		transition: background-color .3s ease-in-out;
	}

	.next:hover,
	.previous:hover {
		cursor: pointer;
		background-color: rgba(0, 0, 0, .2);
	}
</style>