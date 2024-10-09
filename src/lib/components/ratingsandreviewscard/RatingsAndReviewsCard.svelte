<script lang="ts">
	import { setContext } from "svelte";
	import { writable } from "svelte/store";
	import StarRating from "$lib/components/starrating";
	import Button from "$lib/components/button/Button-new.svelte";
	import Histogram from "$lib/components/histogram";
	import Reviews from "./Reviews.svelte";
	import Review from "./Review.svelte";
	import Link from "$lib/components/link";
	import Chip from "$lib/components/chip/Chip-new.svelte";
	import { Select,SelectOption } from "$lib/components/select";
	import Searchbox from "$lib/components/searchbox";
	import Pagination from "$lib/components/pagination";
	import { fetchData } from "$lib/client/util/utilities";

	export let data;
	export let url: string;

	let dataStore = writable(data);
	let appliedFilters = writable(new Map());
	let localURL = writable(url);
	const totalReviews = data.paging.total_results;
	
	setContext("url", localURL);
	setContext("data", dataStore);
	setContext("filters", appliedFilters);

	async function removeFilter() {
		$appliedFilters.delete("rating");
		$appliedFilters = $appliedFilters;
		$dataStore = await fetchData(`${url}`);
	}

	function pageChange(page: number) {
		console.log(page);
	}

	async function sortReviews({ target }: Event) {
		console.log($localURL);
		console.log((target as HTMLSelectElement).value);
	}

	const reviewSortOptions = [
		{ value: "Newest", label: "Most Recent" },
		{ value: "MostHelpful", label: "Most Helpful" },
		{ value: "HighestRating", label: "Highest Rating" },
		{ value: "LowestRating", label: "Lowest Rating" },
		{ value: "Oldest", label: "Oldest" },
	];
	
	let {
		average_rating,
		rating_count,
		review_histogram,
	} = $dataStore.results[0].rollup ?? { average_rating: 0, rating_count: 0 };
	$: ({
		current_page_number,
		page_size,
		pages_total,
		total_results
	} = $dataStore.paging);
	$: reviews = $dataStore.results[0].reviews;
</script>

