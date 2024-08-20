<script lang="ts">
  import generateId from "$lib/client/util/local-unique-id-generator.js";

  const uid = generateId("select");
  const id = `aria-uikit-select-${uid}`;
  const labelId = `${id}-label`;
  const errorId = `${id}-error`;
  
  export let label = "";
  export let value: string | number | undefined = undefined;
  export let variant = "default";
	export let error = false;

	let shouldLabelFloatAbove = variant === "float-above" || false;
	
	function handleBlur({ target }) {
    if (!target.value.length) {
      shouldLabelFloatAbove = false;
    }
  }

  function handleFocus({ target }) {
    if (!target.value.length) {
      shouldLabelFloatAbove = true;
    }
  }

  function handleKeyUp({ target }) {
    if (variant === "float-above" && !shouldLabelFloatAbove) {
      shouldLabelFloatAbove = true;
    }
  }

  function handleChange({ target }) {
    if (target.value.length) {
      shouldLabelFloatAbove = true;
    }
  }
	
	function handleAnimation({ target, animationName }) {
		if (animationName.toLowerCase().includes("start")) {
			shouldLabelFloatAbove = true;
		}

		if (animationName.toLowerCase().includes("cancel") && !target.value.length) {
			shouldLabelFloatAbove = false;
		}
	}
</script>

<div 
	class="select"
	class:select--float-above={variant === "float-above"}
	class:error={error}
>
	{#if variant !== "float-above"}
  <label id={labelId} for={id} class="select__label">
    {#if $$slots.label}
      <slot name="label" />
    {:else}
      {label}
    {/if}
  </label>
	{/if}
  <select
    {id}
    class="select__native-control"
		on:change={handleChange}
		on:keyup={handleKeyUp}
    on:change
    on:contextmenu
    on:input
		on:blur={handleBlur}
		on:blur
		on:focus={handleFocus}
	  on:focus
    bind:value={value}
		on:animationstart={handleAnimation}
    {...$$restProps}
  >
    <slot />
  </select>
	{#if variant === "float-above"}
	<div class="notched-outline">
		<div class="notched-outline__leading"></div>
		<div class="notched-outline__notch">
			<label 
				id={labelId}
				for={id}
				class="select__label"
				class:float-above={shouldLabelFloatAbove}
			>
				{label}
			</label>
		</div>
		<div class="notched-outline__trailing"></div>
	</div>
	{/if}
  <div class="error__message" aria-live="assertive" id={errorId} role="alert" />
</div>

<style>
  .select {
		position: relative;
    display: grid;
    gap: 4px;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

  .select__label {
    font-size: 0.875rem;
    line-height: 1;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
  }

  .select__label:empty {
    display: none;
  }

	.select__label.float-above {
		transform: translateY(-125%) scale(.9);
		padding: 0 .25rem;
	}

  .select__native-control {
    appearance: none;
    color: #212121;
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 0.04em;
    border: 1px solid;
    border-color: #949499;
    border-radius: 4px;
    background-color: #fff;
    height: 2.5rem;
    width: 100%;
    min-width: 88px;
		outline: none;
    padding: 8px;
    background-image: url('data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="%23212121" viewBox="0 0 24 24"><path d="M12 18.17L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83z"/></svg>');
    background-repeat: no-repeat;
    background-position: right;
  }

  .select__native-control:hover {
    /* outline-offset: -2px;
    outline: 2px solid #000; */
		border-color: #000;
		box-shadow: inset 0 0 0 1px #000;
  }

  .select__native-control:focus-visible {
    border-color: #3367d6 #285bc7 #2451b2;
		box-shadow: inset 0 0 0 1px #2451b2;
  }

	.select--float-above .select__native-control {
		border: none;
		box-shadow: none;
	}

	.notched-outline {
		pointer-events: none;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2.5rem;
		display: grid;
		grid-template-columns: 8px minmax(auto, max-content) 1fr;
	}	
		
	.notched-outline__leading	{
		border: 1px solid;
		border-color: #949499;
		border-right: none;
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	}
		
	.notched-outline__notch {
		border-top: 1px solid;
		border-bottom: 1px solid;
		border-color: #949499;
		display: flex;
		align-items: center;
	}
	
	.notched-outline__notch:has(> .float-above) {
		border-top: none!important;
	}
	
	.notched-outline__trailing {
		border: 1px solid;
		border-color: #949499;
		border-left: none;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
	}
	
	.select__native-control:hover + .notched-outline :is(.notched-outline__notch, .notched-outline__leading, .notched-outline__trailing) {
		border-color: #000;
		border-width: 2px;
	}
		
	.select__native-control:focus-within + .notched-outline :is(.notched-outline__notch, .notched-outline__leading, .notched-outline__trailing) {
		border-color: #3367d6 #285bc7 #2451b2;
		border-width: 2px;
	}

  .error__message {
    font-size: 0.875rem;
  }

	@keyframes onAutoFillStart {  
		from {}  
		to {}
	}
	@keyframes onAutoFillCancel {  
		from {}  
		to {}
	}	
</style>