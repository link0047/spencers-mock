<script lang="ts">
	import generateId from "$lib/client/util/local-unique-id-generator.js";
  import { onMount } from "svelte";

  export let label: string = "";
  export let value: string = "";
  export let variant: "default" | "float-above" = "default";
  export let error: boolean = false;
  export let message: string | null = null;

  const uid: string = generateId("textfield");
  const id: string = `uikit-textfield-${uid}`;
  const labelId: string = `${id}-label`;
  let shouldLabelFloatAbove: boolean = false;

  function handleBlur({ target }: FocusEvent) {
    if (!(target as HTMLInputElement).value.length) {
      shouldLabelFloatAbove = false;
    }
  }

  function handleFocus({ target }: FocusEvent) {
    if (!(target as HTMLInputElement).value.length) {
      shouldLabelFloatAbove = true;
    }
  }

  function handleKeyUp({ target }: KeyboardEvent) {
    if (variant === "float-above" && !shouldLabelFloatAbove) {
      shouldLabelFloatAbove = true;
    }
  }

  function handleChange({ target }: Event) {
    if ((target as HTMLInputElement).value.length) {
      shouldLabelFloatAbove = true;
    }
  }

	function handleAnimation({ target, animationName }: AnimationEvent) {
		if (animationName.toLowerCase().includes("start")) {
			shouldLabelFloatAbove = true;
		}

		if (animationName.toLowerCase().includes("cancel") && !(target as HTMLInputElement).value.length) {
			shouldLabelFloatAbove = false;
		}
	}
</script>
<div 
	class="textfield" 
	class:textfield--float-above={variant === "float-above"}
	class:error={ error }
>
	{#if variant !== "float-above"}
	<label 
		id={labelId} 
		class="textfield__label" 
		for={id}
	>
		{label}
	</label>
	{/if}
	<input
		{id}
		class="textfield__native-control"
		aria-labelledby={labelId}
		bind:value={value}
    on:click
		on:change={handleChange}
    on:change
    on:input
    on:keydown
		on:keyup={handleKeyUp}
    on:keyup
		on:focus={handleFocus}
    on:focus
		on:blur={handleBlur}
    on:blur
    on:mouseover
    on:mouseenter
    on:mouseleave
		on:animationstart={handleAnimation}
    {...$$restProps}
	/>
	{#if variant === "float-above"}
	<div class="notched-outline">
		<div class="notched-outline__leading"></div>
		<div class="notched-outline__notch">
			<label 
				id={labelId}
				for={id}
				class="textfield__label"
				class:float-above={shouldLabelFloatAbove}
			>
				{label}
			</label>
		</div>
		<div class="notched-outline__trailing"></div>
	</div>
	{/if}
	{#if $$slots.trailing}
	<div class="textfield__trailing-action">
		<slot name="trailing"/>
	</div>
	{/if}
	<div class="textfield__message" aria-live="assertive" id="form-firstname-message" role="alert">
    {message ? message : ""}
  </div>
</div>

<style>
.textfield { 
	position: relative;
	display: grid;
	gap: 4px;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.textfield__message {
	font-size: 12px;
	font-style: italic;
	line-height: 1.6;
	color: #212121;
	margin: 0;
}

.textfield__message:empty {
	display: none;
}

.error .textfield__message {
	color: #b00020;
}

.textfield__label {
	width: fit-content;
	font-size: .875rem;
	pointer-events: none;
	transition: transform .15s cubic-bezier(0.4, 0, 0.2, 1);
}

.textfield__label.float-above {
	transform: translateY(-80%) scale(.9);
	padding: 0 .25rem;
}

.textfield__native-control {
	box-sizing: border-box; 
	outline: none;
	color: #212121;
	font-size: 16px;
	font-weight: 400;
	line-height: 1;
	letter-spacing: 0.04em;
	width: 100%;
	height: 36px;
	padding: 0 8px;
	border: 1px solid;
	border-color: #949499;
	border-radius: 4px;
	background-color: #fff;
	font-size: 1rem;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	/* transition: border 250ms cubic-bezier(0.4, 0, 0.2, 1); */
	/* will-change: border, box-shadow; */
	/* box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 0px 0px; */
}

.textfield__native-control:autofill,
.textfield__native-control:autofill:focus,
.textfield__native-control:autofill:hover {
	box-shadow: 0 0 0 1000px #fff inset!important;
  -webkit-text-fill-color: #000;
}

.textfield__native-control:autofill {
	animation-name: onAutoFillStart;
}

.textfield__native-control:not(:autofill) {
	animation-name: onAutoFillCancel;
}

.textfield__native-control::placeholder {
	font-size: 1rem;
}

.textfield__native-control:hover {
	border-color: #000;
	box-shadow: inset 0 0 0 1px #000;
}

.textfield__native-control:focus-within {
	border-color: #3367d6 #285bc7 #2451b2;
	box-shadow: inset 0 0 0 1px #2451b2;
}

.textfield--float-above .textfield__native-control {
	border: none;
	box-shadow: none;
}

.notched-outline {
	pointer-events: none;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 36px;
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

.textfield__native-control:hover + .notched-outline :is(.notched-outline__notch, .notched-outline__leading, .notched-outline__trailing) {
	border-color: #000;
	border-width: 2px;
}
	
.textfield__native-control:focus-within + .notched-outline :is(.notched-outline__notch, .notched-outline__leading, .notched-outline__trailing) {
	border-color: #3367d6 #285bc7 #2451b2;
	border-width: 2px;
}

.textfield__trailing-action {
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0;
	display: grid;
	grid-template-columns: minmax(auto, max-content) minmax(auto, max-content);
	gap: 8px;
	align-items: center;
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