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
		--uikit-button--elevation: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    --uikit-button-height: 36px;
	}
	
	/* base button styles */
	.btn {
		box-sizing: border-box;
		align-items: center;
		justify-content: center;
    appearance: none;
		background-color: #fff;
		border: 1px solid #aaadb2;
		border-radius: 4px;
		color: #38393b;
		display: inline-flex;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
		font-size: 0.875rem;
    font-weight: 500;
		height: var( --uikit-button-height);
		letter-spacing: 0.04em;
		padding-inline: .5rem;
		position: relative;
		touch-action: manipulation;
    user-select: none;
		transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform .25s cubic-bezier(0.4, 0, 0.4, 1);;
	}

	/* variant styles */
	.btn--filled {
		border-color:  #333335;
		background-color: #333335;
		color: #fff;
	}

	.btn--tonal {
		background-color: #e5e6e7;
		border-color: #e5e6e7;
	}
	
	.btn--outlined {
		background-color: #fff;
		border: 2px solid #66676a;
	}

	.btn--ghost {
		background-color: transparent;
		border: 1px solid transparent;
		transition: background-color .2s cubic-bezier(0.4, 0, 0.2, 1), border-color .2s cubic-bezier(0.4, 0, 0.2, 1);
	}
	
	.btn:disabled {
		cursor: not-allowed;
		color: #444547;
    font-weight: 400;
		background-color: #eeeeef;
		border: 1px solid #eeeeef;
		box-shadow: none;
	}

	.btn:active {
		transform: scale(0.97);
	}

	.btn:disabled.btn--outlined {
		background-color: transparent;
		border: 2px solid #eeeeef;
	}

	.btn:disabled.btn--ghost {
		background-color: transparent;
		border: none;
	}

	.btn:not(:disabled):hover {
		background-color: #eeeeef;
		cursor: pointer;
	}

	.btn--filled:not(:disabled):hover {
		background-color: #555659;
		border-color: #555659;
	}

	.btn--tonal:not(:disabled):hover {
		background-color: #cccdd0;
		border-color: #cccdd0;
	}
	
	.btn:focus-visible {
		outline-offset: 0;
    outline: 2px solid #007acc;
	}

	.btn--outlined:focus-visible {
		outline-offset: -2px;
	}

	/* colors */
	.btn--primary {
		background-color: #2a508f;
		border: 1px solid #2a508f;
    color: #fff;
  }

	.btn--primary.btn--outlined:not(:disabled) {
		background-color: #fff;
		border: 2px solid #2a508f;
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
		border: 2px solid #d1d6e6;
	}

	.btn--primary:disabled.btn--ghost {
		background-color: transparent;
		border: none;
	}
	
	.btn--primary:not(:disabled):hover {
		background-color: #3f619a;
		border: 1px solid #3f619a;
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
		border-width: 2px;
		color: #254880;
	}

	.btn--success {
		background-color: #008a00;
		border: 1px solid #008a00;
    color: #fff;
  }

	.btn--success:focus-visible {
		outline-offset: .125rem;
	}

	.btn--success.btn--outlined:not(:disabled) {
		background-color: #fff;
		border: 2px solid #008a00;
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
		border: 2px solid #daedda;
	}

	.btn--success:disabled.btn--ghost {
		background-color: transparent;
		border: none;
	}
	
	.btn--success:not(:disabled):hover {
		background-color: #076d08;
		border: 1px solid #076d08;
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
		border-width: 2px;
	}

	/* modifiers */
	.btn--elevated {
	  box-shadow: var(--uikit-button--elevation, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
	}

	.btn--underline {
		text-decoration: underline;
		text-underline-offset: 2px;
	}

  .btn--rounded {
    padding: 0;
    width: var(--uikit-button-height);
    border-radius: calc(var(--uikit-button-height) / 2);
  }
	
	/* states */
	.btn[data-state="loading"] {
		gap: 8px;
	}

	.btn[data-state="selected"] {
		border-color:  #333335;
		background-color: #333335;
		color: #fff;
	}

	.btn[data-state="selected"]:hover {
		background-color: #555659;
		border-color: #555659;
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
		width: 16px;
		height: 16px;
		animation: rotating .5s linear infinite;
	}
</style>