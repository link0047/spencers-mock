<script>
	import { getContext } from "svelte";
	export let selected = false;
	export let tag = "div";
	let state = getContext("state");
	export let id = $state.getOptionId();

	function handlePointerover({ currentTarget }) {
		const options = Array.from($state.listbox.querySelectorAll(".listbox__option"));
		if ($state.index !== -1) {
			options[$state.index].setAttribute("tabindex", "-1");
		}
		
		$state.index = options.indexOf(currentTarget);
		$state.activeDescendant = currentTarget.id;
		currentTarget.setAttribute("tabindex", "0");
	}
</script>
<svelte:element 
	this={tag}
	{id}
	class="listbox__option"
	role="option"
	tabindex={selected ? 0 : -1}
	aria-selected={selected}
	on:click
	on:pointerdown
	on:pointerup
	on:pointerover={handlePointerover}
	{...$$restProps}
>
	<slot />
</svelte:element>

<style>
	.listbox__option,
	.listbox__option:visited {
		min-height: 32px;
		padding: 0 8px;
		display: grid;
		align-items: center;
		font-size: .875rem;
		grid-template-columns: minmax(auto, max-content) 1fr minmax(auto, max-content);
		gap: 8px;
		color: #212121;
		text-decoration: none;
	}
	
	.listbox__option[tabindex="0"] {
		background-color: #f2f2f2;
		cursor: pointer;
	}
</style>