<script lang="ts">
  import type { Writable } from "svelte/store";
  import { getContext, onMount } from "svelte";
  import generateId from "$lib/client/util/local-unique-id-generator.js";
  export let id = generateId("radio");
  export let checked = false;
  export let value: string | undefined = undefined;
  let state: Writable<Map<String, HTMLInputElement>> = getContext("state");
  let ref: HTMLInputElement;

  function handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const { name } = <HTMLInputElement>target;
    if (name && $state?.has(name)) {
      const elem = $state?.get(name);
      elem?.setAttribute("aria-checked", "false");
      elem?.parentElement?.setAttribute("data-checked", "false");
    }

    if (name) {
      $state?.set(name, target);
    }

    target?.setAttribute("aria-checked", "true");
    target?.parentElement?.setAttribute("data-checked", "false");
  }

  onMount(async () => {
    if (ref.name && checked) {
      $state?.set(ref.name, ref);
    }
  });
</script>

<label class="radio" data-checked={checked}>
  <input
    bind:this={ref}
    aria-checked={checked}
    {checked}
    class="radio__native-control"
    {id}
    {value}
    type="radio"
    on:focus
    on:blur
    on:change={handleChange}
    on:change
    {...$$restProps}
  />
  <slot />
</label>

<style>
  .radio {
    box-sizing: border-box;
    font-size: 0.875rem;
    font-weight: 400;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    position: relative;
    display: flex;
    min-height: 24px;
    align-items: center;
    flex-flow: row wrap;
    line-height: 1;
    cursor: pointer;
  }

  .radio__native-control {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    opacity: 0;
    cursor: inherit;
    z-index: -1;
  }

  .radio:before {
    box-sizing: border-box;
    content: "";
    width: 18px;
    height: 18px;
    border: 2px solid #767677;
    border-radius: 50%;
    margin-right: 4px;
  }

  .radio:has(.radio__native-control:focus):before,
  .radio:hover:before {
    border-color: #000;
  }

  .radio[data-checked="true"]:before {
    border-color: #0075ff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle fill='%230075ff' cx='50%25' cy='50%25' r='8'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: cover;
  }

  .radio[data-checked="true"]:focus:before,
  .radio[data-checked="true"]:hover:before {
    border-color: #004699;
  }
</style>
