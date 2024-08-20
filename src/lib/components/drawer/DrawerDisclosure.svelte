<script lang="ts">
	import Button from "$lib/components/button";
  import { get } from "svelte/store";
	export let state;

	const id = state.disclosureId;
	const drawerId = state.drawerId;
	
	function handleClick() {
		state.open.set(!get(state.open));
	}
</script>
<Button 
  id={id} 
	aria-expanded={get(state.open)} 
	aria-controls={drawerId} 
	aria-haspopup="dialog"
	variant="icon"
	on:click={handleClick}
	on:blur
	on:focus
	on:click
	{...$$restProps}
>
	<slot />
</Button>