<script lang="ts">
  import Button from "$lib/components/button";
  export let state;

	const id = $state.disclosureId;
	const dialogId = $state.dialogId;
	
	function handleClick() {
		$state.open = !$state.open;
	}
	
	$: open = $state.open;
</script>
<Button 
  id={id} 
	aria-expanded={open} 
	aria-controls={dialogId} 
	aria-haspopup="dialog"
	on:click={handleClick}
	on:blur
	on:focus
	on:click
	{...$$restProps}
>
	<slot />
</Button>
