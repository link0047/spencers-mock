<script lang="ts">
	import { afterUpdate } from "svelte";
	export let active: boolean ;

	let ref: HTMLDivElement;
	// should remove this
	afterUpdate(() => {
		if (ref) {
			ref.inert = !active;
		}
	});
</script>
<div bind:this={ref} class="carousel__slide" role="group" aria-roledescription="slide">
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