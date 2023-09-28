<script>
  import { writable } from "svelte/store";
  import { setContext } from "svelte";

  const state = writable({
    index: 0,
    children: [],
  });

  setContext("state", state);

  function menuEvents(node) {
    $state.children = Array.from(node.querySelectorAll(".menu__item"));
    let maxSteps = $state.children.length - 1;
    $state.children[$state.index].setAttribute("tabindex", "0");

    let observer = new MutationObserver((mutations) => {
      console.log($state.index);
      $state.children = Array.from(node.querySelectorAll(".menu__item"));
      maxSteps = $state.children.length - 1;
      // $state.children.forEach(item => item.tabIndex = "-1");
      $state.children[$state.index].setAttribute("tabindex", "-1");
      $state.index = 0;
      $state.children[$state.index].setAttribute("tabindex", "0");
      $state.children[$state.index].focus();
    });

    function move(step) {
      $state.children[$state.index].setAttribute("tabindex", "-1");

      $state.index += step;
      if ($state.index < 0) {
        $state.index = maxSteps;
      }

      if ($state.index > maxSteps) {
        $state.index = 0;
      }

      $state.children[$state.index].setAttribute("tabindex", "0");
      $state.children[$state.index].focus();
    }

    function handleKeyup(event) {
      const { key } = event;
      switch (key) {
        case "Tab":
          $state.children[$state.index].focus();
          break;
        case " ":
        case "Enter":
          break;
        case "Down":
        case "ArrowDown":
          move(1);
          break;
        case "Up":
        case "ArrowUp":
          move(-1);
          break;
        case "Left":
        case "ArrowLeft":
          break;
        case "Right":
        case "ArrowRight":
          break;
        case "Home":
        case "PageUp":
          break;
        case "End":
        case "PageDown":
          break;
        default:
          break;
      }
    }

    observer.observe(node, { childList: true });
    node.addEventListener("keyup", handleKeyup);

    return {
      destroy() {
        node.removeEventListener("keyup", handleKeyup);
        observer.disconnect();
      },
    };
  }
</script>

<div use:menuEvents class="menu" role="menu">
  <slot />
</div>

<style>
  .menu {
    background-color: #fff;
    display: grid;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    padding: 0;
    margin: 0;
  }

  @media print {
    .menu {
      display: none;
    }
  }
</style>
