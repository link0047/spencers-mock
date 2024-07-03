<script>
	import RadioButton from "$lib/components/radio/RadioButton.svelte";

	export let name = "";
	export let message = "";
	export let label = "";
	export let value = "";
</script>

<RadioButton {value} {label} style="--uikit-radio-button-checked-color:#008300">
	<div class="fulfillment">
		<slot name="icon" />
		<div class="fulfillment__type">{name}</div>
		<div class="fulfillment__message">{message}</div>
	</div>
</RadioButton>

<style>
	.fulfillment {
		display: grid;
		padding: 1rem;
		gap: .5rem;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	}

	.fulfillment :global(.icon) {
		--icon-width: 32px;
		--icon-height: 32px;
	}

	.fulfillment__type {
		margin: 0;
    line-height: 1;
    font-weight: 700;
    font-size: 1rem;
		text-align: left;
    letter-spacing: .03rem;
	}

	.fulfillment__message {
		font-size: .875rem;
    font-weight: 400;
    align-items: start;
    text-align: left;
	}

	:global(.radio-button:disabled) .fulfillment__type {
		color: #444;
	}
	
	:global(.radio-button:disabled) .fulfillment__message {
		color: #666;
	}

	:global(.radio-button[aria-checked="true"]) .fulfillment__message {
		color: #008300;
	}
</style>