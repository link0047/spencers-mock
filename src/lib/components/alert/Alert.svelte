<div class="alert" role="alert">
  <slot name="title" />
  <slot name="description" />
  <slot />
</div>

<style>
  .alert {
    display: grid;
    padding: 1rem;
    position: relative;
    width: 100%;
  }
</style>
