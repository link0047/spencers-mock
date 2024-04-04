<script>
	export let rating = 0;
	import StarRating from "$lib/components/starrating";
	import Button from "$lib/components/button/Button-new.svelte";
</script>

<div class="ratings-and-reviews">
	<h2 class="ratings-and-reviews__heading">Ratings & Reviews</h2>
	<div class="ratings-and-reviews__container">
		<div class="ratings-and-reviews__stats">
			<h4 class="ratings-and-reviews__stats-heading">{rating}</h4>
			<StarRating {rating} />
			<p class="ratings-and-reviews__stats-desc">Unfortunately, this product has no reviews.</p>
		</div>
		<div class="ratings-and-reviews__cta-section">
			<p class="cta-section__label">Share your thoughts with our customers</p>
			<Button variant="outlined">Write a Review</Button>
		</div>
	</div>
</div>

<style>
	.ratings-and-reviews {
		position: relative;
		display: grid;
		gap: 1rem;
		grid-template-columns: 1fr;
		width: 100%;
		padding: 2rem 0;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	}

	.ratings-and-reviews:after {
		content: "";
		position: absolute;
		background-color: #f5f5f5;
		top: 0;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 100vw;
		z-index: 0;
	}
	
	.ratings-and-reviews__heading {
		font-weight: 500;
		z-index: 1;
		line-height: 1;
		position: relative;
		margin: 0;
	}
	
	.ratings-and-reviews__container {
		position: relative;
		box-sizing: border-box;
		border-radius: .5rem;
		padding: 1rem;
		display: grid;
		width: 100%;
		grid-template-columns: minmax(auto, max-content) minmax(auto, max-content);
		justify-content: space-evenly;
		gap: .5rem;
		background-color: #fff;
		margin: 0 auto;
		z-index: 1;
	}

	.ratings-and-reviews__cta-section {
		display: flex;
		flex-flow: column;
		width: fit-content;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 1rem;
	}

	.ratings-and-reviews__cta-section :global(.btn) {
		width: fit-content;
	}
	
	.ratings-and-reviews__stats {
		min-width: 10rem;
		display: grid;
		gap: 8px;
		text-align: center;
	}

	.ratings-and-reviews__stats :global(.ratings) {
		justify-self: center;
	}
	
	.ratings-and-reviews__stats-heading {
		margin: 0;
		font-size: 3rem;
		font-weight: 500;
		line-height: 1;
	}

	.ratings-and-reviews__stats-desc,
	.cta-section__label {
		line-height: 1;
		margin: 0;
	}

  @media (max-width:560px) {
    .ratings-and-reviews__container {
      grid-template-columns: 1fr;
      row-gap: 1rem;
    }

    .ratings-and-reviews__cta-section {
      width: 100%;
    }

    .cta-section__label {
      display: none;
    }
  }
</style>

