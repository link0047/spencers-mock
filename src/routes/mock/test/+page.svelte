<script lang="ts">
  export let data;
  let { isMobile } = data;

  let ref: HTMLDivElement;
  let x: number = 0;
  let y: number = 0;
  let state: "idle" | "focused" | "transitioning" | "zoomedIn" = "idle";
  let userIntendsToView: boolean = false;
  let loaded: boolean = false;
  let lastTap = 0;

  const imageSize = isMobile ? 320 : 640;

  let src = `https://spencers.scene7.com/is/image/Spencers/07841158-a?wid=${imageSize}&hei=${imageSize}&fmt=webp`;
  let detailedSrc = "https://spencers.scene7.com/is/image/Spencers/07841158-a?wid=2000&hei=2000&fmt=webp";
  let alt = "Who's your Daddy";

  function handleFocus(event: Event) {}
  function handleKeyDown(event: KeyboardEvent) {}
  function handlePointerEnter(event: PointerEvent) {}
  function handlePointerDown(event: PointerEvent) {
    if (event.pointerType === "touch") {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;
      if (tapLength < 300 && tapLength > 0) {
        userIntendsToView = true;
        state = "zoomedIn"
      } else {
        lastTap = currentTime;
      }
    }
  }
  
  function handlePointerMove(event: PointerEvent) {

  }

  function handlePointerUp(event: PointerEvent) {

  }

  function detailedImageLoaded() {

  }
</script>

<div
	bind:this={ref}
	data-state={state}
	class="zoomviewer"
	role="button"
  aria-label="Zoom viewer"
	on:focus={handleFocus}
	on:pointerdown={handlePointerDown}
	on:pointermove={handlePointerMove}
	on:pointerup={handlePointerUp}
	on:pointerenter={handlePointerEnter}
	on:keydown={handleKeyDown}
	tabindex="0"
>
  <img 
		class="zoomviewer__image"
		loading="eager"
		width={imageSize}
		height={imageSize}
		decoding="async"
		draggable="false"
		{src}
		{alt}
	/>
	<img 
		class="zoomviewer__detailed-image"
		loading="eager"
		width={imageSize}
		height={imageSize}
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
		border: 1px solid transparent;
	}

	[data-state="zoomedIn"].zoomviewer {
		border-color: #000;
	}

	.zoomviewer:focus-visible {
		outline: 2px solid #0570de;
	}

	.zoomviewer__image {
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

	[data-state="zoomedIn"] .zoomviewer__image {
		opacity: 0;
	}

	[data-state="zoomedIn"] .zoomviewer__detailed-image {
		opacity: 1;
		pointer-events: initial;
		cursor: zoom-out;
	}
</style>