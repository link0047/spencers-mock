<script lang="ts">
	import Carousel from "$lib/components/carousel/Carousel.svelte";
	import CarouselSlide from "$lib/components/carousel/CarouselSlide.svelte";
	import ZoomViewer from "$lib/components/zoomviewer/ZoomViewer.svelte";
	import Button from "$lib/components/button/Button-new.svelte";
	import Icon from "$lib/components/icon/Icon.svelte";
	import { Dialog, DialogDismiss, useDialogState } from "$lib/components/dialog";

	interface Image {
		src: {
			desktop: string;
			mobile: string;
		};
		thumbnail: string;
		detailedSrc: string;
		alt: string
	}

	interface DoubleTapOptions {
		threshold?: number; // Time threshold for detecting double taps (in milliseconds)
	}

	export let images: Image[] = [];
	export let isMobile: boolean = false;
	export let index: number = 0;
	export let slidesPerView = {
		mobile: 1.5,
		desktop: 1
	};
	

	let carousel: Carousel;
	let selectedImageIndex: number = index;
	let lightboxSelectedImageIndex: number = 0;
	let lastTap: number = 0;
	const localSlidesPerView = isMobile ? slidesPerView.mobile : slidesPerView.desktop;

	if (!Array.isArray(images) || images.some(image => typeof image !== 'object' || !('src' in image))) {
    throw new Error('Invalid images prop provided');
  }

	function changeProduct(index: number) {
		carousel.gotoSlide(index, "left");
		selectedImageIndex = index;
	}

	function openLightBox() {
		lightboxSelectedImageIndex = selectedImageIndex;
		lightboxState.open.set(true);
	}

	/**
	 * Function to detect double taps on touch devices.
	 * @param {PointerEvent} event - The pointer event.
	 * @param {DoubleTapOptions} options - Options for detecting double taps.
	 */
	// function detectDoubleTap(event: PointerEvent, { threshold = 600 }: DoubleTapOptions = {}) {
	// 	if (event.pointerType !== 'touch') return; // Only handle touch events

	// 	const now = new Date().getTime();
	// 	const timesince = now - lastTap;
	// 	if (timesince < threshold && timesince > 0) {
	// 		// Double tap detected
	// 		console.log('Double tap detected!');
	// 	}
	// 	lastTap = now;
	// }

	const lightboxState = useDialogState();
</script>

<div class="product-gallery" aria-label="Product Gallery">
	<div class="product-gallery__thumbnails">
		{#each images as { thumbnail }, index}
			<button 
				class="product-gallery__btn" 
				type="button"
				data-state={selectedImageIndex === index ? "selected" : "unselected" }
				on:click={changeProduct.bind(null, index)}
			>
				<img class="product-gallery__thumbnail-image" src={thumbnail} loading="lazy" width="60" height="60" decoding="async" alt="Thumbnail {index + 1}"/>
			</button>
		{/each}
	</div>
	<div>
		<div class="product-gallery__controls">
			<Button variant="icon" elevation={1} aria-label="" on:click={openLightBox}>
				<Icon>
					<path d="m15.5 14 5 5-1.5 1.5-5-5v-.79l-.27-.28C12.59 15.41 11.11 16 9.5 16A6.5 6.5 0 0 1 3 9.5 6.5 6.5 0 0 1 9.5 3 6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.57 4.23l.28.27h.79m-6 0C12 14 14 12 14 9.5S12 5 9.5 5 5 7 5 9.5 7 14 9.5 14m2.5-4h-2v2H9v-2H7V9h2V7h1v2h2v1Z"/>
				</Icon>
			</Button>
		</div>
		<Carousel bind:slideIndex={selectedImageIndex} bind:this={carousel} slidesPerView={localSlidesPerView} displayIndicator={isMobile}>
			{#each images as { src, detailedSrc, alt }, index}
				<CarouselSlide>
					{#if isMobile}
						<button class="product-gallery__zoom-btn" type="button" on:click={openLightBox}>
							<img 
								class="product-gallery__image"
								loading="eager"
								width={ isMobile ? "320" : "640" }
								height={ isMobile ? "320" : "640" }
								decoding="async"
								draggable="false"
								src={ isMobile ? src.mobile : src.desktop }
								alt="Image {index + 1} of {alt}"
							/>
						</button>
					{:else}
						<ZoomViewer src={src.desktop} {detailedSrc} {alt} />
					{/if}
				</CarouselSlide>
			{/each}
		</Carousel>
	</div>
</div>
<Dialog state={lightboxState} variant="lightbox">
	<DialogDismiss />
	<Carousel slidesPerView={1} disablePointerEvents showPrevNextButtons={!isMobile}>
		{#each images as { src, detailedSrc, alt }}
			<CarouselSlide>
				<ZoomViewer src={ isMobile ? src.mobile : src.desktop } {detailedSrc} {alt} disableMoveCheck/>
			</CarouselSlide>
		{/each}
	</Carousel>
</Dialog>


<style>
	.product-gallery {
		position: relative;
		display: grid;
		grid-template-columns: 62px 640px;
		gap: .5rem;
		width: fit-content;
	}

	.product-gallery__controls {
		position: absolute;
		top: 1rem;
		right: 1rem;
		z-index: 1;
	}

	.product-gallery__thumbnails {
		display: flex;
		flex-flow: column;
		gap: 1rem;
	}

	.product-gallery__zoom-btn {
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		background-color: transparent;
		border: 1px solid #ccc;
	}

	.product-gallery__btn {
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		margin: 0;
		width: 60px;
		height: 60px;
		box-sizing: border-box;
		background-color: transparent;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	[data-state="selected"].product-gallery__btn {
		border-color: #000;
		outline: 1px solid #000;
	}

	@media(max-width: 560px) {
		.product-gallery {
			grid-template-columns: calc(100vw - 1rem);
			gap: 0;
		}

		.product-gallery__thumbnails {
			display: none;
		}
	}
</style>