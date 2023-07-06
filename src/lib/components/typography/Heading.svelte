<script lang="ts">
  export let tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" = "h1";
  // export let color: string = 'text-gray-900 dark:text-white';
  // export let customSize: string = '';
  // const textSizes = {
  //   h1: 'text-5xl font-extrabold',
  //   h2: 'text-4xl font-bold',
  //   h3: 'text-3xl font-bold',
  //   h4: 'text-2xl font-bold',
  //   h5: 'text-xl font-bold',
  //   h6: 'text-lg font-bold'
  // };
</script>

<svelte:element this={tag} {...$$restProps}>
  <slot />
</svelte:element>

<style>
</style>
<script src="https://assets.adobedtm.com/782fd0293ca5/49cb3ac00441/launch-e02b7ebd006f-staging.min.js" async></script>