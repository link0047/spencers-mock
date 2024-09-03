<script lang="ts">
  import type { Writable } from "svelte/store";
	import generateId from "$lib/client/util/local-unique-id-generator";
	import { getContext, onMount } from "svelte"; 
	
	export let type: string = "radio";
	export let value: string = "";
	export let color: string = "transparent";

	const valueStore: Writable<string> = getContext("value");
	
	const uid: number = generateId("swatch");
	const id: string = `uikit-swatch-${uid}`;
	let inputRef: HTMLInputElement;

	 /**
   * Handles the change event of the input element.
   * 
   * @param {Event} event - The event object.
   * @returns {void}
   */
  function handleChange({ target }: Event): void {
		$valueStore = (target as HTMLInputElement)?.value;
	}

	onMount(() => {
		if (inputRef.checked) {
			$valueStore = inputRef.value;
		}
	});
</script>

<div class="swatch" style="--swatch-color:{color}">
	<input bind:this={inputRef} class="swatch__native-control" {id} {type} {value} on:change={handleChange} {...$$restProps}>
	<label class="swatch__label" for={id}>
		<slot />
	</label>
</div>

<style>
	:root {
		--swatch-color: transparent;
		--swatch-gap: 4px;
		--swatch-alignment: center;
	}
	
	.swatch {
		box-sizing: border-box;
		position: relative;
		display: inline-flex;

	}
	
	.swatch__native-control {
		position: absolute;
    top: 0;
    left: 0px;
    margin: 0;
    padding: 0;
    cursor: inherit;	
		opacity: 0;
	}
	
	.swatch__label {
		display: grid;
		gap: var(--swatch-gap, 4px);
		text-align: var(--swatch-alignment, center);
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
		font-size: .875rem;
		border-radius: 4px;
		cursor: pointer;
	}

	.swatch__label:before {
		background: var(--swatch-color, transparent);
    content: "";
		display: flex;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 0 0 1px #ccc;
	}

	.swatch__native-control:checked + .swatch__label:before {
		outline: 2px solid #000;
		outline-offset: 2px;
	}

	.swatch__native-control:focus-visible + .swatch__label:before,
  .swatch__native-control:hover + .swatch__label:before {
		outline: 2px solid #015fcc;
		outline-offset: 2px;
  }
</style>