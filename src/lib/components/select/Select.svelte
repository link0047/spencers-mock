<script lang="ts">
  import generateId from "$lib/client/util/local-unique-id-generator.js";
  const uid = generateId("select");
  const selectId = `aria-uikit-select-${uid}`;
  const labelId = `${selectId}-label`;
  const errorId = `${selectId}-error`;
  export let label = "";
  export let value: string | number | undefined = undefined;
</script>

<div class="select">
  <label id={labelId} for={selectId} class="select__label">
    {#if $$slots.label}
      <slot name="label" />
    {:else}
      {label}
    {/if}
  </label>
  <select
    id={selectId}
    class="select__native-control"
    on:change
    on:contextmenu
    on:input
    bind:value
    {...$$restProps}
  >
    <slot />
  </select>
  <div class="error__message" aria-live="assertive" id={errorId} role="alert" />
</div>

<style>
  .select {
    display: grid;
    gap: 4px;
  }

  .select__label {
    font-size: 0.875rem;
    line-height: 1;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
  }

  .select__label:empty {
    display: none;
  }

  .select__native-control {
    appearance: none;
    color: #212121;
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 0.04em;
    border: 1px solid;
    border-color: #949499;
    border-radius: 4px;
    background-color: #fff;
    height: 36px;
    width: 100%;
    min-width: 88px;
    padding: 8px;
    background-image: url('data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="%23212121" viewBox="0 0 24 24"><path d="M12 18.17L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83z"/></svg>');
    background-repeat: no-repeat;
    background-position: right;
  }

  .select__native-control:hover {
    outline-offset: -2px;
    outline: 2px solid #000;
  }

  .select__native-control:focus-visible {
    outline-offset: -2px;
    outline: 2px solid #007acc;
  }

  .error__message {
    font-size: 0.875rem;
  }
</style>
