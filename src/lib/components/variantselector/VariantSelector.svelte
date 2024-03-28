<script lang="ts">
	import generateId from "$lib/client/util/local-unique-id-generator";
	import { RadioGroup } from "$lib/components/radio";
	
	export let label: string;
	export let groupValue: string = "";
	
	const uid: string = generateId("variantselector");
	const id: string =`uikit-variant-selector-${uid}-heading`;
</script>

<div class="variant-selector">
	<h2 {id} class="variant-selector__heading">
		<span class="variant-selector__label">{label}</span>
		<span class="variant-selector__value">{groupValue}</span>
		<slot name="action" />
	</h2>
	<RadioGroup bind:value={groupValue} aria-labelledby={id}>
		<slot />
	</RadioGroup>
</div>

<style>
	.variant-selector {
		display: grid;
		gap: 12px;
	}

	.variant-selector__heading {
		line-height: 1;
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
		font-size: 1rem;
	}

	.variant-selector__label {
		font-weight: 500;
	}
</style>