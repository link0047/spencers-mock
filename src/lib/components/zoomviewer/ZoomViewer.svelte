<script lang="ts">
  import { onDestroy } from "svelte";
  export let src: string = "";
  export let detailedSrc: string = "";
  export let alt = "";
  import { browser } from "$app/environment";
  export let disableMoveCheck = false;
  export let loading: "lazy" | "eager" | null | undefined = "eager";
  export let priority: "auto" | "high" | "low" | null = null;

  let ref: HTMLDivElement;
  let x: number = 0;
  let y: number = 0;
  let state: "idle" | "focused" | "transitioning" | "zoomedIn" = "idle";
  let userIntendsToView: boolean = false;
  let loaded: boolean = false;

  console.log("zoomviewer", src);
  /**
   * Handles zooming out when clicking outside the component.
   * @param {MouseEvent} event - The MouseEvent object.
   */
  function zoomOut(event: MouseEvent): void {
    if (browser) {
      if (!ref.contains(event.target as Node)) {
        state = "idle";
        document.removeEventListener("click", zoomOut);
      }
    }
  }

  /**
   * Handles focusing on the component.
   */
  function handleFocus(): void {
    state = "focused";
    userIntendsToView = true;
  }

  /**
   * Handles moving the pointer inside the component.
   * @param {MouseEvent} event - The MouseEvent object.
   */
  function handlePointerMove(event: MouseEvent): void {
    if (state === "focused" || state === "idle" && !disableMoveCheck) {
      state = "transitioning";
      return;
    }
    x = event.offsetX;
    y = event.offsetY;
  }

  /**
   * Handles the pointer entering the component.
   */
  function handlePointerEnter(): void {
    userIntendsToView = true;
  }

  /**
   * Callback function for detailed image loaded event.
   */
  function detailedImageLoaded(): void {
    loaded = true;
  }

  /**
   * Handles pointer down event on the component.
   * @param {MouseEvent} event - The MouseEvent object.
   */
  function handlePointerDown(event: MouseEvent): void {
    ref.inert = false;
    if (browser && loaded) {
      if (state === "transitioning") {
        state = "idle";
      }
      document.addEventListener("click", zoomOut);
    }
  }

  /**
   * Handles pointer up event on the component.
   */
  function handlePointerUp(): void {
    if (state === "idle" || state === "focused") {
      state = "zoomedIn";
    } else if (state === "zoomedIn") {
      state = "idle";
      document.removeEventListener("click", zoomOut);
    } else if (state === "transitioning") {
      state = "idle";
      document.removeEventListener("click", zoomOut);
    }
  }

  /**
   * Handles key down event on the component.
   * @param {KeyboardEvent} event - The KeyboardEvent object.
   */
  function handleKeyDown(event: KeyboardEvent): void {
    if (event.key === "+" || event.key === "=") {
      if (browser && loaded) {
        state = "zoomedIn";
        document.addEventListener("click", zoomOut);
      } else {
        userIntendsToView = true;
      }
    }

    if (state === "zoomedIn") {
      switch (event.key) {
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
    if (browser) {
      document.removeEventListener("click", zoomOut);
    }
  });
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
	{@html `<img 
		class="zoomviewer__image"
		loading=${loading}
    fetchpriority=${priority}
		width="640"
		height="640"
		decoding="async"
		draggable="false"
		src=${src}
		alt=${alt}
	/>`}
	<img 
		class="zoomviewer__detailed-image"
		{loading}
    fetchpriority={priority}
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

	:global(.zoomviewer__image) {
		min-width: 320px;
		width: 100%;
		height: auto;
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
		width: 100%;
		height: 100%;
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

	:global([data-state="zoomedIn"] .zoomviewer__image) {
		opacity: 0;
	}

	[data-state="zoomedIn"] .zoomviewer__detailed-image {
		opacity: 1;
		pointer-events: initial;
		cursor: zoom-out;
	}
</style>