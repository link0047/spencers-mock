<script lang="ts">
  import Portal from "svelte-portal";
  import { browser } from "$app/environment";
  import { onMount, setContext } from "svelte";
  import Backdrop from "$lib/components/backdrop/Backdrop.svelte";
  export let variant = "default";
  export let state;

  setContext("close", close);

  const id = state.drawerId;
  let ref: HTMLElement;
  
  let focusableElements: HTMLElement[] | null;  
  let lastElementWithFocus: HTMLElement | null = null;

  let isOpen = state.open;

  function close() {
    state.open.set(false);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Esc" || event.key === "Escape") {
      close();
      return;
    }

    const current = document.activeElement;
    focusableElements = Array.from(ref.querySelectorAll(":is(input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]),	a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'], iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false'])):not([inert])"));
    
    if (!focusableElements.length) return;

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    if (event.key === "Tab") {
      if (event.shiftKey && current === first) {
        last.focus();
        event.preventDefault();
      } else if (!event.shiftKey && current === last) {
        first.focus();
        event.preventDefault();
      }
    }
  }

  if (browser) {
    console.log(state);
    state.open.subscribe(openState => {
      isOpen = openState;
      if (isOpen) {
        if (ref) ref.inert = false;
        document.body.setAttribute("style", "overflow:hidden");
        lastElementWithFocus = document.activeElement as HTMLElement;
        focusableElements && focusableElements[0]?.focus();
      } else {
        if (ref) ref.inert = true;
        document.body.removeAttribute("style");
        lastElementWithFocus?.focus();
      }
    });
  }

  onMount(() => {
    focusableElements = Array.from(ref.querySelectorAll(":is(input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]),	a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'], iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false'])):not([inert])"));
  });
</script>

<Portal>
  <div
    bind:this={ref}
    {id}
    aria-modal="true"
    role="dialog"
    class="dialog"
    class:dialog--open={isOpen}
    class:dialog--fullscreen={variant === "fullscreen"}
    tabindex="-1"
    on:keydown={handleKeydown}
    {...$$restProps}
  >
    <slot />
  </div>
  <Backdrop open={isOpen} on:click={close}/>
</Portal>

<style>
  .dialog {
    position: fixed;
    top: 10vh;
    left: 50%;
    bottom: 10vh;
    display: flex;
    flex-flow: column nowrap;
    height: fit-content;
    max-height: 80vh;
    transform: translate3d(-50%, 0, 0);
    width: 100%;
    max-width: calc(100vw - 16px);
    background-color: #fff;
    box-shadow: 0 6px 12px -2px rgba(50,50,93,0.25),0 3px 7px -3px rgba(0,0,0,0.3);
    opacity: 0;
    overflow: hidden;
    transition: opacity .15s ease-in;
    pointer-events: none;
    z-index: 519;
    border-radius: 8px;
  }

  .dialog--open {
    opacity: 1;
    pointer-events: initial;
  }

  .dialog--fullscreen {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    transform: none;
    box-shadow: none;
    border-radius: 0;
  }

  @supports (width: 100dvw) {
    .dialog--fullscreen {
      height: 100dvh;
      max-height: 100dvh;
    }
  }
</style>
