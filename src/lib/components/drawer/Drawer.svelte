<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import type { Writable } from "svelte/store";
  import type { DrawerStore } from "./DrawerStore";
  import DrawerDismiss from "./DrawerDismiss.svelte";
  import Backdrop from "$lib/components/backdrop";
  export let state: Writable<DrawerStore>;
  export let alignment = "left";
  let ref: HTMLElement;

  const id = $state.drawerId;
  let lastElementWithFocus: HTMLElement | null = null;

  $: open = $state.open;

  $: if (open) {
    if (browser) {
      if (ref) ref.inert = false;
      document.body.setAttribute("style", "overflow:hidden");
      lastElementWithFocus = document.activeElement as HTMLElement;
    }
  } else {
    if (browser) {
      if (ref) ref.inert = true;
      document.body.removeAttribute("style");
      lastElementWithFocus && lastElementWithFocus.focus();
    }
  }

  function close() {
    $state.open = false;
  }

  function drawerEvents(node: HTMLElement) {
    function handleEscape(event: KeyboardEvent) {
      const { key } = event;
      if (key == "Esc" || key == "Escape") {
        event.stopPropagation();
        close();
      }
    }

    browser && document.addEventListener("keyup", handleEscape);
    return {
      destroy() {
        browser && document.removeEventListener("keyup", handleEscape);
      },
    };
  }

  onMount(async () => {
    ref.inert = true;
  });
</script>

<div
  bind:this={ref}
  {id}
  role="dialog"
  aria-modal="true"
  class="drawer"
  class:drawer--alignment-right={alignment === "right"}
  class:drawer--open={open}
  tabindex="-1"
  use:drawerEvents
>
  <header class="drawer__header">
    <slot name="header" />
    <DrawerDismiss on:click={close} />
  </header>
  {#if $state.showBack}
    <div class="drawer__back">
      <slot name="back" />
    </div>
  {/if}
  <div class="drawer__content">
    <div>
      <slot />
    </div>
  </div>
</div>
<Backdrop {open} on:click={close} />

<style>
  .drawer {
    position: fixed;
    background-color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    height: 100vh;
    width: 100vw;
    z-index: 519;
    top: 0;
    left: 0;
    transform: translate3d(-100%, 0, 0);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transition-delay: 0.1s;
    opacity: 0;
  }

  .drawer--alignment-right {
    left: initial;
    right: 0;
    transform: translate3d(100%, 0, 0);
  }

  .drawer__back {
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    background-color: #f2f2f2;
    height: 32px;
    gap: 8px;
    border-bottom: 1px solid #93939a;
    box-sizing: border-box;
    cursor: pointer;
  }

  .drawer__header {
    display: grid;
    grid-template-columns: 1fr 40px;
    align-items: center;
    border-bottom: 1px solid #93939a;
    padding: 8px;
  }

  .drawer--open {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }

  .drawer__content {
    height: calc(100vh - 72px);
    height: calc(100dvh - 72px);
    box-sizing: border-box;
    overflow: auto;
  }

  .drawer__content > div {
    box-sizing: border-box;
    padding: 4px 0 32px;
  }

  @media (min-width: 561px) {
    .drawer {
      max-width: 352px;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    }
  }
</style>
