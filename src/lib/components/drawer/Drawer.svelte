<script lang="ts">
  import { onMount, setContext } from "svelte";
	import { get } from "svelte/store";
	import { noop } from "$lib/client/util/utilities";
	import type { Writable } from "svelte/store";

	interface DrawerState {
		open: Writable<boolean>;
		drawerId: string
	}

	export let label: string = "Drawer Content";
	export let state: DrawerState;
  export let alignment: "left" | "right" = "left";
	export let disableBackdrop: boolean = false;
	export let afterClose: () => void = noop;
  
	let ref: HTMLDivElement;
	let Backdrop: typeof import("$lib/components/backdrop").default;
	let focusableElements: HTMLElement[];
  let lastElementWithFocus: HTMLElement | null = null;
	let open = get(state.open);
	
  const id = state.drawerId;
	const ALIGNMENT_OPTIONS = ["left", "right"] as const;
	const ESC_KEYS = ["Esc", "Escape"];
	
	setContext("close_action", close);
	setContext("state", state.open);

	if (!ALIGNMENT_OPTIONS.includes(alignment)) {
		console.warn(`Invalid alignment value: "${alignment}". Defaulting to "left".`);
		alignment = "left";
	}
	
  
	state.open.subscribe(isOpen => {
		open = isOpen;
		if (isOpen) {
			if (ref) {
				focusableElements = Array.from(ref.querySelectorAll(":is(input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]),	a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'], iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false'])):not([inert])"));
				ref.inert = false;
				document.body.setAttribute("style", "overflow:hidden");
				lastElementWithFocus = document.activeElement as HTMLElement;
				focusableElements[0]?.focus();
			}
		} else {
			if (ref) {
				ref.inert = true;
				document.body.removeAttribute("style");
				lastElementWithFocus && lastElementWithFocus.focus();
			}
		}
	})

  function close(): void {
    state.open.set(false);
  }

	function handleTransitionEnd(event: TransitionEvent): void {
		if (event.target === ref && event.propertyName === "transform" && !open) {
			afterClose();
		}
	}

	function configureDialogARIAEvents(node: HTMLElement) {
		const controller = new AbortController();
		
		function handleKeyup(event: KeyboardEvent): void {
			if (ESC_KEYS.includes(event.key)) {
				event.stopPropagation();
				close();
			}
		}
	
		function handleKeydown(event:KeyboardEvent): void {
			const current = document.activeElement;
			if (!focusableElements?.length) return;
	
			const first = focusableElements[0];
			const last = focusableElements[focusableElements.length - 1];
	
			if (event.key === "Tab") {
				if (event.shiftKey && current === first) {
					event.preventDefault();
					last.focus();
				} else if (!event.shiftKey && current === last) {
					event.preventDefault();
					first.focus();
				}
			}
		}
	
		document.addEventListener("keyup", handleKeyup, { signal: controller.signal });
		document.addEventListener("keydown", handleKeydown, { signal: controller.signal });
		
		return {
			destroy() {
				controller.abort();
			}
		};
	}

  onMount(async () => {
		try {
			if (!disableBackdrop) {
				Backdrop = (await import("$lib/components/backdrop")).default;
			}
	    ref.inert = true;
		} catch (error) {
			console.error("Failed to load Backdrop component:", error);
		}
  });
</script>

<div
  bind:this={ref}
  {id}
  role="dialog"
  aria-modal="true"
	aria-label={label}
  class="drawer"
  class:drawer--alignment-right={alignment === "right"}
  class:drawer--open={open}
  tabindex="-1"
	on:transitionend={handleTransitionEnd}
  use:configureDialogARIAEvents
>
	{#if $$slots.header}
	  <header class="drawer__header">
	    <slot name="header" />
	  </header>
	{/if}
  <div class="drawer__content">
    <div>
      <slot />
    </div>
  </div>
	{#if $$slots.footer}
		<footer class="drawer__footer">
			<slot name="footer" />
		</footer>
	{/if}
</div>

{#if !disableBackdrop}
	<svelte:component this={Backdrop} {open} on:click={close} />
{/if}

<style>
:root {
  --uikit-drawer-bg-color: #fff;
  --uikit-drawer-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  --uikit-drawer-z-index: 519;
  --uikit-drawer-transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --uikit-drawer-transition-delay: 0.1s;
  --uikit-drawer-opacity: 0;
	--uikit-drawer-border-color: #DFDFDF;
  --uikit-drawer-header-border-color: #DFDFDF;
  --uikit-drawer-header-padding: 0.5rem;
  --uikit-drawer-header-gap: 0.5rem;
  --uikit-drawer-content-height: calc(100vh - 2.5rem);
  --uikit-drawer-content-padding: 0 0 2rem;
  --uikit-drawer-max-width: 25rem;
  --uikit-drawer-border-radius: 0.5rem;
}

.drawer {
  position: fixed;
  background-color: var(--uikit-drawer-bg-color);
  font-family: var(--uikit-drawer-font-family);
  height: 100vh;
  height: 100dvh;
  width: 100vw;
  z-index: var(--uikit-drawer-z-index);
  top: 0;
  left: 0;
  transform: translate3d(-100%, 0, 0);
  transition: var(--uikit-drawer-transition);
  transition-delay: var(--uikit-drawer-transition-delay);
  opacity: var(--uikit-drawer-opacity);
	display: flex;
	flex-flow: column;
}

.drawer:not(.drawer--alignment-right) {
	border-top-right-radius: var(--uikit-drawer-border-radius);
	border-bottom-right-radius: var(--uikit-drawer-border-radius);
}

.drawer--alignment-right {
	border-top-left-radius: var(--uikit-drawer-border-radius);
	border-bottom-left-radius: var(--uikit-drawer-border-radius);
}

.drawer--alignment-right {
  left: initial;
  right: 0;
  transform: translate3d(100%, 0, 0);
}

.drawer__header {
  position: relative;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
	min-height: 3rem;
	box-sizing: border-box;
  border-bottom: 1px solid var(--uikit-drawer-header-border-color);
  padding: var(--uikit-drawer-header-padding);
  gap: var(--uikit-drawer-header-gap);
}

.drawer--open {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}

.drawer__content {
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
}

.drawer__footer {
	border-top: 1px solid var(--uikit-drawer-border-color);
}

@media (min-width: 35.0625rem) {
  .drawer {
    max-width: var(--uikit-drawer-max-width);
  }
}

@media (max-width: 35rem) {
	.drawer {
		max-width: calc(100vw - 1.5rem);
	}
}
</style>
