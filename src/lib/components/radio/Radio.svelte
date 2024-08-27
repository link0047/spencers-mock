<script lang="ts">
  import type { Writable } from "svelte/store";
	import generateId from "$lib/client/util/local-unique-id-generator.js";
	import { getContext, onMount } from "svelte";

	export let value: string = "";
  export let variant: string | null = null;

  const valueStore: Writable<string> = getContext("value");
	
	const uid: string = generateId("radio");
	const id: string =`uikit-radio-${uid}`;
  let inputRef: HTMLInputElement;

  /**
   * Handles the change event of the input element.
   * 
   * @param {Event} event - The event object.
   * @returns {void}
   */
	function handleChange({ target }: Event): void {
    console.log(target);
    if ($valueStore) {
		  $valueStore = (target as HTMLInputElement)?.value;
    }
	}

  onMount(() => {
    if (inputRef.checked && $valueStore) {
      $valueStore = inputRef.value;
    }
  });
</script>

<div class="radio" class:radio--box={variant === "box"}>
	<input 
		{id}
    bind:this={inputRef}
		class="radio__native-control"
		type="radio"
		{value}
		on:change={handleChange}
    on:blur
    on:focus
    on:change
		{...$$restProps}
	>
	<label class="radio__label" for={id}>
		<slot />
	</label>
</div>

<style>
  :root {
    --ui-kit-radio-checked-color: #000;
    --ui-kit-radio-focus-visible-color: #015fcc;
  }


  .radio {
    position: relative;
    display: inline-flex;
    /* width: fit-content; */
    min-height: 24px;
    align-items: center;
    flex-flow: row wrap;
    cursor: pointer;
  }

  .radio__native-control {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    opacity: 0;
    cursor: inherit;
  }

	.radio--box .radio__label {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
    padding: 0 8px;
		min-height: 40px;
		min-width: 56px;
		flex: 1 1 0;
		border-radius: 4px;
		border: 1px solid #888;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
		font-size: .875rem;
    outline-offset: -2px;
	}

  .radio--box:has(.radio__native-control:checked) .radio__label {
    outline: 2px solid var(--ui-kit-radio-checked-color);
	}

	.radio--box:has(.radio__native-control:focus-visible) .radio__label {
		outline: 2px solid var(--ui-kit-radio-focus-visible-color);
	}

  .radio--box:has(:hover) .radio__label {
    background-color: #f7f7f7;
    outline: 2px solid #212121;
  }

  .radio--box:has(:checked:hover) .radio__label {
    background-color: #f4f9f4;
    outline: 2px solid var(--ui-kit-radio-checked-color);
  }


  .radio--box:has(.radio__native-control:disabled) .radio__label {
    color: #444547;
    font-weight: 400;
    background-color: #eeeeef;
    border: 1px solid #eeeeef;
    box-shadow: none;
    background-image: url("data:image/svg+xml,%3Csvg fill='%23666' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='m23.8 0 .2.2L.2 24l-.2-.2L23.8 0Z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }

  .radio--box:has(.radio__native-control:disabled) {
    cursor: not-allowed;
  }

  .radio--box:has(.radio__native-control:disabled:hover) .radio__label {
    outline: none;
    background-color: #eeeeef;
  }

  .radio:not(.radio--box):before {
    box-sizing: border-box;
    content: "";
    width: 18px;
    height: 18px;
    border: 2px solid #767677;
    border-radius: 50%;
    margin-right: 4px;
  }

  .radio:not(.radio--box):has(.radio__native-control:focus-visible, :hover):before {
    border-color: #000;
  }

  .radio:not(.radio--box):has(.radio__native-control:checked):before {
    border-color: #0075ff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle fill='%230075ff' cx='50%25' cy='50%25' r='8'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: cover;
  }

  .radio:not(.radio--box):has(.radio__native-control:checked):focus:before,
  .radio:not(.radio--box):has(.radio__native-control:checked):hover:before {
    border-color: #004699;
  }
</style>