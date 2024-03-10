<script lang="ts">
  let transitioning: boolean = false;
  let message: string = "no state";
  let styling: string = "";
  let position: { x: number, y: number } | null = null;
  let direction: "left" | "right" | null = null;
  let move: number = 0;

  // Define types for position and event objects
  type Position = { x: number, y: number };
  type PointerEvent = { pageX: number, pageY: number };
  interface Distance {
    x: number;
    y: number;
  }

  // Function to get position from pointer event
  function getPosition({ pageX, pageY }: PointerEvent): Position {
    return { x: pageX, y: pageY };
  }

  // Function to calculate distance between two positions
  function calculateDistance(pos1: Position, pos2: Position): Distance {
    const deltaX = pos2.x - pos1.x;
    const deltaY = pos2.y - pos1.y;
    
    return {
      x: deltaX,
      y: deltaY
    };
  }

  // Function to prevent context menu
  function preventContextMenu(event: MouseEvent) {
    event.preventDefault();
  }

  function handlePointerDown(event: PointerEvent) {
    transitioning = true;
    position = getPosition(event);
    message = `Down ${position.x}, ${position.y}`;
  }

  function handlePointerMove(event: PointerEvent) {
    if (!transitioning || !position) return;

    const currentPosition = getPosition(event);
    direction = position.x > currentPosition.x ? "left" : "right";

    const distance = calculateDistance(position, currentPosition);

    move += Math.round(distance.x) * -1;

    styling = `transition:none;transform:translate3d(${move}px,0,0)`;
    position = currentPosition;

    message = `Move distance: {x:${distance.x}, y:${distance.y}} position: {x:${currentPosition.x}, y:${currentPosition.y}}`
  }

  function handlePointerUp(event: PointerEvent) {
    transitioning = false;
    const currentPosition = getPosition(event);
    const distance = calculateDistance(position, currentPosition);
    // move = currentPosition.x;
    message = `Up distance: {x:${distance.x}, y:${distance.y}} position: {x:${currentPosition.x}, y:${currentPosition.y}}`
  }

  const slides: number[] = [1,2,3,4,5,6,7,8,9,10];
  const boxes: number[] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
</script>
<header class="header">
  Test Carousel
</header>
<div
  class="carousel"
  aria-roledescription="carousel"
  role="region"
  on:pointerup={handlePointerUp}
  on:pointermove={handlePointerMove}
  on:pointerdown={handlePointerDown}
  on:contextmenu={preventContextMenu}
>
  <div class="carousel__viewport">
    <div class="carousel__track" style={styling}>
      {#each slides as slide}
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
{#each boxes as box} 
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