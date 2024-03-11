<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import generateId from "$lib/client/util/local-unique-id-generator.js";
  import { browser } from "$app/environment";

  let loop: boolean = false;
  let gap: number = 8;
  let slidesPerView:number = 3;

  let transitioning: boolean = false;
  let atResetPoint: boolean = false;
  let message: string = "no state";
  let styling: string = "";
  let position: { x: number, y: number } | null = null;
  let direction: "left" | "right" | null = null;
  let carouselOffset: number = 0;
  let observer: IntersectionObserver | null = null;
  let carouselRef: HTMLDivElement | null = null;
  let carouselTrackRef: HTMLDivElement | null = null;
  let slideIndex: number = 0;
  let slides: HTMLDivElement[] = [];
  let slideBreakpoints: {x: number}[] = [];
  let startResetIndex: number = -1;
  let lastResetIndex: number = 0;


  const uid = generateId("carousel");
	const id = `uikit-carousel-${uid}`;
	const trackId = `${id}-track`;
  
  type PointerEvent = { pageX: number, pageY: number };
  /**
   * Represents a position with x and y coordinates.
   */
  interface Position {
    x: number;
    y: number;
  }

  /**
   * Represents the distance between two positions with deltaX and deltaY.
   */
  interface Distance {
    x: number;
    y: number;
  }

  /**
   * Gets the position from a pointer event.
   * @param {PointerEvent} event - The pointer event.
   * @returns {Position} - The position extracted from the pointer event.
   */
  function getPosition({ pageX, pageY }: PointerEvent): Position {
    return { x: pageX, y: pageY };
  }

  /**
   * Calculates the distance between two positions.
   * @param {Position} pos1 - The first position.
   * @param {Position} pos2 - The second position.
   * @returns {Distance} - The distance between the two positions.
   */
  function calculateDistance(pos1: Position, pos2: Position): Distance {
    const deltaX = pos2.x - pos1.x;
    const deltaY = pos2.y - pos1.y;

    return {
      x: deltaX,
      y: deltaY
    };
  }

  /**
   * Finds the point in the array that is closest to the given number.
   * @param {number} target - The number to which the closest point is sought.
   * @param {Array<{ x: number }>} points - Array of points with x-coordinates.
   * @returns {{ x: number, index: number }} - The point in the array closest to the given number and its index.
   */
  function closestPoint(target: number, points: { x: number }[]): { x: number, index: number } {
    if (!points || points.length === 0) {
      throw new Error('Points array is empty');
    }

    // Initialize closest point and its index
    let closest = points[0];
    let closestIndex = 0;

    // Initialize minimum distance with the distance to the first point
    let minDistance = Math.abs(target - closest.x);

    // Loop through the rest of the points
    for (let i = 1; i < points.length; i++) {
      const currentDistance = Math.abs(target - points[i].x);

      // If the current point is closer, update closest point and distance
      if (currentDistance < minDistance) {
        closest = points[i];
        closestIndex = i;
        minDistance = currentDistance;
      }
    }

    // Return the closest point and its index
    return { x: closest.x, index: closestIndex };
  }


  /**
   * Function to prevent context menu.
   * @param {MouseEvent} event - The mouse event.
   */
  function preventContextMenu(event: MouseEvent) {
    event.preventDefault();
  }

  /**
   * Handles the intersection observer entries.
   * @param {IntersectionObserverEntry[]} entries - The array of intersection observer entries.
   * @param {IntersectionObserver} observer - The intersection observer instance.
   */
  function handleIntersect(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    entries.forEach(entry => {
      slideBreakpoints.push({ x: entry.boundingClientRect.left - gap });
    });
    
    observer.disconnect();
  }

  function applyCarouselStyles() {
		const slideWidth = `calc((100% - ${(slidesPerView - 1) * gap}px) / ${slidesPerView})`;
		const slideMargin = `${gap}px`;
    if (browser) {
      const styleElement = document.createElement("style");
      styleElement.textContent = `.carousel .carousel__slide{flex: 0 0 ${slideWidth}}`;
      document.head.appendChild(styleElement);
    }
	}

  /**
   * Navigates to the previous slide.
   */
  function prevSlide() {
    if (transitioning) return;
    console.log("prev", slideIndex);
    // Decrement slide index and navigate to the previous slide with the "right" direction
    gotoSlide(Math.floor(--slideIndex), "right");
  }

  /**
   * Navigates to the next slide.
   */
  function nextSlide() {
    if (transitioning) return;
    console.log("next", slideIndex);
    // Increment slide index and navigate to the next slide with the "left" direction
    gotoSlide(Math.ceil(++slideIndex), "left");
  }

  /**
   * Function to navigate to a specific slide.
   * @param {number} index - The index of the slide.
   * @param {"left" | "right"} direction - The direction of navigation.
   */
  function gotoSlide(index: number, direction: "left" | "right")  {
    const endIndex = (carouselTrackRef as HTMLElement)?.childElementCount - slidesPerView;

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
      console.log(direction);
      return;
    }

    if (!slideBreakpoints.length) return;
    transitioning = true;
    const x = slideBreakpoints[index].x * -1
    styling = `transition:.3s;transform:translate3d(${x}px,0,0)`;
    slideIndex = index;
    carouselOffset = x;
  }

  /**
   * Handles the pointer down event.
   * @param {PointerEvent} event - The pointer event.
   */
  function handlePointerDown(event: PointerEvent) {
    transitioning = true;
    position = getPosition(event);

    if (browser) {
      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);
    }

    message = `Down position: {x:${position.x}, y:${position.y}}`;
  }

  /**
   * Handles the pointer move event.
   * @param {PointerEvent} event - The pointer event.
   */
  function handlePointerMove(event: PointerEvent) {
    if (!transitioning || !position) return;

    const currentPosition = getPosition(event);
    direction = position.x > currentPosition.x ? "left" : "right";

    const distance = calculateDistance(position, currentPosition);

    carouselOffset += Math.round(distance.x);

    styling = `transition:none;transform:translate3d(${carouselOffset}px,0,0)`;
    position = currentPosition;

    message = `Move distance: {x:${distance.x}, y:${distance.y}} position: {x:${currentPosition.x}, y:${currentPosition.y}}`
  }

  /**
   * Handles the pointer up event.
   */
  function handlePointerUp() {
    transitioning = false;
    const offset = carouselOffset > 0 ? carouselOffset : carouselOffset * -1;
    const breakpoints = slidesPerView > 1 ? slideBreakpoints.slice(0, slides.length - slidesPerView + 1) : slideBreakpoints;
    const snapPoint = (direction === "right" && slideIndex === 0)
      ? { x: 0, index: 0 }
      : closestPoint(offset, breakpoints);

    console.log(breakpoints);  
    const x = snapPoint.x * -1;

    styling = `transition:.3s;transform:translate3d(${x}px,0,0)`;
    carouselOffset = x;
    slideIndex = snapPoint.index ? snapPoint.index : 0;

    if (browser) {
      document.removeEventListener("pointermove", handlePointerMove);
		  document.removeEventListener("pointerup", handlePointerUp);
    }

    message = `Up direction: ${direction} snap point: {x: ${snapPoint.x}, index: ${snapPoint.index}}`;
  }

  /**
   * Handles the transition end event.
   */
  function handleTransitionEnd() {
		transitioning = false;
		if (slideIndex === startResetIndex || slideIndex === lastResetIndex) {
			atResetPoint = true;
		}
	}

  applyCarouselStyles();
  const slidesData: number[] = [1,2,3,4,5,6,7,8,9,10];
  const boxesData: number[] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];

  onMount(() => {
    const track = carouselTrackRef as HTMLDivElement;
    observer = new IntersectionObserver(handleIntersect, { 
      root: carouselRef, 
      rootMargin: "0px",
      threshold: .5
    });
    slides = Array.from(track.children) as HTMLDivElement[];
    slides.forEach(slide => observer!.observe(slide));
    startResetIndex = -1;
    lastResetIndex = track?.childElementCount - slidesPerView;
  });

  onDestroy(() => {
    if (browser) {
      document.removeEventListener("pointermove", handlePointerMove);
		  document.removeEventListener("pointerup", handlePointerUp);
    }
  })
