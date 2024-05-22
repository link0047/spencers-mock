<script lang="ts">
	import { onMount } from "svelte";
	import Icon from "$lib/components/icon";
	export let level = 1;

	let contentRef;
	$: count = 0;
	
	onMount(() => {
		count = contentRef.childElementCount;
	});
</script>
<div class="warningCard">
	<div 
		class="warningCard__icon"
		class:information={level === 1}
		class:warning={level === 2}
	>
		{#if count > 1}
			<div class="notification-badge">{count}</div>
		{/if}
		<Icon size="l">
			{#if level === 1}
				<path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
			{:else if level === 2}
				<path d="M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z" />
			{/if}
		</Icon>
	</div>
	<div class="warningCard__content" bind:this={contentRef}>
		<slot />
	</div>
</div>

<style>
	.warningCard {
		position: relative;
		display: grid;
		grid-template-columns: minmax(32px, auto) 1fr;
		align-items: top;
		gap: 1rem;
		max-width: 600px;
	}
	
	.warningCard__icon {
		position: relative;
	}

	.information {
		color: #0f52b9;
	}

	.warning {
		color: #E86900;
	}

	.warningCard__content {
		display: grid;
		gap: 1.4rem;
		align-items: center;
	}
	
	.notification-badge {
		position: absolute;
		border-radius: 50%;
		display: flex;
		top: -.25rem;
		right: -.5rem;
		justify-content: center;
		align-items: center;
		width: 1.25rem;
		height: 1.25rem;
		background-color: #d62d20;
		color: #fff;
		border: 1.5px solid #fff;
		font-size: .75rem;
	}
</style>