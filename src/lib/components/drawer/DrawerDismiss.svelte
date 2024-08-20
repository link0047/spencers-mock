<script>
	import { getContext } from "svelte";
  import Icon from "$lib/components/icon";
	export let alignment = "none";

	const close = getContext("close_action");
	const ALIGNMENT_OPTIONS = ["none", "left", "right"];

	if (!ALIGNMENT_OPTIONS.includes(alignment)) {
		console.warn(`Invalid alignment value: "${alignment}". Defaulting to "none".`);
		alignment = "none";
	}
</script>

<button
	class="drawer__dismiss"
	class:drawer__dismiss--alignment-left={alignment === "left"}
	class:drawer__dismiss--alignment-right={alignment === "right"}
	type="button"
  aria-label="close"
	on:click={close}
	on:click
  on:blur
  on:focus
	{...$$restProps}
>
	<Icon>
		<title>close</title>
		<path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
	</Icon>
</button>

<style>
:root {
  --uikit-drawer-dismiss-size: 2rem;
  --uikit-drawer-dismiss-border-radius: 50%;
  --uikit-drawer-dismiss-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  --uikit-drawer-dismiss-font-size: 0.875rem;
  --uikit-drawer-dismiss-font-weight: 500;
  --uikit-drawer-dismiss-text-color: #38393b;
  --uikit-drawer-dismiss-background-color-hover: #e9edf3;
  --uikit-drawer-dismiss-text-color-hover: #254880;
  --uikit-drawer-dismiss-background-color-disabled: #eeeeef;
  --uikit-drawer-dismiss-text-color-disabled: #444547;
  --uikit-drawer-dismiss-focus-outline-color: #007acc;
  --uikit-drawer-dismiss-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
}

.drawer__dismiss {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  background-color: transparent;
  border-radius: var(--uikit-drawer-dismiss-border-radius);
  color: var(--uikit-drawer-dismiss-text-color);
  font-family: var(--uikit-drawer-dismiss-font-family);
  font-size: var(--uikit-drawer-dismiss-font-size);
  font-weight: var(--uikit-drawer-dismiss-font-weight);
  height: var(--uikit-drawer-dismiss-size);
  width: var(--uikit-drawer-dismiss-size);
  letter-spacing: 0.04em;
  padding: 0;
  position: relative;
  touch-action: manipulation;
  user-select: none;
  border: 1px solid transparent;
  cursor: pointer;
	z-index: 2;
  transition: background-color 0.2s var(--uikit-drawer-dismiss-transition-timing), border-color 0.2s var(--uikit-drawer-dismiss-transition-timing), transform 0.1s ease-in-out;
}

.drawer__dismiss--alignment-left,
.drawer__dismiss--alignment-right {
  position: absolute;
  top: .5rem;
}

.drawer__dismiss--alignment-left {
  left: .5rem;
}

.drawer__dismiss--alignment-right {
  right: .5rem;
}

.drawer__dismiss:disabled {
  cursor: not-allowed;
  color: var(--uikit-drawer-dismiss-text-color-disabled);
  font-weight: 400;
  background-color: var(--uikit-drawer-dismiss-background-color-disabled);
  border: 1px solid var(--uikit-drawer-dismiss-background-color-disabled);
  box-shadow: none;
}

.drawer__dismiss:focus-visible {
  outline-offset: 0;
  outline: 2px solid var(--uikit-drawer-dismiss-focus-outline-color);
}

.drawer__dismiss:not(:disabled):hover {
  background-color: var(--uikit-drawer-dismiss-background-color-hover);
  color: var(--uikit-drawer-dismiss-text-color-hover);
}

.drawer__dismiss:active {
  transform: scale(0.97);
}
</style>