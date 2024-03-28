<script>
  export let disabled = false;
  export let isLoading = false;
  export let noSizeSelected = false;
  import { getContext } from "svelte";

  const state = getContext("state");
  const id = $state.generateOptionId();
  const uid = `${$state.id}-option-${id}`;

  function handleClick() {
    if (disabled || isLoading) return;
    if ($state.selectedIndex !== id) {
      $state.selectedIndex = id;
    }
  }

  if (id === 0 && disabled) {
    $state.selectedIndex = 1;
  }

  $: selected = $state.selectedIndex === id;
</script>

<button
  id={uid}
  type="button"
  data-state={selected ? "selected" : "unselected"}
  class="fulfillment__option"
  {disabled}
  class:loading={isLoading}
  class:fulfillment__option--disabled={disabled}
  on:click={handleClick}
  on:click
  on:keydown
>
  <slot name="icon" />
  <h3 class="option__heading">
    <slot name="heading" />
  </h3>
  <div class="option__message" class:nosize-color-selected={noSizeSelected}>
    <slot name="description" />
  </div>
</button>

<style>
  .fulfillment__option {
    position: relative;
    display: grid;
    grid-template-rows: 24px minmax(1rem,max-content) 1fr;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
      sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
    box-sizing: border-box;
    border: 1px solid #888;
    border-radius: 8px;
    padding: 16px;
    user-select: none;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    background-color: #fff;
    gap: 8px;
    cursor: pointer;
  }

  .fulfillment__option:active {
    background-color: #fff;
  }

  [data-state="selected"]:not(:disabled),
  .fulfillment__option:active:not(:disabled):not(.loading):not([data-state="unselected"]) {
    box-shadow: inset 0 0 0 1px #008300;
    background-color: #f4f9f4;
  }

  .fulfillment__option--disabled:active,
  .fulfillment__option--disabled {
    background-color: #f7f7f7;
    border-color: #666;
    color: #666;
    cursor: not-allowed;
  }

  .fulfillment__option:focus-visible {
    outline-offset: 2px;
    outline: 2px dotted #888;
  }

  @media (max-width: 560px) {
    .fulfillment__option {
      padding: 8px;
    }
  }

  .option__heading {
    display: flex;
    align-items: center;
    text-align: left;
    margin: 0;
    line-height: 1;
    font-weight: 700;
    font-size: 1rem;
    letter-spacing: 0;
    gap: 8px;
  }

  .option__message {
    font-size: 0.875rem;
    font-weight: 400;
    display: flex;
    flex-flow: row wrap;
    align-items: start;
    text-align: left;
  }

  [data-state="selected"]:not(:disabled) .option__message {
    color: #008300;
  }

  :global([data-state="selected"]:not(:disabled) .option__message > span) {
    color: #c2452d;
  }

  :global([data-state="selected"]:not(:disabled) .option__message > svg) {
    fill: #c2452d;
  }

  [data-state="selected"]:not(:disabled) .nosize-color-selected {
    color: #000;
  }
</style>
