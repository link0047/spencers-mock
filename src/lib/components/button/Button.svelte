<script lang="ts">
  import generateId from "$lib/client/util/local-unique-id-generator.js";
  export let variant = "default";
  export let raised = false;
  export let disabled = false;
  export let size = "";
  export let label = "";
  export let el = null;
  export let rounded = false;
  export let fullwidth = false;
  export let stack = false;
  export let type: "button" | "reset" | "submit" | null | undefined = "button";
  let clazz = null;
  export { clazz as class };

  const id = `aria-uikit-button-${generateId("button")}`;
  const css = clazz ? ` ${clazz}` : "";
</script>

<button
  {id}
  bind:this={el}
  class={`btn${css}`}
  class:btn--primary={variant === "primary"}
  class:btn--success={variant === "success"}
  class:btn--outlined={variant === "outlined"}
  class:btn--underline={variant === "underline"}
  class:btn--icon={variant === "icon"}
  class:btn--rounded={rounded}
  class:btn--raised={raised}
  class:btn--sizeXs={size === "xs"}
  class:btn--sizeSmall={size === "small"}
  class:btn--sizeLarge={size === "large"}
  class:btn--full-width={fullwidth}
  class:btn--stack={stack}
  {type}
  aria-label={label}
  {disabled}
  {...$$restProps}
  on:click
  on:mouseover
  on:mouseenter
  on:mouseleave
  on:blur
  on:focus
>
  <slot />
</button>

<style>
  .btn {
    -webkit-tap-highlight-color: transparent;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    line-height: 1.875rem;
    text-decoration: none;
    text-transform: initial;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    min-width: 64px;
    height: 36px;
    padding: 0 16px;
    border: none;
    border-radius: 4px;
    outline: 0;
    background-color: transparent;
    overflow: hidden;
    touch-action: manipulation;
    user-select: none;
    appearance: none;
    gap: 4px;
    transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .btn--sizeXs {
    height: 24px;
    font-size: 0.75rem;
    min-width: fit-content;
    padding: 4px 0;
  }

  .btn--sizeSmall {
    height: 32px;
    font-size: 0.75rem;
  }

  .btn--icon {
    padding: 0;
    min-width: 32px;
    transition: transform 0.3s ease-in;
  }

  .btn--rounded {
    box-shadow: inset 0 0 0 2px #000;
    border-radius: 18px;
    padding: 0 16px;
  }

  .btn--full-width {
    width: 100%;
  }

  .btn--raised {
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
      0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .btn--raised:hover,
  .btn--raised:focus {
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
      0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  }

  .btn:not(:disabled) {
    color: #212121;
    background-color: transparent;
  }

  .btn:hover {
    background-color: #f2f2f2;
    cursor: pointer;
  }

  .btn:focus-visible {
    outline-offset: -2px;
    outline: 2px solid #145cb9;
  }

  .btn.btn--primary {
    background-color: #1767d0;
    color: #fff;
  }

  .btn--rounded.btn--primary {
    box-shadow: inset 0 0 0 2px #145cb9;
  }

  .btn.btn--success {
    background-color: #008a00;
    color: #fff;
  }

  .btn--underline {
    padding: 0;
  }

  .btn--underline:hover,
  .btn--underline:focus {
    background-color: transparent;
    text-decoration: underline;
  }

  .btn--stack {
    flex-flow: column;
    gap: 0;
  }
</style>
