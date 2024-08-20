<script>
	import Button from "$lib/components/button/Button-new.svelte";
	import Icon from "$lib/components/icon";
	import generateId from "$lib/client/util/local-unique-id-generator";

	export let tag = "div";
	export let label = "Search"
	export let value = "";
	export let variant = "default";
	export let hasSearchAction = false;
	
	const uid = generateId("search");
	const id = `aria-uikit-search-${uid}`;
	const labelId = `${id}-label`;
	const tags = new Set(["div", "form"]);
	let shouldLabelFloatAbove = false;
	let showClearAction = false;
	
	if (!tags.has(tag)) {
		console.warn(`Invalid tag "${tag}" passed. Using default tag "div".`);
		tag = "div";
	}

	function handleBlur({ target }) {
    if (!target.value.length) {
      shouldLabelFloatAbove = false;
    }
  }

  function handleFocus({ target }) {
    if (!target.value.length) {
      shouldLabelFloatAbove = true;
    }
  }

  function handleKeyUp({ target }) {
    if (variant === "float-above" && !shouldLabelFloatAbove) {
      shouldLabelFloatAbove = true;
    }

		if (value.length) {
			showClearAction = true;	
		}
  }

	function handleInput() {
		if (!value.length) {
			showClearAction = false;
		}
	}
	
  function handleChange({ target }) {
    if (target.value.length) {
      shouldLabelFloatAbove = true;
    }
  }

	function handleAnimation({ target, animationName }) {
		if (animationName.toLowerCase().includes("start")) {
			shouldLabelFloatAbove = true;
		}

		if (animationName.toLowerCase().includes("cancel") && !target.value.length) {
			shouldLabelFloatAbove = false;
		}
	}

	function clearSearch() {
		showClearAction = false;
		value = "";
	}
</script>

