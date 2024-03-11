<script lang="ts">
  import { onMount } from "svelte";

  let transitioning: boolean = false;
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


  // Function to prevent context menu
  function preventContextMenu(event: MouseEvent) {
    event.preventDefault();
  }

  function handleIntersect(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    entries.forEach((entry, i) => {
      slideBreakpoints.push({x: entry.boundingClientRect.width * i});
    });
    
    observer.disconnect();
  }

  function gotoSlide(index, direction) {

  }

  function handlePointerDown(event: PointerEvent) {
    transitioning = true;
    position = getPosition(event);
    message = `Down position: {x:${position.x}, y:${position.y}}`;
  }

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

  function handlePointerUp() {
    transitioning = false;
    const offset = carouselOffset > 0 ? carouselOffset : carouselOffset * -1;
    const snapPoint = (direction === "right" && slideIndex === 0)
      ? { x: 0, index: 0 }
      : closestPoint(offset, slideBreakpoints);
    const x = snapPoint.x * -1;

    styling = `transition:.3s;transform:translate3d(${x}px,0,0)`;
    carouselOffset = x;
    slideIndex = snapPoint.index ? snapPoint.index : 0;

    message = `Up direction: ${direction} snap point: {x: ${snapPoint.x}, index: ${snapPoint.index}}`;
  }

  const slidesData: number[] = [1,2,3,4,5,6,7,8,9,10];
  const boxesData: number[] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];

  onMount(() => {
    observer = new IntersectionObserver(handleIntersect, { 
      root: carouselRef, 
      rootMargin: "0px",
      threshold: .5
    });
    slides = Array.from((carouselTrackRef as HTMLDivElement).children) as HTMLDivElement[];
    slides.forEach(slide => observer!.observe(slide));
  });
</script>

<header class="header">
  Test Carousel
</header>
<div
  bind:this={carouselRef}
  class="carousel"
  aria-roledescription="carousel"
  role="region"
  on:pointerup={handlePointerUp}
  on:pointermove={handlePointerMove}
  on:pointerdown={handlePointerDown}
  on:contextmenu={preventContextMenu}
>
  <div class="carousel__viewport">
    <div 
      bind:this={carouselTrackRef}
      class="carousel__track" 
      style={styling}
    >
      {#each slidesData as slide}
        <div class="slide">
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

  .slide {
    user-select: none;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: auto;
  }

  .slide .box {
    width: 300px;
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