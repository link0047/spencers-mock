<script lang="ts">
	import { afterUpdate } from "svelte";
	export let variant = "filled";
	export let color = "secondary";
	export let size = "default";
	export let elevation = 0;
	export let rounded = false;
  export let underline = false;
	export let state: string | null = null;
	export let canBeSelected = false;

	$: internalState = state;

	function handleClick() {
		if (canBeSelected) {
			state = state !== "selected" ? "selected" : null;
		}
	}
	
	afterUpdate(() => {
		internalState = state;
	});	
</script>
<button
	class="btn"
	class:btn--filled={variant === "filled"}
	class:btn--tonal={variant === "tonal"}
	class:btn--outlined={variant === "outlined"}
	class:btn--ghost={variant === "ghost"}
	class:btn--primary={color === "primary"}
	class:btn--secondary={color === "secondary"}
	class:btn--tertiary={color === "tertiary"}
	class:btn--success={color === "success"}
	class:btn--underline={underline}
  class:btn--rounded={rounded}
	class:btn--elevated={elevation === 1}
	class:btn--sizeXS={size === "xs"}
	class:btn--sizeSM={size === "sm"}
	data-state={state}
	type="button"
	on:click={handleClick}
  on:click
  on:mouseover
  on:mouseenter
  on:mouseleave
  on:blur
  on:focus
	{...$$restProps}
