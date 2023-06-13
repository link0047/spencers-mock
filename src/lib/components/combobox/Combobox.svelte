<script lang="ts">
  import type { Writable } from "svelte/store";
  import type { ComboboxStore } from "./ComboboxStore";
  export let rounded = false;
  export let label = "";
  export let state: Writable<ComboboxStore>;
  const id = $state.comboboxId;

  function handleKeyup(event: KeyboardEvent) {
    const { target } = event;
    console.log(target?.value);
  }
</script>

<div class="combobox" class:combobox--rounded={rounded} {...$$restProps}>
  <input
    {id}
    role="combobox"
    class="combobox__native-control"
    type="text"
    aria-labelledby=""
    aria-invalid="false"
    aria-autocomplete="list"
    aria-expanded={$state.open}
    value=""
    tabindex={0}
    aria-controls="<popoverid>"
    aria-owns="<popoverid>"
    aria-activedescendant="<listboxOptionId>"
    on:keyup={handleKeyup}
    on:keyup
    on:blur
    on:focus
    on:click
    {...$$restProps}
  />
  <button type="button" class="combobox__action" aria-label={label}>
    <svg class="icon" role="presentation" viewBox="0 0 24 24">
      <path
        d="m20.87 20.17-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"
      />
    </svg>
  </button>
</div>

<style>
  .icon {
    width: 24px;
    height: 24px;
    fill: #212121;
    stroke: #212121;
    stroke-width: 1px;
  }

  .combobox {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    position: relative;
    display: grid;
    grid-template-columns: 1fr 64px;
    width: 100%;
  }

  .combobox--rounded .combobox__native-control {
    border-top-left-radius: 18px;
    border-bottom-left-radius: 18px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    padding: 0 16px;
  }

  .combobox__native-control {
    outline: none;
    color: #212121;
    font-size: 16px;
    font-weight: 400;
    line-height: 1;
    letter-spacing: 0.04em;
    width: 100%;
    height: 36px;
    padding: 0 8px;
    border: 1px solid;
    border-color: #949499;
    border-radius: 4px;
    background: none;
    font-size: inherit;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    transition: border 250ms cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1);
    will-change: border, box-shadow;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 0px 0px;
  }

  .combobox__action {
    height: 36px;
    border: 1px solid;
    border-color: #949499;
    border-left: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 18px;
    border-bottom-right-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .combobox__action:hover {
    background-color: #e6e6e6;
    cursor: pointer;
  }

  .combobox__action:focus-visible {
    outline: 2px solid #3367d6;
    outline-offset: -2px;
  }

  .combobox__action:hover,
  .combobox__native-control:hover {
    border-color: #000;
    box-shadow: inset 0 0 0 1px #000;
  }

  .combobox__native-control:focus {
    border-color: #3367d6 #285bc7 #2451b2;
    box-shadow: inset 0 0 0 1px #2451b2;
  }
</style>
