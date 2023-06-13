<script>
  export let selected = false;
</script>

<div
  id=""
  class="listbox__item"
  tabindex="-1"
  role="option"
  aria-selected={selected}
>
  <slot />
</div>