</script>

<header class="header">
  Test Carousel
</header>
<div
  bind:this={carouselRef}
  {id}
  class="carousel"
  aria-roledescription="carousel"
  role="region"
  on:contextmenu={preventContextMenu}
>
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
    </div>
    <div 
      bind:this={carouselTrackRef}
      id={trackId} 
      class="carousel__track" 
      style={styling}
      on:pointerdown={handlePointerDown}
      on:transitionend={handleTransitionEnd}
    >
      {#each slidesData as slide}
        <div class="carousel__slide">
          <div class="box">
            {slide}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
<div class="carousel-message">{message}</div>
<div class="grid grid-2-col">
{#each boxesData as box} 
  <div class="box">
    {box}
  </div>
{/each}
</div>
<style>
  .header {
    display: flex;
    align-items: center;
    padding-inline: 8px;
    border-bottom: 1px solid #ccc;
    background-color: #f2f2f2;
    box-sizing: border-box;
    height: 54px;
  }

  .carousel-message {
    font-size: .875rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

  .carousel {
    position: relative;
    touch-action: pan-y;
  }

  .carousel__viewport {
    position: relative;
    width: 100%;
    overflow: hidden;
    padding: 8px;
  }

  .carousel__track {
    display: flex;
    gap: 8px;
    transition: transform .3s;
  }

  .carousel__slide {
    user-select: none;
    /* flex-grow: 0;
    flex-shrink: 0;
    flex-basis: auto; */
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
		background-color: #fff;
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

  .icon {
    width: 24px;
    height: 24px;
    fill: #212121;
  }

  .grid {
    display: grid;
    gap: 8px;
  }

  .grid-2-col {
    grid-template-columns: auto auto;
  }

  .box {
    user-select: none;
    border: 2px solid;
    border-radius: 8px;
    aspect-ratio: 1 / 1;
  }
</style>