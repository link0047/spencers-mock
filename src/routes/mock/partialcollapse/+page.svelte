<script>
  import { PartialCollapse } from "$lib/components/partialcollapse";
</script>
<div class="component-preview">
	<PartialCollapse label="Shipping restrictions notification">
		<svelte:fragment slot="content">
			<div class="status">
				<svg class="icon warning" viewBox="0 0 24 24" focusable="false" role="presentation">
					<path d="M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z" />
				</svg>
				<div class="status__text">These items are made to order and ship separately. Even if you choose expedited shipping, each item needs up to a three-day lead time for production. These items cannot ship to Cananda.</div>
			</div>
		</svelte:fragment>
	</PartialCollapse>
	<PartialCollapse label="Maximum quantity notification">
		<svelte:fragment slot="content">
			<div class="status">
				<svg class="icon information" viewBox="0 0 24 24" focusable="false" role="presentation">
					<path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
				</svg>
				<div class="status__text">Maximum quantity of item is limited per order.</div>
			</div>
		</svelte:fragment>
	</PartialCollapse>
</div>
<style>
	.component-preview {
		padding: 32px 8px;
		justify-content: center;
		display: grid;
		row-gap: 16px;
	}
	
	.status {
		display: grid;
		grid-template-columns: minmax(32px, auto) 1fr;
		align-items: top;
		gap: 16px;
		max-width: 600px;
	}

	.status__text {
		display: flex;
		align-items: center;
	}
	
	.icon {
		width: 32px;
		height: 32px;
	}

	.warning {
		fill: #E86900;
	}

	.information {
		fill: #0f52b9;
	}
</style>