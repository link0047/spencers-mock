<script>
  import generateId from "$lib/client/util/local-unique-id-generator";
  export let open = false;
  export let variant = "default";
  export let store;
  let ref;
  const uid = generateId("dialog");
  const id = `aria-uikit-dialog-${uid}`;

  $: if (open) {
  } else {
  }
</script>

<div
  bind:this={ref}
  {id}
  aria-modal="true"
  role="dialog"
  class="dialog"
  class:dialog--fullscreen={variant === "fullscreen"}
  tabindex="-1"
>
  <slot />
</div>

<style>
  .dialog {
    position: fixed;
    top: 10vh;
    left: 50%;
    bottom: 10vh;
    display: flex;
    height: fit-content;
    max-height: 80vh;
    transform: translate3d(-50%, 0, 0);
    max-width: calc(100vw - 16px);
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  }

  .dialog--fullscreen {
  }
</style>
