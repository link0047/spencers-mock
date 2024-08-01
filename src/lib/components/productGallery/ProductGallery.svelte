<script lang="ts">
	import Carousel from "$lib/components/carousel/Carousel.svelte";
	import CarouselSlide from "$lib/components/carousel/CarouselSlide.svelte";
	import ZoomViewer from "$lib/components/zoomviewer/ZoomViewer.svelte";
	import Button from "$lib/components/button/Button-new.svelte";
	import Icon from "$lib/components/icon/Icon.svelte";
	import { Dialog, DialogDismiss, useDialogState } from "$lib/components/dialog";
	import { debounce } from "$lib/client/util/utilities";

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
	let lightboxCarousel: Carousel;
	let selectedImageIndex: number = index;

	const localSlidesPerView = isMobile ? slidesPerView.mobile : slidesPerView.desktop;

	if (!Array.isArray(images) || images.some(image => typeof image !== 'object' || !('src' in image))) {
    throw new Error('Invalid images prop provided');
  }

	function changeProduct(index: number) {
		carousel.gotoSlide(index, "left");
		selectedImageIndex = index;
	}

	function changeLightBoxProduct(index: number) {
		lightboxCarousel.gotoSlide(index, "left");
	}

	function openLightBox() {
		lightboxState.open.set(true);
	}

	function handleWindowResize(): void {
		isMobile = window.matchMedia("(max-width: 560px)").matches;
	}

	const debouncedResize = debounce(handleWindowResize, 250);

	const transparentPixel = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

	const lightboxState = useDialogState();
	let loadLightBoxThumbnails = false;

	lightboxState.open.subscribe(openState => {
		if (openState && !loadLightBoxThumbnails) {
			loadLightBoxThumbnails = true;
		}
	});
</script>

<svelte:window 
	on:resize={() => debouncedResize()}
/>

<div class="product-gallery" aria-label="Product Gallery">
	<div class="product-gallery__thumbnails">
		{#each images as { thumbnail }, index}
			<button 
				class="product-gallery__btn" 
				type="button"
				data-state={selectedImageIndex === index ? "selected" : "unselected" }
				on:click={changeProduct.bind(null, index)}
			>
				<img class="product-gallery__thumbnail-image" src={isMobile ? transparentPixel : thumbnail} loading="lazy" width="60" height="60" decoding="async" alt="Thumbnail {index + 1}" draggable="false"/>
			</button>
		{/each}
	</div>
	<div class="product-gallery__carousel">
		<div class="product-gallery__controls">
			<Button variant="tonal" elevation={1} aria-label="Zoom image modal" on:click={openLightBox} rounded>
				<Icon>
					<path d="m15.5 14 5 5-1.5 1.5-5-5v-.79l-.27-.28C12.59 15.41 11.11 16 9.5 16A6.5 6.5 0 0 1 3 9.5 6.5 6.5 0 0 1 9.5 3 6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.57 4.23l.28.27h.79m-6 0C12 14 14 12 14 9.5S12 5 9.5 5 5 7 5 9.5 7 14 9.5 14m2.5-4h-2v2H9v-2H7V9h2V7h1v2h2v1Z"/>
				</Icon>
			</Button>
		</div>
		<Carousel bind:slideIndex={selectedImageIndex} bind:this={carousel} slidesPerView={1} displayIndicator={isMobile}>
			{#each images as { src, detailedSrc, alt }, index}
				<CarouselSlide active={selectedImageIndex === index}>
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
	<header class="dialog__header">
		<h2 class="dialog__title">Images</h2>
		<DialogDismiss />
	</header>
	<div class="product-lightbox">
		<div class="product-gallery__thumbnails" data-orientation="horizontal">
			{#each images as { thumbnail }, index}
				<button 
					class="product-gallery__btn" 
					type="button"
					data-state={selectedImageIndex === index ? "selected" : "unselected" }
					on:click={changeLightBoxProduct.bind(null, index)}
				>
					<img class="product-gallery__thumbnail-image" src={loadLightBoxThumbnails ? thumbnail : transparentPixel} loading="lazy" width="112" height="112" decoding="async" alt="Thumbnail {index + 1}" draggable="false"/>
				</button>
			{/each}
		</div>
		<Carousel bind:slideIndex={selectedImageIndex} bind:this={lightboxCarousel} slidesPerView={1} disablePointerEvents showPrevNextButtons={!isMobile}>
			{#each images as { src, detailedSrc, alt }, index}
				<CarouselSlide active={selectedImageIndex === index}>
					<ZoomViewer src={ isMobile ? src.mobile : src.desktop } {detailedSrc} {alt} disableMoveCheck />
				</CarouselSlide>
			{/each}
		</Carousel>
	</div>
</Dialog>

<style>
	/* Global Styles */
	.product-gallery {
		position: relative;
		display: grid;
		grid-template-columns: 62px minmax(320px, 640px);
		gap: .5rem;
		width: fit-content;
		grid-template-areas: "thumbnails carousel";
	}

	.product-gallery__carousel {
		grid-area: carousel;
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
		grid-area: thumbnails;
	}

	[data-orientation="horizontal"].product-gallery__thumbnails {
		flex-flow: row;
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
		overflow: hidden;
		background-color: transparent;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	.product-gallery__btn img {
		width: 100%;
		height: auto;
		display: block;
	}

	[data-state="selected"].product-gallery__btn {
		border-color: #000;
		outline: 1px solid #000;
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
		border: 1px solid transparent;
	}

	/* Lightbox Styles */
	.product-lightbox {
		display: grid;
		grid-template-columns: 352px minmax(auto, 640px);
		grid-template-areas: "thumbnails carousel";
		gap: 1rem;
		padding: 1rem;
		justify-content: space-evenly;
	}

	.dialog__header {
		padding: .5rem;
		display: flex;
		align-items: center;
		height: 56px;
		justify-content: space-between;
	}

	.dialog__title {
		line-height: 1;
		margin: 0;
		font-size: 1.2rem;
		text-decoration: underline;
		text-decoration-thickness: 3px;
		text-decoration-color: #2a508f;
		text-underline-offset: 2px;
	}

	.product-lightbox .product-gallery__thumbnails {
		grid-area: thumbnails;
	}

	.product-lightbox .product-gallery__btn {
		width: 112px;
		height: 112px;
	}

	/* Media Queries */
	@media (max-width: 1024px) {
		.product-lightbox {
			grid-template-columns: 100%;
			grid-template-areas: 
				"carousel" 
				"thumbnails";
		}
	}

	@media (max-width: 768px) {
		.product-gallery {
			grid-template-areas: 
				"carousel carousel"
				"thumbnails thumbnails";
			gap: 0;
			grid-template-columns: 0 minmax(320px, 640px);
		}
		
		.product-gallery .product-gallery__thumbnails {
			/* This should be fixed later */
			display: none;
		}
	}

	@media (max-width: 560px) {
		.product-gallery {
			grid-template-columns: 0 calc(100vw - 1rem);
			gap: 0;
		}

		.product-lightbox .product-gallery__btn {
			width: 60px;
			height: 60px;
		}

		.product-lightbox .product-gallery__btn img {
			width: 100%;
			height: auto;
			display: block;
		}
	}
</style>