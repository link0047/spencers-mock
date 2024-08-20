<script>
	import { Progress } from "$lib/components/progress";

	export let value = 1;
	export let min = 0;
	export let max = 100;
	export let threshold = 10;

	let message = value >= max 
		? "Your order qualifies for free shipping" 
		: value >= threshold ? `Only $${max - value} away from Free Standard Shipping!` : "";
</script>

<div class="aov-booster">
	<div class="aov-booster__message">{message}</div>
	<div class="aov-booster__min">${min}</div>
	<Progress {value} {min} {max} />
	<div class="aov-booster__max">${max}</div>
</div>

<style>
	.aov-booster {
		display: grid;
		grid-template-areas: 
			". message ."
			"min progress max";
		grid-template-columns: min-content fit-content(22.25rem) min-content;
		grid-template-rows: fit-content(1rem) min-content;
		align-items: center;
		column-gap: .5rem;
		font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
		font-weight: 400;
    line-height: 1.6;
		font-size: .875rem;
	}

	.aov-booster__message {
		grid-area: message;
		font-size: 0.75rem;
		text-align: center;
	}
	
	.aov-booster :global(.progress) {
		grid-area: progress;
	}
	
	.aov-booster__min {
		grid-area: min;
		letter-spacing: 0.04em;
	}
	
	.aov-booster__max {
		grid-area: max;
		letter-spacing: 0.04em;
	}
</style>