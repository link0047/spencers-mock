<script lang="ts">
	import Portal from "svelte-portal";
  import { browser } from "$app/environment";
	import generateId from "$lib/client/util/local-unique-id-generator";
	import { writable } from "svelte/store";
	import { setContext, afterUpdate, onMount, onDestroy, tick } from "svelte";
	
	export let value = "";
	export let invalid = false;
	export let gap = 8;
	export let stayOpen = false;
	export let fullwidth = false;
	
	let ref: HTMLElement;
	let inputRef: HTMLElement;
	let listboxRef: HTMLElement;
	let listboxStyling = "";
	let optionId = 0;
	let open = writable(false);
	
	const uid = generateId("combobox");
	const id = `aria-uikit-combobox-${uid}`;
	const listboxId = `${id}-listbox`;
	const state = writable({
		invalid,
		activeDescendant: null,
		getOptionId,
		index: -1,
		listbox: null
	});

	export function resetOptions() {
		optionId = 0;
		$state.activeDescendant = null;
		$state.index = -1;
		Array.from(listboxRef.querySelectorAll(".listbox__option")).forEach(option => option.setAttribute("tabindex", "-1"));
	}

	export function close() {
		console.log("closing")
		$open = false;
		resetOptions();
	}


	function getOptionId() {
		return `${id}-option-${optionId++}`;
	}

	async function handleClickedOutside({ target }: MouseEvent): Promise<void> {
		await tick();
		if (stayOpen || !$open) return;

		if (!ref.contains(target as HTMLElement) && !listboxRef.contains(target as HTMLElement) && $open) {
			$open = false;
		}
	}

	function move(step: number) {
		const children = listboxRef.querySelectorAll(".listbox__option");
		const maxSteps = children.length - 1;
		if ($state.index !== -1) children[$state.index].setAttribute("tabindex", "-1");
		
		$state.index += step;
		if ($state.index < 0) {
			$state.index = maxSteps;
		}

		if ($state.index > maxSteps) {
			$state.index = 0;
		}

		const selected = children[$state.index];
		value = selected.textContent?.trim();
		selected.setAttribute("tabindex", "0");
		selected.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		$state.activeDescendant = selected.id;
	}
	
	function handleKeyup(event) {
	  switch(event.key) {
			case "ArrowDown":
				move(1);
				break;
			case "ArrowUp":
				move(-1);
				break;
			case "Escape":
				$open = false;
				break;
			default:
				$open = true;
				break;
		}
	}

	function handleClick() {
		$open = true;
	}

	function touchOutsideInputHandler(event) {
		if (event.target !== inputRef) {
			inputRef.blur();
		}
	}

	function handleFocus() {
		resetOptions();
		if (!fullwidth) {
			const { width, left, bottom } = inputRef.getBoundingClientRect();
			listboxStyling = `position:fixed;top:0;left:0;width:${width}px;transform:translate3d(${left}px,${bottom + gap}px,0);`;
		} else {
			listboxStyling = `position:fixed;top:0;left:0;width:100%;top:52px;padding:12px 0;max-height:calc(100dvh - 52px)`;
		}

		document.addEventListener("touchstart", touchOutsideInputHandler);
		$open = true;
	}

	function handleBlur() {
		if (stayOpen) return;
		listboxRef.querySelectorAll(".listbox__option")[$state.index]?.setAttribute("tabindex", "-1");
		$state.index = -1;
		$state.activeDescendant = null;
		document.removeEventListener("touchstart", touchOutsideInputHandler);
		// $open = false;
	}

	function handleDocumentKeyup(event) {
		if (event.ctrlKey && event.key === "k") {
			inputRef.focus({ focusVisible: true });
		}
	}

	function debounceAnimationFrame(callback) {
	  let animationFrameId;
	
	  return () => {
	    cancelAnimationFrame(animationFrameId);
	    animationFrameId = requestAnimationFrame(callback);
	  };
	}

	function handleResizeLogic() {
		if (!fullwidth) {
			const { width, left, bottom } = inputRef.getBoundingClientRect();
			listboxStyling = `position:fixed;top:0;left:0;width:${width}px;transform:translate3d(${left}px,${bottom + gap}px,0);`;
		} else {
			listboxStyling = `position:fixed;top:0;left:0;width:100%;top:52px;padding:12px 0;max-height:calc(100dvh - 52px)`;
		}
	}

	const handleResize = debounceAnimationFrame(handleResizeLogic);
	setContext("open", open);
	setContext("state", state);

	onMount(() => {
    if (browser) {
      document.addEventListener("keyup", handleDocumentKeyup);
			window.addEventListener("resize", handleResize);
			window.addEventListener("click", handleClickedOutside);
      const { width, left, bottom } = inputRef.getBoundingClientRect();
      $state.listbox = listboxRef;
      if (!fullwidth) {
				const { width, left, bottom } = inputRef.getBoundingClientRect();
				listboxStyling = `position:fixed;top:0;left:0;width:${width}px;transform:translate3d(${left}px,${bottom + gap}px,0);`;
			} else {
				listboxStyling = `position:fixed;top:0;left:0;width:100%;top:52px;padding:12px 0;max-height:calc(100dvh - 52px)`;
			}
    }
	});

	onDestroy(() => {
    if (browser) {
		  document.removeEventListener("keyup", handleDocumentKeyup);
			document.removeEventListener("touchstart", touchOutsideInputHandler);
		  window.removeEventListener("resize", handleResize);
			window.removeEventListener("click", handleClickedOutside);
    }
	});

	afterUpdate(() => {
		$state.invalid = invalid;
	});
