<script>
	import { getContext } from "svelte";
	import Icon from "$lib/components/icon";
	import { fetchData, modifyUrlParam } from "$lib/client/util/utilities";
	
	export let rating_count;
	export let rating_histogram = [0, 0, 0, 0, 0];
	
	const items = [5,4,3,2,1];
	const url = getContext("url");
	const data = getContext("data");
	const filters = getContext("filters");
	
	function calculatePercentage(value, total) {
    return (value / total) * 100;
	}

	async function handleClick(event) {
		const ratingNum = event.currentTarget.dataset.item;
		const count = parseInt(event.currentTarget.dataset.count);
		if (!count) return;
		
		$url = modifyUrlParam($url,"filters", `rating:${ratingNum}`);
		const reviewData = await fetchData($url);
		$data = reviewData;
		$filters.set("rating", `${ratingNum}`);
		$filters = $filters;
	}
</script>

<div class="histogram">
	{#each items as item, index}
	<button data-item={item} data-count={rating_histogram[index]} type="button" class="histogram__item" on:click={handleClick}>
		<div class="histogram__value">
			{item}
			<Icon>
				<path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.45 4.73L5.82 21 12 17.27Z"/>
			</Icon>
		</div>
		<div class="histogram__bar">
			<div class="histogram__bar-value" style={`width:${calculatePercentage(rating_histogram[index], rating_count)}%`}></div>
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