<script>
  import generateId from "$lib/client/util/local-unique-id-generator";
  const uid = generateId("switch");
  const id = `aria-uikit-switch-${uid}`;
  const labelId = `${id}-label`;
  export let checked = undefined;
  export let value = "on";
</script>

<div class="switch">
  <input
    {id}
    type="checkbox"
    role="switch"
    class="switch__native-control"
    bind:checked
    on:keyup
    on:keydown
    on:keypress
    on:focus
    on:blur
    on:click
    on:mouseover
    on:mouseenter
    on:mouseleave
    on:change
    {value}
    {...$$restProps}
  />
  <div class="switch__control" />
  {#if $$slots.default}
    <label id={labelId} class="switch__label">
      <slot />
    </label>
  {/if}
</div>

<style>
  :root {
  }

  .switch {
    position: relative;
    display: inline-flex;
    gap: 8px;
    align-items: center;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    width: 36px;
  }

  .switch__label {
    line-height: 1;
    font-size: 1rem;
    font-weight: 400;
  }

  .switch__native-control {
    width: 100%;
    height: 100%;
    cursor: pointer;
    margin: 0px;
    opacity: 0;
    padding: 0px;
    position: absolute;
    z-index: 2;
  }

  .switch__control {
    position: relative;
    width: 36px;
    height: 20px;
    display: inline-flex;
  }

  .switch__control:before {
    content: "";
    width: 20px;
    height: 20px;
    border: 2px solid #6d6d6d;
    border-radius: 50%;
    background-color: #fdfdfd;
    display: block;
    box-sizing: border-box;
    transition: transform ease-in-out 0.1s;
    z-index: 1;
  }

  .switch__control:after {
    content: "";
    width: 100%;
    height: 100%;
    background-color: #d5d5d5;
    border-radius: 10px;
    display: block;
    position: absolute;
    z-index: 0;
    transition: background-color ease-in-out 0.1s;
  }

  .switch__native-control:checked + .switch__control:before {
    border-color: #464646;
    /* border-color: #167af3; */
    transform: translate3d(16px, 0, 0);
  }

  .switch__native-control:checked + .switch__control:after {
    background-color: #464646;
    /* background-color: #167af3; */
  }

  .switch__native-control:focus-visible + .switch__control:after {
    outline: 2px solid #167af3;
    outline-offset: 2px;
  }
</style>
