<script lang="ts">
  export let size: "sm" | "md" | "lg" = "md";
  export let rounded: boolean = false;
  export let color: "primary" | "secondary" | "success" | "danger" | "warning" | "info" = "primary";
</script>

<div 
  class="uikit-badge"
  class:uikit-badge--rounded={rounded}
  class:uikit-badge--sizeSM={size === "sm"}
  class:uikit-badge--sizeMD={size === "md"}
  class:uikit-badge--sizeLG={size === "lg"}
  class:uikit-badge--colorPrimary={color === "primary"}
  class:uikit-badge--colorSecondary={color === "secondary"}
  class:uikit-badge--colorSuccess={color === "success"}
  class:uikit-badge--colorDanger={color === "danger"}
  class:uikit-badge--colorWarning={color === "warning"}
  class:uikit-badge--colorInfo={color === "info"}
>
  <slot />
</div>

<style>
  :root {
    --uikit-badge-padding-inline: .875rem;
    --uikit-badge-border-radius: .25rem;
    --uikit-badge-bg: #2a508f;
    --uikit-badge-color: #fff;
    --uikit-badge-font-weight: 500;
    --uikit-badge-font-size: .875rem;
    --uikit-badge-height: 2rem;
  }

  .uikit-badge {
    background-color: var(--uikit-badge-bg);
    font-size: var(--uikit-badge-font-size);
    font-weight: var(--uikit-badge-font-weight);
    display: inline-flex;
    height: var(--uikit-badge-font-height);
    width: fit-content;
    padding-inline: var( --uikit-badge-padding-inline);
    align-items: center;
    justify-content: center;
    color: var(--uikit-badge-color);
    border-radius: var(--uikit-badge-border-radius);
  }

  .uikit-badge--rounded {
    --uikit-badge-border-radius: 9999px;
  }

  .uikit-badge--sizeSM {
    --uikit-badge-font-height: 1.5rem;
  }

  .uikit-badge--sizeMD {
    --uikit-badge-font-height: 2.5rem;
  }

  .uikit-badge--sizeLG {
    --uikit-badge-font-height: 3rem;
  }

  .uikit-badge--colorPrimary {
    --uikit-badge-bg: #2a508f;
  }

  .uikit-badge--colorSecondary {
    --uikit-badge-bg: #6c757d;
  }

  .uikit-badge--colorSuccess {
    --uikit-badge-bg: #28a745;
  }

  .uikit-badge--colorDanger {
    --uikit-badge-bg: #dc3545;
  }

  .uikit-badge--colorWarning {
    --uikit-badge-bg: #ffc107;
  }

  .uikit-badge--colorInfo {
    --uikit-badge-bg: #17a2b8;
  }
</style>