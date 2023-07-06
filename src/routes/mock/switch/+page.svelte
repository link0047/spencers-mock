<script>
  import Switch from "$lib/components/switch/Switch.svelte";
  function handleChange({ target }) {
    let { checked, value } = target;
    if (checked) {
      value = "on";
    } else {
      value = "off";
    }
    console.log({ checked, value });
  }

  let value;
</script>

<div class="page">
  <div class="block">
    <h3 class="heading">Switch</h3>
    <Switch on:change={handleChange} bind:value />
  </div>
</div>

<style>
  .page {
    display: grid;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 16px 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    font-weight: 400;
    line-height: 1.4em;
    font-size: 16px;
    direction: ltr;
    background-color: #fff;
    unicode-bidi: embed;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
    font-synthesis: none;
    font-feature-settings: "liga", "kern";
  }

  .block {
    display: flex;
    flex-flow: column;
    gap: 8px;
  }

  .heading {
    line-height: 1;
    font-size: 0.875rem;
    font-weight: 400;
    margin: 0;
  }
</style>
