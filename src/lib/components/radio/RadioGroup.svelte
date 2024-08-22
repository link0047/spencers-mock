<script lang="ts">
  import type { Writable } from "svelte/store";
	import { writable } from "svelte/store";
	import { setContext } from "svelte"
	
	export let useRovingIndex = false;
	export let required = false;
	export let direction = "ltr";
	export let value: string = "";
	export let scrollable: boolean = false;

	export const valueStore: Writable<string> = writable(value);
	const selected = writable("");
	
	setContext("selected", selected);
	setContext("value", valueStore);

	/**
   * Roving index action for keyboard navigation.
   * @param {HTMLElement} node - The element to which the action is applied.
   * @returns {{destroy: () => void}} - An object with a destroy method to clean up event listeners.
   */
	function rovingIndex(node: HTMLElement) {
		let items: HTMLElement[] = Array.from(node.querySelectorAll("[tabindex]:not(:disabled)"));
		let currentIndex = items.findIndex(element => element.id === $selected);
		
		function handleKeyDown(event: KeyboardEvent) {
			switch (event.key) {
				case "ArrowDown":
				case "ArrowRight":
					currentIndex = (currentIndex + 1) % items.length;
					break;
				case "ArrowUp":
				case "ArrowLeft":
					currentIndex = (currentIndex - 1 + items.length) % items.length;
					break;
				case "Home":
					currentIndex = 0;
					break;
				case "End":
					currentIndex = items.length - 1;
					break;
				default:
					return;
			}


			$selected = items[currentIndex].id;
			$valueStore = items[currentIndex]?.value;
			items[currentIndex].focus({ focusVisible: true });
			event.preventDefault();
		}

		node.addEventListener("keydown", handleKeyDown);
		
		return {
			destroy() {
				node.removeEventListener("keydown", handleKeyDown);
			}
		}
	}

	let rovingIndexAction = useRovingIndex ? rovingIndex : () => {};

	valueStore.subscribe((val) => {
    value = val;
  });
</script>

<div 
	role="radiogroup" 
	aria-required={required}
	dir={direction}
	class="radio-group"
	class:radio-group--scroll-snap={scrollable}
	use:rovingIndexAction
	{...$$restProps}
>
	<slot />
</div>

<style>
	.radio-group {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(96px, 1fr));
		gap: .5rem;
	}

	.radio-group--scroll-snap {
		overflow-x: auto;
		overflow-y: hidden;
		overscroll-behavior-x: none;
		scroll-snap-type: x mandatory;
	}

	:global(.radio-group--scroll-snap .radio) {
		flex-shrink: 0;
	}

	/**
		need to fix this later
	*/
	:global(.radio-group:has(.radio, .swatch)) {
		display: flex;
	}
</style>