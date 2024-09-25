<script lang="ts">
	import { writable, type Writable } from "svelte/store";
  import { setContext } from "svelte";
	
	export let label: string = "";

	const index:  Writable<number> = writable(0);
	const children:  Writable<HTMLElement[]> = writable([]);

	setContext("state", { index, children });
	
	function menuAction(node: HTMLElement) {
		const controller = new AbortController();
		$children = Array.from(node.querySelectorAll(".menu__item"));
		$children[$index].setAttribute("tabindex", "0");

		function move(step: number): void {
			const len = $children.length;
			
			const currentItem = $children[$index];
			currentItem.setAttribute("tabindex", "-1");
			
			$index = ($index + step + len) % len;
			
			const nextItem = $children[$index];
			nextItem.setAttribute("tabindex", "0");
			nextItem.focus();
		}
		
		function handleKeyup({ key }: KeyboardEvent): void {
			switch(key) {
				case "Tab":
					$children[$index].focus();
					break;
				case "Down":
				case "ArrowDown":
					move(1);
					break;
				case "Up":
				case "ArrowUp":
					move(-1);
					break;
			}
		}

		node.addEventListener("keyup", handleKeyup, { signal: controller.signal });
		
		return {
			destroy() {
				controller.abort();
			}
		}
	}
</script>

<div
	role="menu"
	aria-label={label}
	class="menu"
	use:menuAction
>
	<slot />
</div>

<style>
  .menu {
    background-color: #fff;
    display: grid;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    padding: 0;
    margin: 0;
    border-radius: .25rem;
  }

  @media print {
    .menu {
      display: none;
    }
  }
</style>