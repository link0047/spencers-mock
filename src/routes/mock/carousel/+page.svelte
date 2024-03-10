<script lang="ts">
  let transitioning: boolean = false;
  let message: string = "no state";
  let styling: string = "";
  let touchPosition: { x: number, y: number } | null = null;
  let direction: "left" | "right" | null = null;
  let move: number = 0;

  // Define types for position and event objects
  type Position = { x: number, y: number };
  type PointerEvent = { pageX: number, pageY: number };

  // Function to get position from pointer event
  function getPosition({ pageX, pageY }: PointerEvent): Position {
    return { x: pageX, y: pageY };
  }

  // Function to calculate distance between two positions
  function calculateDistance(pos1: Position, pos2: Position): number {
    return Math.sqrt((pos2.x - pos1.x) ** 2 + (pos2.y - pos1.y) ** 2);
  }

  // Function to prevent context menu
  function preventContextMenu(event: MouseEvent) {
    event.preventDefault();
  }

  function handlePointerDown(event: PointerEvent) {
    transitioning = true;
    touchPosition = getPosition(event);
    message = `Down ${touchPosition.x}, ${touchPosition.y}`;
  }

  function handlePointerMove(event: PointerEvent) {
    if (!transitioning || !touchPosition) return;

    const currentPosition = getPosition(event);
    direction = touchPosition.x > currentPosition.x ? "left" : "right";

    const distance = calculateDistance(touchPosition, currentPosition);
    move = Math.round(distance) * Math.sign(touchPosition.x - currentPosition.x);

    styling = `transition:none;transform:translate3d(${move}px,0,0)`;

    message = `Move ${currentPosition.x}, ${currentPosition.y}`;
  }

  function handlePointerUp(event: PointerEvent) {
    transitioning = false;
    const currentPosition = getPosition(event);

    move = currentPosition.x;
    message = `Up ${JSON.stringify(event)}`;
  }

  const slides: number[] = [1,2,3,4,5,6,7,8,9,10];
</script>

{message}
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
        <div class="box">
          {slide}
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .carousel {
    position: relative;
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

  .box {
    width: 400px;
    height: 400px;
    border: 2px solid;
    border-radius: 8px;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: auto;
  }
</style>