<script>
	import generateId from "$lib/client/util/local-unique-id-generator";

	export let uid = generateId("checkbox");
	export let value = "";
  
	const id = `aria-uikit-checkbox-${uid}`;
	const labelId = `${id}-label`;
</script>
<div class="checkbox">
	<input
		{id}
		bind:value={value}
		class="checkbox__native-control"
		type="checkbox"
		{...$$restProps}
		on:click
		on:keydown
		on:blur
		on:focus
		on:change
	/>
	<label id={labelId} for={id} class="checkbox__label">
		<slot />
	</label>
</div>

<style>
	:root {
		--icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' stroke='white' stroke-width='1px' fill='white'%3e%3cpath d='M21 7 9 19l-5.5-5.5 1.41-1.41L9 16.17 19.59 5.59 21 7Z'/%3e%3c/svg%3e");
	}
	
	.checkbox {
		position: relative;
		display: inline-flex;
	}
	
	.checkbox__native-control {
		position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    cursor: inherit;
    opacity: 0;
	}
	
	.checkbox__label {
		display: inline-flex;
    align-items: center;
    font-size: .875rem;
		line-height: 1;
		gap: 8px;
	}

	.checkbox__label:before {
		box-sizing: border-box;
	  content: "";
    width: 20px;
    height: 20px;
    display: block;
		border: 2px solid #0000008a;
    border-radius: 4px;
	}

	.checkbox__label:after {
		opacity: 0;
		content: "";
		box-sizing: border-box;
		position: absolute;
		width: 20px;
    height: 20px;
		background-color: #1967d2;
		background-image: var(--icon);
		background-size: 16px;
    background-position: center;
		border: 2px solid #0000008a;
    border-radius: 4px;
	  transition: opacity .3s ease;
		cursor: pointer;
	}

	.checkbox__native-control:checked + .checkbox__label:after {
		opacity: 1;
	}
</style>