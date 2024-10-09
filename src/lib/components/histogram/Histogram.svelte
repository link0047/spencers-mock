<script lang="ts">
	import type { Writable } from "svelte/store";
	import { getContext } from "svelte";
	import Icon from "$lib/components/icon";
	import { fetchData, modifyUrlParam } from "$lib/client/util/utilities";
	import generateId from "$lib/client/util/local-unique-id-generator";
	
	// props
	export let label: string = "Rating distribution";
	export let rating_count: number;
	export let rating_histogram: number[] = [0, 0, 0, 0, 0];
	
	// consts
	const UID: number = generateId("histogram");
	const ACTION_ID: string = `uikit-histogram-${UID}-action`;
	const ITEMS: readonly number[] = [5, 4, 3, 2, 1] as const;
	const url = getContext<Writable<string>>("url");
	const data = getContext<Writable<unknown>>("data");
	const filters = getContext<Writable<Map<string, string>>>("filters");
	
	/**
	 * Calculates the percentage of a value relative to a total
	 * @param {number} value - The value to calculate the percentage for
	 * @param {number} total - The total value
	 * @returns {number} The calculated percentage
	 */
	function calculatePercentage(value: number, total: number): number {
		return (value / total) * 100;
	}

	/**
 	 * Handles the click event on a histogram bar
 	 * @param {MouseEvent} event - The click event
 	 */
	async function handleClick(event: MouseEvent) {
		const target = event.currentTarget as HTMLButtonElement;
		const ratingNum = target.dataset.item;
		const count = parseInt(target.dataset.count || "0", 10);
		
		if (isNaN(count) || count <= 0) {
			return; // Silently exit for invalid or zero counts
		}

		try {
			$url = modifyUrlParam($url, "filters", `rating:${ratingNum}`);
			const reviewData = await fetchData($url);
			$data = reviewData;
			$filters.set("rating", `${ratingNum}`);
			$filters = $filters;
		} catch (error) {
			console.error("Error updating data:", error);
		}
	}
</script>

<div class="histogram" role="group" aria-label={label}>
	{#each ITEMS as item, index}
	<button 
		id={`${ACTION_ID}-${index}`}
		data-item={item}
		data-count={rating_histogram[index]}
		type="button"
		class="histogram__item" 
		on:click={handleClick}
		aria-label={`${item} star rating: ${rating_histogram[index]} reviews`}
		disabled={rating_histogram[index] === 0}
	>
		<div class="histogram__value">
			{item}
			<Icon>
				<path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.45 4.73L5.82 21 12 17.27Z"/>
			</Icon>
		</div>
		<div class="histogram__bar">
			<div 
				class="histogram__bar-value" 
				style={`width:${calculatePercentage(rating_histogram[index], rating_count)}%`}
				role="progressbar"
				aria-labelledby={`${ACTION_ID}-${index}`}
				aria-valuenow={rating_histogram[index]}
				aria-valuemin="0"
				aria-valuemax={rating_count}
			></div>
		</div>
		<div class="histogram__count">{rating_histogram[index]}</div>
	</button>
	{/each}
</div>

<style>
	.histogram {
		width: 100%;
		min-width: 250px;
    max-width: 350px;
		display: grid;
		gap: 8px;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	}
	
	.histogram__item {
		position: relative;
		touch-action: manipulation;
    user-select: none;
		box-sizing: border-box;
    appearance: none;
		background-color: transparent;
		border: none;
		color: #38393b;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
		font-size: 0.875rem;
    font-weight: 500;
		display: grid;
		grid-template-columns: minmax(auto, 40px) 1fr minmax(auto, 40px);
		align-items: center;
		gap: 8px;
		width: 100%;
		transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.histogram__item:hover .histogram__bar {
		background-color: #93939a;
		cursor: pointer;
	}

	.histogram__item[data-count="0"]:hover .histogram__bar {
		background-color: #d1d1d6;
		cursor: not-allowed;
	}

	.histogram__value {
		display: flex;
		align-items: center;
		justify-content: space-between;
		line-height: 1;
		gap: 8px;
	}

	.histogram__bar {
		position: relative;
		background-color: #d1d1d6;
		height: 24px;
		width: 100%;
		border-radius: 12px;
		overflow: hidden;
	}

	.histogram__bar-value {
		position: absolute;
		height: 24px;
		background-color: #f7941d;

	}

	.histogram__count {
		text-align: center;
	}
</style>