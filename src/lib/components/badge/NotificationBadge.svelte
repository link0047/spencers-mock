<script>
  export let type = "";
  export let animate = "none";
</script>
<div
  class="badge"
  class:badge--size={type === "small"}
  class:badge--jiggle={animate === "jiggle"}
  aria-hidden="true"
>
  {#if type !== "small"}
    <slot />
  {/if}
</div>
<style>
  .badge {
    background-color: #2a508f;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
      Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: .75rem;
    font-weight: 400;
    line-height: 1;
    display: flex;
    height: 1rem;
    min-width: 1rem;
    padding: 0 .25rem;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: .5rem;
    position: absolute;
    top: 0;
    right: 0;
  }

  .badge--jiggle {
    animation: jiggle 5s cubic-bezier(.25,.1,.25,1) infinite;
  }

  @keyframes jiggle {
    0%, 9%, 18% {
      transform: translateY(0);
    }

    2% {
      transform: translateY(-10px);
    }

    3% {
      transform: translateY(-3px);
    }

    5% {
      transform: translateY(-8px);
    }

    7% {
      transform: translateY(-2px);
    }

    11% {
      transform: translateY(-10px);
    }

    12% {
      transform: translateY(-3px);
    }

    14% {
      transform: translateY(-8px);
    }

    16% {
      transform: translateY(-2px);
    }
  }
</style>