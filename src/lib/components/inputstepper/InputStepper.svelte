<script>
  import Icon from "$lib/components/icon";
  export let min = 1;
  export let max = 99;
  export let value = 1;

  let isDecrementDisabled = false;
  let isIncreaseDisabled = false;
</script>

<div class="input-stepper">
  <button
    type="button"
    tabindex="-1"
    disabled={isDecrementDisabled}
    aria-disabled={isDecrementDisabled}
    aria-label="button to decrement counter for number stepper"
    class="input-stepper__decrement-action"
  >
    <Icon>
      <path d="M19 13H5v-2h14v2Z" />
    </Icon>
  </button>
  <input
    bind:value
    inputmode="decimal"
    type="text"
    pattern="[0-9]*(.[0-9]+)?"
    aria-label="Number Stepper"
    role="spinbutton"
    aria-valuemin={min}
    aria-valuemax={max}
    aria-valuenow={value}
    aria-valuetext={`${value}`}
    autocomplete="off"
    autocorrect="off"
    maxlength="3"
    class="input-stepper__native-control"
  />
  <button
    type="button"
    tabindex="-1"
    disabled={isIncreaseDisabled}
    aria-disabled={isIncreaseDisabled}
    aria-label="button to increment counter for number stepper"
    class="input-stepper__increment-action"
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
    grid-template-columns: 36px 40px 36px;
  }

  .input-stepper__decrement-action,
  .input-stepper__increment-action {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: 0;
    background-color: transparent;
    overflow: hidden;
    touch-action: manipulation;
    user-select: none;
    appearance: none;
    border: 1px solid;
    border-color: #949499;
    cursor: pointer;
  }

  .input-stepper__increment-action {
    border-radius: 0 8px 8px 0;
    border-left: none;
  }

  .input-stepper__decrement-action {
    border-radius: 8px 0 0 8px;
    border-right: none;
  }

  .input-stepper__native-control {
    border-radius: 0;
    border: 1px solid;
    border-color: #949499;
    padding: 0;
    margin: 0;
    appearance: none;
    text-align: center;
  }
</style>
