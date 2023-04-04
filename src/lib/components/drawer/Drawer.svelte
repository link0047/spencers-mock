<script lang="ts">
  import { browser } from "$app/environment";
  import type { Writable } from "svelte/store";
  import type { DrawerStore } from "./DrawerStore";
  import DrawerDismiss from "./DrawerDismiss.svelte";
  import Icon from "$lib/components/icon";
  import Backdrop from "$lib/components/backdrop";
  export let state: Writable<DrawerStore>;

  const id = $state.drawerId;
  let lastElementWithFocus: HTMLElement | null = null;

  $: open = $state.open;

  $: if (open) {
    if (browser) {
      document.body.setAttribute("style", "overflow:hidden");
      lastElementWithFocus = document.activeElement;
    }
  } else {
    if (browser) {
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
</script>

<div
  {id}
  role="dialog"
  aria-modal="true"
  class="drawer"
  class:drawer--open={open}
  tabindex="-1"
  use:drawerEvents
>
  <header class="drawer__header">
    <Icon variant="logo" viewbox="0 0 72 32">
      <path
        d="M10.9 12.6c-.8-.5-1.8-.8-2.7-1-.8-.2-1.6-.2-2.3-.5-.6-.3-1-.7-1-1.6v-.2c.1-.8.7-1.1 1.6-1.1s2.1.3 3 .8c1 .5 1.8 1.1 1.9 1.4 0 .1.1.1.1.1l.1-.1c0-.5-.2-2.6-.3-2.9v-.1h-.1c-.4.1-.7.3-1.1.3h-.2c-.7 0-1.4-.2-2.1-.4-1.2-.4-2.3-.6-3.5-.6-.2 0-.5 0-.7.1-.5.1-1 .3-1.4.6C1.3 8 .9 8.9.9 9.9c0 1.1.5 2.3 1.5 3 .6.4 1.2.7 1.9.8.9.3 2 .3 2.9.5 1 .2 1.7.6 1.7 1.6 0 1.3-1.1 2.2-2.4 2.3h-.2c-.6 0-1.3-.1-1.8-.2-.7-.1-1.1-.2-1.6-.4-.2-.1-.9-.9-.9-1.1 0 0 0-.1-.1-.1h-.1c-.3.3-1.3 2.5-1.6 3v.1h.2c.5-.3 1.2-.6 1.7-.6h.1c.6 0 2.6.2 4.5.2.5 0 1 0 1.4-.1.9-.1 1.9-.5 2.5-1 .9-.7 1.7-2 1.7-3.3 0-.3 0-.6-.1-.8-.2-.4-.7-.9-1.3-1.2m24.5 8.1v-.1c-.5-.4-1.2-.5-1.6-.8-.1 0-.4-.2-.7-.4-.3-.2-.5-.5-.5-.6v-8c0-.2.2-.4.5-.6.3-.2.6-.4.7-.4.5-.3 1.1-.3 1.6-.8v-.1c0-.2-.1-.2-.1-.2h-8.2s-.1 0-.1.1v.1c.5.4 1.2.5 1.6.8.1 0 .4.2.7.4.3.2.5.5.5.6v8c0 .2-.2.4-.5.6s-.6.4-.7.4c-.5.3-1.1.3-1.6.8v.1l.1.1H35.4m20.5-9.3c.3-.2.6-.4.7-.4.5-.2 1.1-.3 1.6-.7V10H50s-.1 0-.1.1v.1c.5.4 1.2.5 1.6.7.1 0 .4.2.7.4.3.2.5.5.5.6v7.6c0 .2-.2.4-.5.6-.3.2-.6.4-.7.4-.5.2-1.1.3-1.6.7v.1l.1.1h8.2s.1 0 .1-.1v-.1c-.5-.4-1.2-.5-1.6-.7-.1 0-.4-.2-.7-.4-.3-.2-.5-.5-.5-.6v-7.6c-.1 0 .1-.3.4-.5m15.9-3.7L70 5.2s-.1-.1-.2 0c0 0-.1 0-.3.1-.7.2-2.2.7-5.3.7-2.1 0-3.5-.2-4.4-.4-.4-.1-.7-.2-.9-.3-.2-.1-.3-.1-.3-.1h-.2l-1.6 2.5v.1s.1.1.1 0c0 0 1.1-.4 1.7-.5.7-.1 1.3-.1 1.8-.1 1.2 0 1.8.2 2.1.5.4.3.4.6.4.7v7.5c0 .2-.2.4-.5.6s-.6.4-.7.4c-.5.3-1.1.3-1.6.8v.1l.1.1h8.2s.1 0 .1-.1v-.1c-.5-.4-1.2-.5-1.6-.8-.1 0-.4-.2-.7-.4-.3-.2-.5-.5-.5-.6V8.4c0-.2 0-.4.3-.7.3-.2.9-.5 2.1-.5.5 0 1.1 0 1.8.1.6.1 1.7.5 1.7.5h.1c.1 0 .1 0 .1-.1m-45.1 6c-.3-.4-.8-.5-1.2-.7-.9-.3-2.5-.4-3.8-.4h-8.1s-.1 0-.1.1v.1c.4.4 1.5.9 2 1.1.2.1.5.3.5.4v8c0 .1-.4.3-.9.6s-1.1.5-1.7.8l-.1.1c0 .1.1.1.1.1h8.1v-.2c-.1 0-.2-.1-.5-.2-.4-.2-.9-.5-1.4-.7l-.6-.3c-.1 0-.1-.1-.2-.1v-8c0-.2.1-.4.2-.6.3-.3.7-.3 1.2-.4h.6c.6 0 1.3.1 1.8.4.5.3 1 .8 1.1 1.4v.4c0 .3 0 .5-.1.8-.4 1.3-1.7 1.5-3.1 1.7h-1.3c-.1 0-.1 0-.1.1s0 .1.1.1c1 .6 2.5.8 3.4.8h.3c.8 0 1.7-.3 2-.3.6-.2 1-.5 1.5-.8.6-.5.9-1.4.9-2.2.1-.9-.1-1.6-.6-2.1M56 24.5c-3.5 0-6.2-.6-9-2l-.1.1.1-.1c-1-.5-2.2-1.2-2.9-2.2h.7c.8 0 1.8-.3 2-.3.6-.2 1.1-.5 1.5-.9.6-.5 1-1.4 1-2.3 0-.7-.2-1.5-.7-2-.3-.4-.8-.6-1.3-.7-.9-.3-2.6-.4-4-.4h-8.5s-.1 0-.1.1v.1c.5.5 1.5.9 2.1 1.2.2.1.5.3.5.4v8.4c0 .1-.4.4-.9.6-.5.3-1.1.6-1.8.9l-.1.1c0 .1.1.1.1.1h8.5v-.2c-.1 0-.2-.1-.5-.2l-1.4-.7c-.2-.1-.4-.3-.6-.4-.1 0-.1-.1-.2-.1v-3.4h.5c1.4.1 2.1 1.6 3.3 2.6 2.1 2 5 3.3 8.1 3.3.3 0 1 0 1.5-.3.6-.2 1.1-.5 1.3-.7.2-.2.6-.5.6-.5v-.1c.4-.4.3-.4.3-.4m-10.2-8c0 .3 0 .6-.1.8-.4 1.3-1.7 1.6-3.2 1.7h-.3c-.5 0-1.3 0-1.6-.1V15.1c0-.3.1-.4.2-.6.3-.3.8-.3 1.2-.4h.7c.6 0 1.3.1 1.8.4.6.3 1 .8 1.1 1.4.2.3.2.5.2.6M22.2 7.8l-1.7-.3.4-.8-.7.5-.4-1.7-.4 1.7-.8-.4.4.7-1.7.4 1.7.4-.4.8.7-.5.4 1.7.4-1.7.9.4-.5-.7 1.7-.5zM8.4 22.5l-1.8-.3.5-.8-.7.5-.5-1.7-.4 1.8-.8-.5.5.7-1.7.4 1.8.4-.5.8.7-.5.5 1.9.3-1.8.8.4-.5-.8 1.8-.5zm21.9 1.9-1.7-.4.4-.7-.7.4-.4-1.7-.4 1.8-.8-.5.5.7-1.7.4 1.7.5-.4.7.7-.5.4 1.8.4-1.8.8.5-.5-.7 1.7-.5zm36.1-2.8-1.8-.4.5-.7-.8.4-.4-1.7-.5 1.8-.8-.5.5.7-1.7.5 1.8.4-.5.7.7-.4.5 1.7.3-1.8.8.5-.5-.7 1.9-.5zM45 8.5l-1.8-.3.5-.8-.7.5-.4-1.8-.4 1.8-.8-.4.5.7-1.9.4 1.9.4-.5.8.7-.5.5 1.7.4-1.8.7.5-.4-.7 1.7-.5z"
      />
    </Icon>
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
    transition: transform 0.2s cubic-bezier(0.22, 0.61, 0.36, 1);
    transition-delay: 0.1s;
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
  }

  .drawer__content {
    height: calc(100% - 72px);
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
    }
  }
</style>
