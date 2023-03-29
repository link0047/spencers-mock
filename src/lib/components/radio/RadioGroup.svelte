<script lang="ts">
  import { setContext } from "svelte";
  export let state;
  export let labeledBy: string | undefined = undefined;

  setContext("state", state);
</script>

<div aria-labelledby={labeledBy} class="radio-group" role="radiogroup">
  <slot />
</div>
