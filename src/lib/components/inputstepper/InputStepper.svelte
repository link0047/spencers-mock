<script lang="ts">
  import Icon from "$lib/components/icon";
  export let min: number = 1;
  export let max: number = 99;
	export let maxlength: number = 2;
  export let value: number = 1;

  function isNumber(value: any): boolean {
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

<div class="input-stepper">
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
    bind:value
    on:input={handleInput}
    on:change={handleChange}
    on:keydown={handleKeyDown}
    type="number"
    pattern="[0-9]*"
    inputmode="numeric"
    aria-label="Number Stepper"
    aria-valuemin={min}
    aria-valuemax={max}
    aria-valuenow={value}
    aria-valuetext={`${value}`}
    autocomplete="off"
    autocorrect="off"
    {maxlength}
    class="input-stepper__native-control"
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
  .input-stepper {
    width: fit-content;
    display: grid;
    grid-template-columns: 36px 36px 36px;
  }

  .input-stepper__action {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: 0;
    background-color: #fff;
    overflow: hidden;
    touch-action: manipulation;
    user-select: none;
    appearance: none;
    border: 1px solid;
    border-color: #949499;
    cursor: pointer;
		transition: background-color ease-in-out .3s;
  }

  .input-stepper__action:disabled {
    cursor: not-allowed;
  }

	.input-stepper__action[disabled] :global(.icon) {
		fill: #989596;
	}

	.input-stepper__action:hover {
		background-color: #f2f2f2;
	}

  .input-stepper__action--increment {
    border-radius: 0 8px 8px 0;
    border-left: none;
  }

  .input-stepper__action--decrement {
    border-radius: 8px 0 0 8px;
    border-right: none;
  }

  .input-stepper__native-control {
    border-radius: 0;
    border: 1px solid;
		border-left: none;
		border-right: none;
    border-color: #949499;
    padding: 0;
    margin: 0;
		outline: 0;
    appearance: none;
    text-align: center;
		background-color: #fff;
		color: #212121;
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
