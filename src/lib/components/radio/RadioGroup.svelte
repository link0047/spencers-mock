<script lang="ts">
  import type { Writable } from "svelte/store";
	import { writable } from "svelte/store";
	import { setContext } from "svelte"
	
	export let value: string = "";	
	export let tag: string = "div";
  
	const valueStore: Writable<string> = writable(value);
	setContext("value", valueStore);

	$: {
		value = $valueStore;
	}
</script>

<svelte:element class="radio-group" role="radiogroup" this={tag} {...$$restProps}>
	<slot />
</svelte:element>

<style>
	.radio-group {
		display: flex;
		gap: 8px;
		flex-flow: row wrap;
	}
</style>