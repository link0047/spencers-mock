<script lang="ts">
  export let label: string | undefined = undefined
</script>
<nav aria-label={label} class="breadcrumbs">
  <ol class="breadcrumbs__list">
    <slot />
  </ol>
</nav>
<style>
.breadcrumbs {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
  font-weight: 400;
  line-height: 1.4rem;
  font-size: 16px;
  direction: ltr;
  background-color: #fff;
  unicode-bidi: embed;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
  font-synthesis: none;
  font-feature-settings: 'liga','kern';
}
  
.breadcrumbs__list {
  list-style: none;
  display: flex;
  flex-flow: row wrap;
  margin: 0;
  padding: 0
}

/* @media (max-width:560px) {
  .breadcrumbs__list {
    flex-wrap: initial;
    overflow-x: auto;
  }
} */
</style>