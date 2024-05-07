<script>
  export let href = "";
  export let variant = "default";
  export let color = "primary";
</script>

<a
  class="link"
  class:link--underline={variant === "underline"}
  class:link--color-secondary={color === "secondary"}
  {href}
  {...$$restProps}
>
  <slot />
</a>

<style>
  .link {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
      sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
    font-size: 16px;
    font-weight: 400;
    color: #1a73e8;
  }

  .link--underline,
  .link:hover {
    text-decoration: underline;
  }

  .link:hover {
    color: #174ea6;
  }

  .link:focus-visible {
    border-radius: 4px;
    outline: 2px solid #174ea6;
    outline-offset: 2px;
    color: #174eab;
  }

  .link--color-secondary {
    color: #212121;
  }
</style>
