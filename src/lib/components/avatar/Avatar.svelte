<script lang="ts">
  export let size: string | null = null;
  export let mask: string | null = null;
  export let src: string | null = null;
  export let text: string | null = null;
  export let rounded = false;
  export let ring = false;

  const sizeMap = {
    xs: 24,
    sm: 32,
    lg: 64,
  };

  let imgSize = sizeMap[size] || 48;
</script>

<div
  class="avatar"
  class:avatar--rounded={rounded}
  class:avatar--ring={ring}
  class:avatar--xs={size === "xs"}
  class:avatar--sm={size === "sm"}
  class:avatar--lg={size === "lg"}
  class:mask-squircle={mask === "squircle"}
  class:mask-hexagon={mask === "hexagon"}
  class:mask-triangle={mask === "triangle"}
  class:mask-heart={mask === "heart"}
>
  {#if src}
    <img class="avatar__image" {src} width={imgSize} height={imgSize} alt="" />
  {/if}
  {#if text}
    {text}
  {/if}
</div>

<style>
  .avatar {
    display: flex;
    aspect-ratio: 1/1;
    overflow: hidden;
    width: 48px;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
  }

  .avatar__image {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .avatar--rounded {
    border-radius: 50%;
  }

  .avatar--ring {
    border: 2px solid #ccc;
  }

  .avatar--xs {
    width: 24px;
  }

  .avatar--sm {
    width: 32px;
  }

  .avatar--lg {
    width: 64px;
  }

  :is(.mask-squircle, .mask-heart, .mask-hexagon, .mask-triangle) {
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-position: center;
  }

  .mask-squircle {
    -webkit-mask-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjAwJyBoZWlnaHQ9JzIwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBkPSdNMTAwIDBDMjAgMCAwIDIwIDAgMTAwczIwIDEwMCAxMDAgMTAwIDEwMC0yMCAxMDAtMTAwUzE4MCAwIDEwMCAwWicvPjwvc3ZnPg==);
    mask-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjAwJyBoZWlnaHQ9JzIwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBkPSdNMTAwIDBDMjAgMCAwIDIwIDAgMTAwczIwIDEwMCAxMDAgMTAwIDEwMC0yMCAxMDAtMTAwUzE4MCAwIDEwMCAwWicvPjwvc3ZnPg==);
  }

  .mask-heart {
    -webkit-mask-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjAwJyBoZWlnaHQ9JzE4NScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBkPSdNMTAwIDE4NC42MDZhMTUuMzg0IDE1LjM4NCAwIDAgMS04LjY1My0yLjY3OEM1My41NjUgMTU2LjI4IDM3LjIwNSAxMzguNjk1IDI4LjE4MiAxMjcuNyA4Ljk1MiAxMDQuMjY0LS4yNTQgODAuMjAyLjAwNSA1NC4xNDYuMzA4IDI0LjI4NyAyNC4yNjQgMCA1My40MDYgMGMyMS4xOTIgMCAzNS44NjkgMTEuOTM3IDQ0LjQxNiAyMS44NzlhMi44ODQgMi44ODQgMCAwIDAgNC4zNTYgMEMxMTAuNzI1IDExLjkyNyAxMjUuNDAyIDAgMTQ2LjU5NCAwYzI5LjE0MiAwIDUzLjA5OCAyNC4yODcgNTMuNCA1NC4xNTEuMjYgMjYuMDYxLTguOTU2IDUwLjEyMi0yOC4xNzYgNzMuNTU0LTkuMDIzIDEwLjk5NC0yNS4zODMgMjguNTgtNjMuMTY1IDU0LjIyOGExNS4zODQgMTUuMzg0IDAgMCAxLTguNjUzIDIuNjczWicgZmlsbD0nYmxhY2snIGZpbGwtcnVsZT0nbm9uemVybycvPjwvc3ZnPg==);
    mask-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjAwJyBoZWlnaHQ9JzE4NScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBkPSdNMTAwIDE4NC42MDZhMTUuMzg0IDE1LjM4NCAwIDAgMS04LjY1My0yLjY3OEM1My41NjUgMTU2LjI4IDM3LjIwNSAxMzguNjk1IDI4LjE4MiAxMjcuNyA4Ljk1MiAxMDQuMjY0LS4yNTQgODAuMjAyLjAwNSA1NC4xNDYuMzA4IDI0LjI4NyAyNC4yNjQgMCA1My40MDYgMGMyMS4xOTIgMCAzNS44NjkgMTEuOTM3IDQ0LjQxNiAyMS44NzlhMi44ODQgMi44ODQgMCAwIDAgNC4zNTYgMEMxMTAuNzI1IDExLjkyNyAxMjUuNDAyIDAgMTQ2LjU5NCAwYzI5LjE0MiAwIDUzLjA5OCAyNC4yODcgNTMuNCA1NC4xNTEuMjYgMjYuMDYxLTguOTU2IDUwLjEyMi0yOC4xNzYgNzMuNTU0LTkuMDIzIDEwLjk5NC0yNS4zODMgMjguNTgtNjMuMTY1IDU0LjIyOGExNS4zODQgMTUuMzg0IDAgMCAxLTguNjUzIDIuNjczWicgZmlsbD0nYmxhY2snIGZpbGwtcnVsZT0nbm9uemVybycvPjwvc3ZnPg==);
  }

  .mask-hexagon {
    -webkit-mask-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTgyJyBoZWlnaHQ9JzIwMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBkPSdNLjMgNjUuNDg2YzAtOS4xOTYgNi42ODctMjAuMDYzIDE0LjIxMS0yNS4wNzhsNjEuODYtMzUuOTQ2YzguMzYtNS4wMTYgMjAuODk5LTUuMDE2IDI5LjI1OCAwbDYxLjg2IDM1Ljk0NmM4LjM2IDUuMDE1IDE0LjIxMSAxNS44ODIgMTQuMjExIDI1LjA3OHY3MS4wNTVjMCA5LjE5Ni02LjY4NyAyMC4wNjMtMTQuMjExIDI1LjA3OWwtNjEuODYgMzUuOTQ1Yy04LjM2IDQuMTgtMjAuODk5IDQuMTgtMjkuMjU4IDBMMTQuNTEgMTYxLjYyQzYuMTUxIDE1Ny40NC4zIDE0NS43MzcuMyAxMzYuNTRWNjUuNDg2WicgZmlsbD0nYmxhY2snIGZpbGwtcnVsZT0nbm9uemVybycvPjwvc3ZnPg==);
    mask-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTgyJyBoZWlnaHQ9JzIwMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBkPSdNLjMgNjUuNDg2YzAtOS4xOTYgNi42ODctMjAuMDYzIDE0LjIxMS0yNS4wNzhsNjEuODYtMzUuOTQ2YzguMzYtNS4wMTYgMjAuODk5LTUuMDE2IDI5LjI1OCAwbDYxLjg2IDM1Ljk0NmM4LjM2IDUuMDE1IDE0LjIxMSAxNS44ODIgMTQuMjExIDI1LjA3OHY3MS4wNTVjMCA5LjE5Ni02LjY4NyAyMC4wNjMtMTQuMjExIDI1LjA3OWwtNjEuODYgMzUuOTQ1Yy04LjM2IDQuMTgtMjAuODk5IDQuMTgtMjkuMjU4IDBMMTQuNTEgMTYxLjYyQzYuMTUxIDE1Ny40NC4zIDE0NS43MzcuMyAxMzYuNTRWNjUuNDg2WicgZmlsbD0nYmxhY2snIGZpbGwtcnVsZT0nbm9uemVybycvPjwvc3ZnPg==);
  }

  .mask-triangle {
    -webkit-mask-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTc0JyBoZWlnaHQ9JzE0OScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBmaWxsPSdibGFjaycgZD0nbTg3IDE0OC40NzYtODYuNjAzLjE4NUw0My44NiA3NC40MjMgODcgMGw0My4xNCA3NC40MjMgNDMuNDYzIDc0LjIzOHonIGZpbGwtcnVsZT0nZXZlbm9kZCcvPjwvc3ZnPg==);
    mask-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTc0JyBoZWlnaHQ9JzE0OScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBmaWxsPSdibGFjaycgZD0nbTg3IDE0OC40NzYtODYuNjAzLjE4NUw0My44NiA3NC40MjMgODcgMGw0My4xNCA3NC40MjMgNDMuNDYzIDc0LjIzOHonIGZpbGwtcnVsZT0nZXZlbm9kZCcvPjwvc3ZnPg==);
  }
</style>
