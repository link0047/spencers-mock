<script lang="ts">
  export let value: string | undefined;
</script>

<option {value} {...$$restProps}>
  <slot />
</option>
