<script>
  import { afterUpdate, getContext } from "svelte";
  export let as = null;
  export let active = false;
  export let href = null;

  let ref;
  let state = getContext("state");

  const types = {
    link: "a",
    radio: "button",
    checkbox: "button",
  };

  let type = types[as] || "button";
  let htref = as === "a" ? href : null;
  afterUpdate(() => {
    type = types[as] || "button";
    htref = href;
  });
</script>

<svelte:element
  this={type}
  bind:this={ref}
  class="menu__item"
  role="menuitem"
  href={htref}
  tabindex={active ? 0 : -1}
  on:click
  on:focus
  on:blur
  {...$$restProps}
>
  <slot />
</svelte:element>

<style>
  .menu__item:visited,
  .menu__item {
    -webkit-tap-highlight-color: transparent;
    position: relative;
    border: 0;
    text-decoration: none;
    text-transform: initial;
    outline: 0;
    color: #212121;
    background-color: transparent;
    display: grid;
    grid-template-columns: auto 1fr auto auto auto;
    grid-template-areas: "leading-icon text trailing-text trailing-icon menu-icon";
    padding: 0 12px;
    margin: 0;
    font-weight: 400;
    font-size: 0.875rem;
    align-items: center;
    min-height: 40px;
    text-align: left;
    -webkit-appearance: none;
    appearance: none;
    user-select: none;
    cursor: pointer;
    transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  :global(.menu__item > :has(> :nth-child(-n + 2):first-child)) {
    margin-right: 8px;
  }

  .menu__item[tabindex="0"],
  .menu__item:hover {
    background-color: #f2f2f2;
  }
</style>