>
	{#if internalState === "loading"}
		<svg class="icon" viewBox="0 0 24 24" role="presentation" focusable="false">
			<path d="M23.4,11.4C23.4,5.1,18.3,0,12,0S0.6,5.1,0.6,11.4 M2.6,11.4c0-5.2,4.2-9.4,9.4-9.4s9.4,4.2,9.4,9.4"/>
		</svg>
	{/if}
	<slot /> 
</button>

<style>
	:root {
		--uikit-btn-elevation: 0 .1875rem .0625rem -.125rem rgba(0, 0, 0, .2), 0 .125rem .125rem 0 rgba(0, 0, 0, .14), 0 .0625rem .3125rem 0 rgba(0, 0, 0, .12);
		--uikit-btn-height: 2.5rem;
		--uikit-btn-width: auto;
		--uikit-btn-border-radius: .25rem;
		--uikit-btn-font-size: 0.875rem;
		--uikit-btn-font-weight: 500;
		--uikit-btn-letter-spacing: 0.04em;
		--uikit-btn-padding-inline: 0.5rem;
		--uikit-btn-background-color: #fff;
		--uikit-btn-border-color: #aaadb2;
		--uikit-btn-color: #38393b;
		--uikit-btn-hover-bg-color: #eeeeef;
		--uikit-btn-hover-border-color: #555659;
		--uikit-btn-selected-bg-color: #333335;
		--uikit-btn-selected-border-color: #333335;
		--uikit-btn-focus-outline-color: #007acc;
		--uikit-btn-disabled-bg-color: #eeeeef;
		--uikit-btn-disabled-color: #444547;
		--uikit-btn-disabled-border-color: #eeeeef;
	}

	/* base button styles */
	.btn {
		box-sizing: border-box;
		align-items: center;
		justify-content: center;
		appearance: none;
		width: var(--uikit-btn-width);
		background-color: var(--uikit-btn-background-color);
		border: 1px solid var(--uikit-btn-border-color);
		border-radius: var(--uikit-btn-border-radius);
		color: var(--uikit-btn-color);
		display: inline-flex;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
		font-size: var(--uikit-btn-font-size);
		font-weight: var(--uikit-btn-font-weight);
		height: var(--uikit-btn-height);
		letter-spacing: var(--uikit-btn-letter-spacing);
		padding-inline: var(--uikit-btn-padding-inline);
		position: relative;
		touch-action: manipulation;
		user-select: none;
		transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform .25s cubic-bezier(0.4, 0, 0.4, 1);
	}

	.btn--sizeSM {
		--uikit-btn-height: 2rem;
	}

	.btn--sizeXS {
		--uikit-btn-height: 1.5rem;
	}

	/* variant styles */
	.btn--filled {
		border-color: var(--uikit-btn-selected-border-color);
		background-color: var(--uikit-btn-selected-bg-color);
		color: #fff;
	}

	.btn--tonal {
		background-color: #e5e6e7;
		border-color: #e5e6e7;
	}
	
	.btn--outlined {
		background-color: #fff;
		border: .125rem solid #66676a;
	}

	.btn--ghost {
		background-color: transparent;
		border: .0625rem solid transparent;
		transition: background-color .2s cubic-bezier(0.4, 0, 0.2, 1), border-color .2s cubic-bezier(0.4, 0, 0.2, 1);
	}
	
	.btn:disabled {
		cursor: not-allowed;
		color: var(--uikit-btn-disabled-color);
		font-weight: 400;
		background-color: var(--uikit-btn-disabled-bg-color);
		border: .0625rem solid var(--uikit-btn-disabled-border-color);
		box-shadow: none;
	}

	.btn:active {
		transform: scale(0.97);
	}

	.btn:disabled.btn--outlined {
		background-color: transparent;
		border: .125rem solid var(--uikit-btn-disabled-border-color);
	}

	.btn:disabled.btn--ghost {
		background-color: transparent;
		border: none;
	}

	.btn:not(:disabled):hover {
		background-color: var(--uikit-btn-hover-bg-color);
		cursor: pointer;
	}

	.btn--filled:not(:disabled):hover {
		background-color: var(--uikit-btn-hover-border-color);
		border-color: var(--uikit-btn-hover-border-color);
	}

	.btn--tonal:not(:disabled):hover {
		background-color: #cccdd0;
		border-color: #cccdd0;
	}
	
	.btn:focus-visible {
		outline-offset: 0;
		outline: .125rem solid var(--uikit-btn-focus-outline-color);
	}

	.btn--outlined:focus-visible {
		outline-offset: -.125rem;
	}

	/* colors */
	.btn--primary {
		background-color: #2a508f;
		border: .0625rem solid #2a508f;
		color: #fff;
	}

	.btn--primary.btn--outlined:not(:disabled) {
		background-color: #fff;
		border: .125rem solid #2a508f;
		color: #2a508f;
	}

	.btn--primary.btn--tonal:not(:disabled) {
		background-color: #bfcadd;
		border-color: #bfcadd;
		color: #000;
	}

	.btn--primary.btn--ghost:not(:disabled) {
		background-color: transparent;
		border: none;
		color: #2a508f;
	}

	.btn--primary:disabled {
		background-color: #e3e6f0;
		color: #3e4045;
	}

	.btn--primary:disabled.btn--outlined {
		background-color: transparent;
		border: .125rem solid #d1d6e6;
	}

	.btn--primary:disabled.btn--ghost {
		background-color: transparent;
		border: none;
	}
	
	.btn--primary:not(:disabled):hover {
		background-color: #3f619a;
		border: .0625rem solid #3f619a;
	}

	.btn--primary.btn--tonal:not(:disabled):hover {
		background-color: #94a7c7;
		border-color: #94a7c7;
	}

	.btn--primary.btn--ghost:not(:disabled):hover {
		background-color: #e9edf3;
		border: none;
		color: #254880;
	}

	.btn--primary.btn--outlined:not(:disabled):hover {
		background-color: #e9edf3;
		border-width: .125rem;
		color: #254880;
	}

	.btn--success {
		background-color: #008a00;
		border: .0625rem solid #008a00;
		color: #fff;
	}

	.btn--success:focus-visible {
		outline-offset: .125rem;
	}

	.btn--success.btn--outlined:not(:disabled) {
		background-color: #fff;
		border: .125rem solid #008a00;
		color: #076d08;
	}

	.btn--success.btn--tonal:not(:disabled) {
		background-color: #89bf8c;
		border-color: #89bf8c;
		color: #112214;
	}

	.btn--success.btn--ghost:not(:disabled) {
		background-color: transparent;
		border: none;
		color: #076d08;
	}

	.btn--success:disabled {
		background-color: #f4f9f4;
		color: #3e4045;
	}

	.btn--success:disabled.btn--outlined {
		background-color: transparent;
		border: .125rem solid #daedda;
	}

	.btn--success:disabled.btn--ghost {
		background-color: transparent;
		border: none;
	}
	
	.btn--success:not(:disabled):hover {
		background-color: #076d08;
		border: .0625rem solid #076d08;
	}

	.btn--success.btn--tonal:not(:disabled):hover {
		background-color: #60a167;
		border-color: #60a167;
	}

	.btn--success.btn--ghost:not(:disabled):hover {
		background-color: #f4f9f4;
		border: none;
	}

	.btn--success.btn--outlined:not(:disabled):hover {
		background-color: #f4f9f4;
		border-width: .125rem;
	}

	/* modifiers */
	.btn--elevated {
		box-shadow: var(--uikit-btn-elevation);
	}

	.btn--underline {
		text-decoration: underline;
		text-underline-offset: .125rem;
	}

	.btn--rounded {
		padding: 0;
		border-radius: calc(var(--uikit-btn-height) / 2);
	}
	
	/* states */
	.btn[data-state="loading"] {
		gap: .5rem;
	}

	.btn[data-state="selected"] {
		border-color: var(--uikit-btn-selected-border-color);
		background-color: var(--uikit-btn-selected-bg-color);
		color: #fff;
	}

	.btn[data-state="selected"]:hover {
		background-color: var(--uikit-btn-hover-border-color);
		border-color: var(--uikit-btn-hover-border-color);
	}

	/* animations */
	@keyframes rotating {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	/* icon */
	.icon {
		fill: #212121;
		width: 1rem;
		height: 1rem;
		animation: rotating .5s linear infinite;
	}
</style>
