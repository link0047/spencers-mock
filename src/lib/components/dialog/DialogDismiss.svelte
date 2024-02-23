<script lang="ts">
  import Button from "$lib/components/button/Button-new.svelte";
  import Icon from "$lib/components/icon";
  import { getContext } from "svelte";

  const close = getContext<() => void>("close");
</script>

<Button on:click={close} variant="icon">
  <Icon>
    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"/>
  </Icon>
</Button>