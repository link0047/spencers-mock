<script lang="ts">
  import { afterUpdate } from "svelte";
  
  export let variant: string | null = null;
  export let size: string | null = null;
  export let state: string | null = null;
	export let type: "button" | "reset" | "submit" = "button";
  export let elevation: number = 0;

  let internalState: string | null = null;
  
  $: internalState = state;
  
  afterUpdate(() => {
    internalState = state;
  }); 
</script>

<button
  class="btn"
  class:btn--primary={variant === "primary"}
  class:btn--outlined={variant === "outlined"}
  class:btn--ghost={variant === "ghost"}
	class:btn--icon={variant === "icon"}
  class:btn--sizeXS={size === "xs"}
  class:btn--sizeSM={size === "sm"}
  class:elevation1={elevation === 1}
  data-state={state}
  {type}
  on:click
  on:mouseover
  on:mouseenter
  on:mouseleave
  on:pointerdown
  on:pointerenter
  on:pointerleave
  on:pointerup
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
    --btn-color: #38393b;
    --btn-hover-background-color: #e5e5e5;
    --btn-hover-border-color: #aaadb2;
  }
  
  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  .icon {
    fill: #212121;
    width: 16px;
    height: 16px;
    animation: rotating .5s linear infinite;
  }
  
  .btn {
    align-items: center;
    appearance: none;
    background-color: #f2f2f2;
    border: 1px solid #aaadb2;
    border-radius: 4px;
    color: var(--btn-color, #38393b);
    display: inline-flex;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 0.875rem;
    font-weight: 500;
    height: 36px;
    letter-spacing: 0.04em;
    padding-inline: 8px;
    position: relative;
    align-items: center;
    justify-content: center;
		min-width: fit-content;
		text-align: center;
    touch-action: manipulation;
    user-select: none;
    margin: 0;
    transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .btn[data-state="loading"] {
    gap: 8px;
  }

  .btn--primary {
    background-color: #3f619a;
    border: 1px solid #214072;
    color: #fff;
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

	.btn--icon {
		background-color: transparent;
    border: 1px solid transparent;
		width: 36px;
		height: 36px;
    padding: 0;
		border-radius: 50%;
    transition: background-color .2s cubic-bezier(0.4, 0, 0.2, 1), border-color .2s cubic-bezier(0.4, 0, 0.2, 1);
	}
  
  .btn:disabled {
    cursor: not-allowed;
    color: #aeaeae;
    font-weight: 400;
    border: 1px solid #bdc1c6;
  }

  .btn:not(:disabled):hover {
    background-color: var(--btn-hover-background-color, #e5e5e5);
    cursor: pointer;
  }

  .btn--primary:not(:disabled):hover {
    background-color: #2a508f;
  }

  .btn--outlined:not(:disabled):hover {
    background-color: var(--btn-hover-background-color, #f2f2f2);
    border-color: #222;
  }
  
  .btn--ghost:not(:disabled):hover {
    background-color: var(--btn-hover-background-color, #f2f2f2);
    border: 1px solid var(--btn-hover-border-color, #aaadb2);
  }

	.btn--icon:not(:disabled):hover {
    background-color: var(--btn-hover-background-color, #f2f2f2);
    border: 1px solid var(--btn-hover-border-color, #aaadb2);
  }
  
  .btn:focus-visible {
    outline-offset: 2px;
    outline: 2px solid #007acc;
  }

  .elevation1 {
    background-color: #fff;
    box-shadow: 0 .0625rem .125rem .0625rem #00000026;
  }

  .elevation1:not(:disabled):hover {
    --btn-hover-background-color: #EAEAEA;
    border: 1px solid transparent;
  }
</style>