<div class="ratings-and-reviews">
	<div class="ratings-and-reviews__container">
		<h2 class="ratings-and-reviews__heading">
			Ratings & Reviews
			{#if $$slots.subheading}
				<div class="ratings-and-reviews__subheading">
					<slot name="subheading"/>
				</div>
			{/if}
		</h2>
		<div class="ratings-and-reviews__card">
			<div class="ratings-and-reviews__stats">
				<h3 class="ratings-and-reviews__stats-heading">{average_rating}</h3>
				<StarRating rating={average_rating} />
				<p class="ratings-and-reviews__stats-desc">{totalReviews ? `${totalReviews} Reviews` : "Unfortunatly, this product has no reviews."}</p>
			</div>
			<div class="ratings-and-reviews__histogram">
				{#if rating_count}
				<Histogram rating_histogram={review_histogram.reverse()} {rating_count} />
				{/if}
			</div>
			<div class="ratings-and-reviews__cta-section">
				<p class="cta-section__label">Share your thoughts with our customers</p>
				<Button variant="outlined">Write a Review</Button>
			</div>
		</div>
		{#if rating_count}
			<div class="ratings-and-reviews__sortfilter-container">
				<div class="ratings-and-reviews__sortfilter">
					<Searchbox label="Search Reviews" variant="float-above" hasSearchAction />
					<Select label="Sort By" variant="float-above" on:change={sortReviews}>
						<optgroup label="Sort Reviews By">
						{#each reviewSortOptions as { value, label }}
							<SelectOption {value}>{label}</SelectOption>
						{/each}
						</optgroup>
					</Select>
				</div>
				<div class="ratings-and-reviews__sortfilter-result">
				{#if $appliedFilters.size}
					{#each $appliedFilters.entries() as [key, value]}
						<Chip onClose={removeFilter}>
							{key}: {value}
						</Chip>
						<Button variant="ghost" color="primary">
							Clear all
						</Button>
					{/each}
				{/if}
				</div>
			</div>
			<div class="ratings-and-reviews__results-label">
				{page_size < total_results ? `Viewing ${current_page_number} - ${page_size} of ${total_results} reviews.` : `Viewing ${current_page_number} - ${total_results}`}
			</div>
			<Reviews>
				{#each reviews as review}
					<Review data={review} />
				{/each}
			</Reviews>
			{#if pages_total > 1}
				<div class="ratings-and-reviews__pagination">
					<Pagination count={pages_total} page={1} onPageChange={pageChange}/>
				</div>
			{/if}
		{/if}
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

	.ratings-and-reviews__container {
		margin: 0 auto;
		max-width: 1400px;
		width: 100%;
		position: relative;
		z-index: 1;
	}
	
	.ratings-and-reviews__heading {
		font-weight: 600;
		letter-spacing: .05rem;
		line-height: 1;
		margin: 1rem 0;
	}

	.ratings-and-reviews__subheading {
		line-height: 1.4;
		font-size: 1rem;
		margin-top: .75rem;
		font-weight: 400;
	}

	.ratings-and-reviews__sortfilter-container {
		display: grid;
		gap: 8px;
		margin-top: 3rem;
	}

	.ratings-and-reviews__sortfilter {
		display: grid;
		gap: 1rem;
		grid-template-columns: minmax(auto, 300px) minmax(auto, 300px);
		justify-content: space-between;
	}

	.ratings-and-reviews__sortfilter-result {
		display: flex;
	}

	.ratings-and-reviews__results-label {
		line-height: 1;
		font-size: .875rem;
		margin: .5rem 0;
	}
	
	.ratings-and-reviews__card {
		position: relative;
		box-sizing: border-box;
		border-radius: .5rem;
		padding: 1rem;
		display: grid;
		width: 100%;
		grid-template-columns: minmax(auto, max-content) minmax(auto, 320px) minmax(auto, max-content);
		grid-template-areas: "stats histogram CTA";
		justify-content: space-evenly;
		gap: .5rem;
		background-color: #fff;
	}

	.ratings-and-reviews__card:has(.ratings-and-reviews__histogram:empty) {
		grid-template-columns: minmax(auto, max-content) minmax(auto, max-content) minmax(auto, max-content);
	}

	.ratings-and-reviews__cta-section {
		display: flex;
		flex-flow: column;
		width: fit-content;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 1rem;
		grid-area: CTA;
	}

	.ratings-and-reviews__cta-section :global(.btn) {
		width: fit-content;
	}
	
	.ratings-and-reviews__histogram {
		width: 100%;
		grid-area: histogram;
	}
	
	.ratings-and-reviews__stats {
		min-width: 10rem;
		display: grid;
		gap: 8px;
		text-align: center;
		grid-template-rows: minmax(auto, max-content) minmax(auto, max-content) minmax(auto, max-content);
		align-self: center;
		grid-area: stats;
	}

	.ratings-and-reviews__stats :global(.uikit-starrating) {
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

	.ratings-and-reviews__stats-desc {
		line-height: 1.6;
	}

	.ratings-and-reviews__pagination {
		max-width: 600px;
		margin: 1rem auto;
	}

	@media (max-width: 632px) {
		.ratings-and-reviews__sortfilter {
			grid-template-columns: 1fr;
		}

		.ratings-and-reviews__card {
			grid-template-columns: 1fr;
			grid-template-areas: "stats" "CTA" "histogram";
			gap: 1.5rem;
		}

		.ratings-and-reviews__card:has(.ratings-and-reviews__histogram:empty) {
			grid-template-columns: 1fr;
		}

		.cta-section__label {
			display: none;
		}

		.ratings-and-reviews__cta-section {
			justify-self: center;
		}

		.ratings-and-reviews__histogram {
			display: flex;
			flex: 0 0 100%;
			justify-content: center;
		}
	}
</style>