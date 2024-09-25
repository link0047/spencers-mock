<script lang="ts">
  import generateId from "$lib/client/util/local-unique-id-generator";
  import Icon from "$lib/components/icon";

  export let min: number = 1;
  export let max: number = 99;
	export let maxlength: number = 2;
  export let value: number = 1;
  export let label: string = "Number Stepper";
  export let rounded: boolean = false;

  const uid: number = generateId("inputstepper");
	const id: string = `uikit-inputstepper-${uid}`;

  function isNumber(value: unknown): boolean {
    return typeof value === "number" && !isNaN(value);
  }

	function increment() {
    if (value < max) {
		  value = value + 1;
    }
	}

	function decrement() {
    if (value > min) {
		  value = value - 1;
    }
	}

	function handleChange() {
		if (isNaN(value) || value <= 0) {
			value = 1;
		}
	}

  function handleInput() {
    if (!isNumber(value)) {
      return;
    } else if (value < min) {
      value = min; // Clamp to min value
    } else if (value > max) {
      value = max; // Clamp to max value
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    // Allowed keys: 0-9, Backspace, Arrow keys, Home, End
    const allowedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace", "ArrowLeft", "ArrowRight", "Home", "End", "Tab"];

    // Handle negative numbers
    if (event.key === "-" && value === min) return;

    // Check if the key pressed is allowed
    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
      return;
    }

    // Prevent input of multiple leading zeros
    if (value === 0 && event.key === "0") {
      event.preventDefault();
      return;
    }
  }

	$: isDecrementDisabled = value <= min;
  $: isIncrementDisabled = value >= max;
</script>

<div 
  class="input-stepper"
  class:input-stepper--rounded={rounded}
>
  <button
    type="button"
    disabled={isDecrementDisabled}
    aria-label="decrease quantity"
    class="input-stepper__action input-stepper__action--decrement"
		on:click={decrement}
  >
    <Icon>
      <path d="M19 13H5v-2h14v2Z" />
    </Icon>
  </button>
  <input
    {id}
    bind:value
    class="input-stepper__native-control"
    type="number"
    pattern="[0-9]*"
    inputmode="numeric"
    aria-label={label}
    aria-valuemin={min}
    aria-valuemax={max}
    aria-valuenow={value}
    aria-valuetext={`${value}`}
    autocomplete="off"
    autocorrect="off"
    {maxlength}
    on:input={handleInput}
    on:change={handleChange}
    on:keydown={handleKeyDown}
    {...$$restProps}
  />
  <button
    type="button"
    disabled={isIncrementDisabled}
    aria-label="increase quantity"
    class="input-stepper__action input-stepper__action--increment"
		on:click={increment}
  >
    <Icon>
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z" />
    </Icon>
  </button>
</div>

<style>
  :root {
    --uikit-input-stepper-action-width: 2.5rem;
    --uikit-input-stepper-action-height: 2.5rem;
    --uikit-input-stepper-border-radius: 0.5rem;
    --uikit-input-stepper-border-color: #949499;
    --uikit-input-stepper-bg-color: #fff;
    --uikit-input-stepper-hover-bg-color: #f2f2f2;
    --uikit-input-stepper-disabled-icon-color: #989596;
    --uikit-input-stepper-text-color: #212121;
    --uikit-input-stepper-transition-duration: 0.3s;
  }

  .input-stepper {
    width: fit-content;
    display: grid;
    grid-template-columns: var(--uikit-input-stepper-action-width) var(--uikit-input-stepper-action-width) var(--uikit-input-stepper-action-width);
  }

  .input-stepper--rounded {
    --uikit-input-stepper-border-radius: 99999px;
  }

  .input-stepper__action {
    width: var(--uikit-input-stepper-action-width);
    height: var(--uikit-input-stepper-action-height);
    display: flex;
    align-items: center;
    justify-content: center;
    outline: 0;
    color: var(--uikit-input-stepper-text-color);
    background-color: var(--uikit-input-stepper-bg-color);
    overflow: hidden;
    touch-action: manipulation;
    user-select: none;
    appearance: none;
    border: 1px solid;
    border-color: var(--uikit-input-stepper-border-color);
    cursor: pointer;
    transition: background-color ease-in-out var(--uikit-input-stepper-transition-duration);
  }

  .input-stepper__action:disabled {
    cursor: not-allowed;
  }

  .input-stepper__action[disabled] :global(.icon) {
    fill: var(--uikit-input-stepper-disabled-icon-color);
  }

  .input-stepper__action:hover {
    background-color: var(--uikit-input-stepper-hover-bg-color);
  }

  .input-stepper__action--increment {
    border-radius: 0 var(--uikit-input-stepper-border-radius) var(--uikit-input-stepper-border-radius) 0;
    border-left: none;
  }

  .input-stepper__action--decrement {
    border-radius: var(--uikit-input-stepper-border-radius) 0 0 var(--uikit-input-stepper-border-radius);
    border-right: none;
  }

  .input-stepper__native-control {
    border-radius: 0;
    border: 1px solid;
    border-left: none;
    border-right: none;
    border-color: var(--uikit-input-stepper-border-color);
    padding: 0;
    margin: 0;
    outline: 0;
    appearance: none;
    text-align: center;
    background-color: var(--uikit-input-stepper-bg-color);
    color: var(--uikit-input-stepper-text-color);
  }
  
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
</style>
