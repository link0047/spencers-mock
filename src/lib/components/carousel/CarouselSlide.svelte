<div class="carousel__slide" role="group" aria-roledescription="slide">
	<slot />
</div>

<style>
	.carousel__slide {
		box-sizing: border-box;
		width: 100%;
		flex: 0 0 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		user-select: none;
	}
	
	.carousel__slide:last-of-type {
    margin-right: 0;
	}
</style>