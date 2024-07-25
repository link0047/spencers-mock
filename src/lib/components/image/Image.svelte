<script lang="ts">
  export let src = "";
  export let alt = "";
  export let width = "";
  export let height = "";
  export let loading: "lazy" | "eager" | null | undefined = "lazy";
  export let decoding: "async" | "auto" | "sync" = "async"
  export let priority: "auto" | "high" | "low" | null = null;
</script>

<img class="image" {src} {alt} fetchpriority={priority} {width} {height} {loading} {decoding} {...$$restProps} />

<style>
  .image {
    width: 100%;
    display: block;
    height: auto;
  }
</style>