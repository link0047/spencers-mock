<script>
	import { getContext } from "svelte";
	import generateId from "$lib/client/util/local-unique-id-generator.js";
	export let label = "";
	export let value = "";
	export let checked = false;
	
	let ref;
	let selected = getContext("selected");
	let selectedValue = getContext("value");
	const uid = generateId("radio-button");
	const id = `uikit-radio-button-${uid}`;

	function handleClick() {
		$selected = id;
		$selectedValue = value;
	}
	
	if ($selected === "") {
		$selected = id;
		$selectedValue = value;
	}

	$: checked = ($selected === id);
</script>

<button 
	bind:this={ref}
	class="radio-button"
	type="button" 
	role="radio" 
	aria-checked={checked} 
	aria-label={label}
	data-state={checked ? "checked" : "unchecked"}
	{value}
	{id} 
	tabindex={checked ? 0 : -1}
	on:click={handleClick}
	{...$$restProps}
>
	<slot />
</button>

<style>
	:root {
		--uikit-radio-button-outline-color: transparent;
		--uikit-radio-button-border-color: #aaadb2;
		--uikit-radio-button-box-shadow: transparent;
		--uikit-radio-button-disabled-background-color: #f7f7f7;
	  --uikit-radio-button-disabled-border-color: #f7f7f7;
	  --uikit-radio-button-disabled-outline-color: #666;
		--uikit-radio-button-checked-color: #212121;
	}
	
	.radio-button {
		box-sizing: border-box;
    appearance: none;
		background-color: #fff;
		border: 1px solid var(--uikit-radio-button-border-color, #aaadb2);
		border-radius: .5rem;
		box-shadow: inset 0 0 0 1px var(--uikit-radio-button-box-shadow, transparent);
		color: #38393b;
		display: flex;
		flex-flow: column;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
		font-size: 0.875rem;
    font-weight: 500;
		letter-spacing: 0.04em;
		padding: 0;
		position: relative;
		touch-action: manipulation;
    user-select: none;
		min-width: 88px;
		cursor: pointer;
		outline-offset: 2px;
		outline: 2px dashed;
		outline-color: var(--uikit-radio-button-outline-color, transparent);
	}
	
	.radio-button:disabled {
		background-color: var(--uikit-radio-button-disabled-background-color);
	  border-color: var(--uikit-radio-button-disabled-border-color);
		cursor: not-allowed;
	}
	
	.radio-button:not(:disabled):hover {
		--uikit-radio-button-border-color: #212121;
		--uikit-radio-button-box-shadow: #212121;
	}
	
	.radio-button[aria-checked="true"]:not(:disabled) {
		--uikit-radio-button-border-color: var(--uikit-radio-button-checked-color);
		--uikit-radio-button-box-shadow: var(--uikit-radio-button-checked-color);
	}

	.radio-button:focus-visible {
		--uikit-radio-button-outline-color: #888;
	}
</style>