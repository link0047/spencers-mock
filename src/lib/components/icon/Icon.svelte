<script>
  export let viewbox = "0 0 24 24";
  export let variant = "";
  export let size = "";
</script>

<svg
  class="icon"
  class:icon--logo={variant === "logo"}
  class:icon--sm={size === "sm"}
  role="presentation"
  viewBox={viewbox}
  {...$$restProps}
>
  <slot />
</svg>

<style>
  .icon {
    width: 24px;
    height: 24px;
    fill: #222;
  }

  .icon--sm {
    width: 16px;
    height: 16px;
  }

  .icon--logo {
    width: 72px;
    height: 32px;
  }
</style>
