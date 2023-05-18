<script>
  import generateId from "$lib/client/util/local-unique-id-generator.js";
  import Link from "$lib/components/link";
  import { writable } from "svelte/store";
  import { setContext } from "svelte";

  let optionId = 0;

  function generateOptionId() {
    return optionId++;
  }

  const state = writable({
    id: `fulfillment-${generateId("fulfillment")}`,
    generateOptionId,
    selectedIndex: 0,
  });

  setContext("state", state);
</script>

<div class="fulfillment-group" role="group">
  <slot />
</div>
<div class="fulfillment-message">
  Your store: <Link variant="underline">Mays Landing</Link>
</div>

<style>
  .fulfillment-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(164px, 1fr));
    gap: 8px;
  }

  @media (min-width: 561px) {
    .fulfillment-group {
      gap: 16px;
    }
  }
</style>
