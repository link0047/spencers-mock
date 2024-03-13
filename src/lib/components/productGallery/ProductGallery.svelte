<script lang="ts">
	import Carousel from "$lib/components/carousel/Carousel.svelte";
	import CarouselSlide from "$lib/components/carousel/CarouselSlide.svelte";
	import ZoomViewer from "$lib/components/zoomviewer/ZoomViewer.svelte";

	interface Image {
		src: string;
		thumbnail: string;
		detailedSrc: string;
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
	const localSlidesPerView = isMobile ? slidesPerView.mobile : slidesPerView.desktop;

	function changeProduct(index: number) {
		carousel.gotoSlide(index, "left");
		selectedImageIndex = index;
	}
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
				<img src={thumbnail} loading="lazy" width="60" height="60" decoding="async" alt="Thumbnail {index + 1}"/>
			</button>
		{/each}
	</div>
	<Carousel bind:slideIndex={selectedImageIndex} bind:this={carousel} slidesPerView={localSlidesPerView} displayIndicator={isMobile}>
		{#each images as { src, detailedSrc }}
			<CarouselSlide>
				<ZoomViewer {src} {detailedSrc} />
			</CarouselSlide>
		{/each}
	</Carousel>
</div>

<style>
	.product-gallery {
		display: grid;
		grid-template-columns: 62px 640px;
		gap: .5rem;
	}

	.product-gallery__thumbnails {
		display: flex;
		flex-flow: column;
		gap: 1rem;
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