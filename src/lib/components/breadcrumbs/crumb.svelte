<script lang="ts">
  export let current: boolean = false;
  export let href: string | undefined | null = undefined;
  export let title: string | undefined | null = undefined;
</script>
<li class="breadcrumbs__crumb">
  {#if !current}
  <a 
    aria-label={title}
    class="breadcrumbs__link" 
    {href}
    {title}
    on:click
    on:focus
    on:blur
  >
    <slot />
  </a>
  {:else}
    <div class="breadcrumbs__link" aria-current="page" {title} aria-label={title}>
      <slot/>
    </div>
  {/if}
</li>
<style>
.breadcrumbs__crumb {
  display: flex;
  font-size: .875rem;
  color: #212121;
  text-transform: capitalize;
}

.breadcrumbs__crumb:not(:last-child):after {
  content: "/";
  margin: 0 8px
}

.breadcrumbs__link {
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  outline: 0
}

.breadcrumbs__link,
.breadcrumbs__link:visited {
  color: #6f6f6f
}

.breadcrumbs__link:not([aria-current=page]):hover {
  color: #285bc7;
  text-decoration: underline
}

[aria-current=page].breadcrumbs__link {
  color: #212121;
  cursor: default
}
</style>