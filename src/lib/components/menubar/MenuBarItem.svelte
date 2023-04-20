<script>
  import { getContext, onMount } from "svelte";
  export let as = null;
  export let active = false;
  export let href = null;
  export let hasPopup = null;
  export let open;

  let ref;
  const types = {
    link: "a",
  };
  const type = types[as] || "button";
  let state = getContext("state");

  function handlePointerDown(event) {
    $state.children[$state.index].setAttribute("tabindex", "-1");
    $state.children[$state.index].setAttribute("aria-expanded", "false");
    $state.index = $state.children.indexOf(ref);
    $state.children[$state.index].setAttribute("tabindex", "0");
  }

  function handleClick(event) {
    event.preventDefault();
  }

  function handleKeyUp(event) {
    const { key } = event;
    switch (key) {
      case "Space":
      case " ":
      case "Enter":
        event.target.click();
        break;
      default:
        break;
    }
  }

  onMount(async () => {
    $state.children.push(ref);
  });
</script>

<svelte:element
  this={type}
  bind:this={ref}
  aria-haspopup={hasPopup}
  aria-expanded={open}
  class="menubar__item"
  role="menuitem"
  href={type === "a" ? href : null}
  tabindex={active ? 0 : -1}
  on:pointerdown={handlePointerDown}
  on:keyup={handleKeyUp}
  on:click={hasPopup ? handleClick : null}
  on:click
>
  <slot />
</svelte:element>

<style>
  .menubar__item:visited,
  .menubar__item {
    -webkit-tap-highlight-color: transparent;
    position: relative;
    border: 0;
    text-decoration: none;
    text-transform: initial;
    outline: 0;
    background-color: transparent;
    display: flex;
    padding: 0 12px;
    margin: 0;
    align-items: center;
    min-height: 32px;
    text-align: left;
    -webkit-appearance: none;
    appearance: none;
    user-select: none;
    color: #212121;
    cursor: pointer;
    z-index: 0;
  }

  .menubar__item:hover,
  .menubar__item:active,
  :global(.focus) .menubar__item[tabindex="0"] {
    text-decoration: underline;
  }

  .menubar__item:active {
    background-color: transparent;
  }

  .menubar__item::before {
    background-color: #f2f2f2;
    content: "";
    position: absolute;
    width: 100%;
    min-height: 32px;
    border-radius: 16px;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .menubar__item:hover:before,
  .menubar__item:active:before,
  :global(.focus) .menubar__item[tabindex="0"]:before {
    opacity: 1;
  }
</style>
