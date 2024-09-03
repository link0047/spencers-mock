<script>
  import generateId from "$lib/client/util/local-unique-id-generator";
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

<div class="fulfillment-container">
  <h2 class="fulfillment__heading">
    How you'll get this item
  </h2>
  <div class="fulfillment-group" role="group">
    <slot />
  </div>
  <div class="fulfillment-message">
    Your store: <Link variant="underline">Mays Landing</Link>
  </div>
</div>

<style>
  .fulfillment-container {
    display: grid;
    gap: 8px;
  }

  .fulfillment__heading {
    margin: 0;
    font-size: 1rem;
    color: #393939;
    color: #2e2f32;
  }

  .fulfillment-group {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
  }

  @media (min-width: 561px) {
    .fulfillment-group {
      gap: 16px;
    }
  }
</style>
