<script>
	import Carousel from "$lib/components/carousel/Carousel.svelte";
	import CarouselSlide from "$lib/components/carousel/CarouselSlide.svelte";
	import ZoomViewer from "$lib/components/zoomviewer/ZoomViewer.svelte";
	export let images = [];
	let carousel;

	let selectedImageIndex = 0;
	
	function changeProduct(index) {
		carousel.gotoSlide(index);
		selectedImageIndex = index;
	}	
</script>

<div class="product-gallery">
	<div class="product-gallery__thumbnails">
		{#each images as { thumbnail }, index}
			<button 
				class="product-gallery__btn" 
				type="button"
				data-state={selectedImageIndex === index ? "selected" : "unselected" }
				on:click={changeProduct.bind(null, index)}
			>
				<img src={thumbnail} loading="lazy" width="60" height="60" decoding="async" alt=""/>
			</button>
		{/each}
	</div>
	
	<Carousel bind:slideIndex={selectedImageIndex} bind:this={carousel} slidesPerView={1} displayIndicator={true}>
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
		width: 320px;
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
</style>