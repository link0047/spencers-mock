<script lang="ts">
  type AsType = "link" | "radio" | "checkbox" | null;

  export let as: AsType = null;
  export let active = false;
  export let href: string | null = null;

  let ref: HTMLElement;

  const types: Record<string, string> = {
    link: "a",
    radio: "button",
    checkbox: "button",
  };

  $: type = types[as as string] || "button";
  $: isLink = type === 'a';
  $: tabIndex = active ? 0 : -1;

  $: {
    if (as === 'link' && !href) {
      console.warn('href should be provided when as="link"');
    }
  }
  
  $: attrs = {
    ...(isLink ? { href } : {}),
  };
</script>

<svelte:element
  this={type}
  bind:this={ref}
  class="menu__item"
  role="menuitem"
  {...attrs}
  tabindex={tabIndex}
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
    padding: 0 .75rem;
    margin: 0;
    font-weight: 400;
    font-size: 0.875rem;
    align-items: center;
    min-height: 2.5rem;
    text-align: left;
    -webkit-appearance: none;
    appearance: none;
    user-select: none;
    cursor: pointer;
    transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  :global(.menu__item > :has(> :nth-child(-n + 2):first-child)) {
    margin-right: .5rem;
  }

  .menu__item[tabindex="0"] {
    background-color: #f2f2f2;
  }

  @media (hover: hover) and (pointer: fine) {
    .menu__item:hover {
      background-color: #f2f2f2;
    }
  }
</style>
