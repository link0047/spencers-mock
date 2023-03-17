<script lang="ts">
  enum Tag {
    a = "a"
  }

  export let as: Tag;
  export let href: string;
  export let active = false;
</script>
{#if as == Tag.a}
  <a 
    class="menu__item"
    href={ href } 
    role="menuitem" 
    tabindex={ active ? 0 : -1 }
  >
    <slot />
  </a>
{:else}
  <button
    class="menu__item" 
    role="menuitem" 
    tabindex="-1"
  >
    <slot />
  </button>
{/if}
