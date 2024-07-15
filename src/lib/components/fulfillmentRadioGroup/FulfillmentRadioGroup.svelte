<script lang="ts">
  import type { Writable } from "svelte/store";
	import RadioGroup from "$lib/components/radio/RadioGroup.svelte";
	
	export let value: Writable<string>;
</script>
<div class="fulfillment-group">
	<h2 class="fulfillment__heading">
    How you'll get this item
  </h2>
	<RadioGroup bind:valueStore={value} useRovingIndex>
		<slot />
	</RadioGroup>
	<div class="fulfillment-group__message">
		<slot name="group-message"/> 
	</div>
</div>

<style>
	.fulfillment-group {
		display: grid;
		row-gap: .25rem;
	}

	.fulfillment__heading {
    margin: 0;
    font-size: 1rem;
    color: #2e2f32;
  }

	.fulfillment-group__message {
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 1rem;
		font-weight: 400;
		line-height: 1.2;
		min-height: 36px;
		display: inline-flex;
		align-items: center;
		gap: 4px;
	}
	
	.fulfillment-group :global(.bold) {
		font-weight: 700;
	}
</style>