</script>

<div 
	bind:this={ref} 
	class="combobox" 
	data-state={$open ? "open" : ""}
>
	<button class="combobox__action" type="button" disabled aria-label="search">
		<svg class="icon" focusable="false" viewBox="0 0 24 24" role="presentation">
			<path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"/>
		</svg>
	</button>
	<input
    {id}
		bind:this={inputRef}
		bind:value={value}
    role="combobox"
    class="combobox__native-control"
    type="text"
    aria-labelledby={null}
		aria-label="Search bar"
    aria-invalid="false"
    aria-autocomplete="list"
    aria-expanded={$open}
    aria-controls={listboxId}
    aria-owns={listboxId}
    aria-activedescendant={$state.activeDescendant}
    on:keyup={handleKeyup}
    on:keyup
		on:keydown
		on:input
		on:blur={handleBlur}
    on:blur
		on:focus={handleFocus}
    on:focus
		on:click={handleClick}
    on:click
    {...$$restProps}
  />
</div>
<Portal>
	<div
		data-state={$open ? "open" : "closed"}
		class="combobox__popover"
		class:combobox__popover--expanded={stayOpen}
		style={listboxStyling}
	>
		<div bind:this={listboxRef} id={listboxId} class="combobox__listbox" role="listbox">
			<slot />
		</div>
	</div>
</Portal>

<style>
	.icon {
		width: 20px;
		height: 20px;
	}
	
	.combobox {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    position: relative;
		display: grid;
		align-items: center;
    width: 100%;
    max-width: 640px;
	}

	.combobox__action {
		box-sizing: border-box;
		position: absolute;
		right: 4px;
		width: 32px;
		height: 32px;
		padding: 0;
		margin: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid transparent;
		border-radius: 50%;
	}

	.combobox__action:hover {
		background-color: #3c404314;
		cursor: pointer;
	}

	.combobox__native-control {
		box-sizing: border-box;
		color: #111;
		font-size: 1rem;
		font-weight: 400;
		line-height: 1;
		letter-spacing: .04em;
		width: 100%;
		height: 40px;
		padding: 0 40px 0 24px;
		margin: 0;
		border: 1px solid #dcdcdc;
		border-radius: 8px;
		appearance: none;
		background-color: #f5f5f5;
	}

	.combobox__native-control:focus {
		background-color: #fff;
	}

	.combobox__native-control:focus-visible {
		outline-offset: -1px;
		outline: 2px solid #174ea6;
	}
	
	.combobox__popover {
		position: fixed;
		border: 1px solid #dcdcdc;
		background-color: #fff;
		display: grid;
		gap: 8px;
		box-sizing: border-box;
		padding: 12px 8px;
		border-radius: 8px;
		opacity: 0;
		pointer-events: none;
		max-height: 512px;
		overflow-y: auto;
		z-index: 520;
		transition: opacity .15s ease-in;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
	}

	.combobox__popover[data-state="open"] {
		opacity: 1;
		pointer-events: initial;
	}

	.combobox__popover--expanded {
		box-shadow: none;
		border: transparent;
	}
</style>