{#if variant !== "float-above"}
<label id={labelId} for={id} class="searchbox__label">
	{#if $$slots.label}
		<slot name="label" />
	{:else}
		{label}
	{/if}
</label>
{/if}
<svelte:element 
	this={tag} 
	class="searchbox"
	class:searchbox--hasAction={hasSearchAction}
	class:searchbox--float-above={variant === "float-above"}
	role="search"
>
	<input 
		type="search" 
		class="searchbox__native-control" 
		aria-labelledby={labelId}
		bind:value={value}
    on:click
		on:change={handleChange}
    on:change
		on:input={handleInput}
    on:input
    on:keydown
		on:keyup={handleKeyUp}
    on:keyup
		on:focus={handleFocus}
    on:focus
		on:blur={handleBlur}
    on:blur
		on:animationstart={handleAnimation}
    {...$$restProps}
	/>
	<button type="button" class="searchbox__clear-action" class:hide={!showClearAction} aria-label="Clear Search" tabindex="-1" on:click={clearSearch}>
		<Icon>
			<path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"/>
		</Icon>
	</button>
	{#if variant === "float-above"}
	<div class="notched-outline">
		<div class="notched-outline__leading"></div>
		<div class="notched-outline__notch">
			<label 
				id={labelId}
				for={id}
				class="searchbox__label"
				class:float-above={shouldLabelFloatAbove}
			>
				{label}
			</label>
		</div>
		<div class="notched-outline__trailing"></div>
	</div>
	{/if}
	{#if hasSearchAction}
	<Button style="border-top-left-radius:0;border-bottom-left-radius:0" aria-label={label}>
		<Icon>
			<path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"></path>
		</Icon>
	</Button>
	{/if}
</svelte:element>

<style>
	.searchbox { 
		position: relative;
		display: grid;
		grid-template-columns: 1fr 2.5rem;
		gap: 0;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	}
	
	.searchbox__label {
		width: fit-content;
		font-size: .875rem;
		pointer-events: none;
		transition: transform .15s cubic-bezier(0.4, 0, 0.2, 1);
	}
	
	.searchbox__label.float-above {
		transform: translateY(-80%) scale(.9);
		padding: 0 .25rem;
	}
	
	.searchbox__native-control {
		box-sizing: border-box; 
		outline: none;
		color: #212121;
		font-size: 16px;
		font-weight: 400;
		line-height: 1;
		letter-spacing: 0.04em;
		width: 100%;
		height: 2.5rem;
		padding: 0 8px;
		border: 1px solid;
		border-color: #949499;
		border-radius: 4px;
		background-color: #fff;
		font-size: 1rem;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		transition: border 250ms cubic-bezier(0.4, 0, 0.2, 1); 
		will-change: border, box-shadow; 
		box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 0px 0px;
	}
	
	/* clears the ‘X’ from Internet Explorer */
	input[type=search]::-ms-clear { display: none; width : 0; height: 0; }
	input[type=search]::-ms-reveal { display: none; width : 0; height: 0; }
	/* clears the ‘X’ from Chrome */
	input[type="search"]::-webkit-search-decoration,
	input[type="search"]::-webkit-search-cancel-button,
	input[type="search"]::-webkit-search-results-button,
	input[type="search"]::-webkit-search-results-decoration { display: none; }
	
	.searchbox__native-control:autofill,
	.searchbox__native-control:autofill:focus,
	.searchbox__native-control:autofill:hover {
		box-shadow: 0 0 0 1000px #fff inset!important;
	  -webkit-text-fill-color: #000;
	}
	
	.searchbox__native-control:autofill {
		animation-name: onAutoFillStart;
	}
	
	.searchbox__native-control:not(:autofill) {
		animation-name: onAutoFillCancel;
	}
	
	.searchbox__native-control::placeholder {
		font-size: 1rem;
	}
	
	.searchbox__native-control:hover {
		border-color: #000;
		box-shadow: inset 0 0 0 1px #000;
	}
	
	.searchbox__native-control:focus-within {
		border-color: #3367d6 #285bc7 #2451b2;
		box-shadow: inset 0 0 0 1px #2451b2;
	}
	
	.searchbox--float-above .searchbox__native-control {
		border: none;
		box-shadow: none;
	}

	.searchbox__clear-action {
		box-sizing: border-box;
		align-items: center;
		justify-content: center;
    appearance: none;
		background-color: #fff;
		border: 1px solid #333335;
		background-color: #333335;
		color: #fff;
		border-radius: 16px;
		display: inline-flex;
		height: 24px;
		width: 24px;
		padding: 0;
		margin: 0;
		position: absolute;
		cursor: pointer;
		top: 50%;
		transform: translateY(-50%);
		right: 8px;
		touch-action: manipulation;
    user-select: none;
		transition: background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.searchbox--hasAction .searchbox__clear-action {
		right: 40px;
	}

	.hide {
		opacity: 0;
		pointer-events: none;
	}

	.searchbox__clear-action:not(:disabled):hover {
		background-color: #555659;
		border-color: #555659;
	}
	
	.notched-outline {
		pointer-events: none;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2.5rem;
		display: grid;
		grid-template-columns: 8px minmax(auto, max-content) 1fr;
	}	
		
	.notched-outline__leading	{
		border: 1px solid;
		border-color: #949499;
		border-right: none;
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	}
		
	.notched-outline__notch {
		border-top: 1px solid;
		border-bottom: 1px solid;
		border-color: #949499;
		display: flex;
		align-items: center;
	}
	
	.notched-outline__notch:has(> .float-above) {
		border-top: none!important;
	}
	
	.notched-outline__trailing {
		border: 1px solid;
		border-color: #949499;
		border-left: none;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
	}
	
	.searchbox__native-control:hover + .notched-outline :is(.notched-outline__notch, .notched-outline__leading, .notched-outline__trailing) {
		border-color: #000;
		border-width: 2px;
	}
		
	.searchbox__native-control:focus-within + .notched-outline :is(.notched-outline__notch, .notched-outline__leading, .notched-outline__trailing) {
		border-color: #3367d6 #285bc7 #2451b2;
		border-width: 2px;
	}
	
	@keyframes onAutoFillStart {  
		from {}  
		to {}
	}
	@keyframes onAutoFillCancel {  
		from {}  
		to {}
	}
</style>