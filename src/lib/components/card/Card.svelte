<script>
	export let variant = "outlined";
	const variants = new Set(["elevated", "outlined", "filled"]);

	if (!variants.has(variant)) {
		console.warn(`Invalid variant "${variant}" passed. Using default variant "outlined".`);
		variant = "outlined";
	}
</script>
<div class="card">
	{#if $$slots.media}
	<div class="card__media">
		<slot name="media"/>
	</div>
	{/if}
	{#if $$slots.headline}
	<div class="card__headline">
		<slot name="headline" />
	</div>
	{/if}
	{#if $$slots.subhead}
	<div class="card__subhead">
		<slot name="subhead" />
	</div>
	{/if}
	{#if $$slots.supportingText}
	<div class="card__supporting-text">
		<slot name="supportingText" />
	</div>
	{/if}
	{#if $$slots.actions}
	<div class="card__actions">
		<slot name="actions" />
	</div>
	{/if}
	<slot/>
</div>

<style>
	:root {
		--card-layout: none;
		--card-columns: none;
	}
	
	.card {
		display: grid;
		grid-template-areas: var(--card-layout);
		grid-template-columns: var(--card-columns);
	}

	.card__media {
		grid-area: media;
	}

	.card__headline {
		grid-area: headline
	}
	
	.card__subhead {
		grid-area: subhead;
	}
	
	.card__supporting-text {
		grid-area: supportingText;
	}
	
	.card__actions {
		grid-area: actions;
	}
</style>