<script>
  import { writable } from "svelte/store";
  import { setContext } from "svelte";
  export let label = null;

  const state = writable({
    index: 0,
    children: [],
  });

  setContext("state", state);

  function menuBarEvents(node) {
    $state.children = Array.from(node.querySelectorAll(".menubar__item"));
    let maxSteps = $state.children.length - 1;

    $state.children[$state.index].setAttribute("tabindex", "0");

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
      const { key, shiftKey } = event;
      switch (key) {
        case "Tab":
          $state.children[$state.index].focus();
          return;
          break;
        case " ":
        case "Enter":
          break;
        case "Down":
        case "ArrowDown":
          break;
        case "Up":
        case "ArrowUp":
          break;
        case "Left":
        case "ArrowLeft":
          move(-1);
          break;
        case "Right":
        case "ArrowRight":
          move(1);
          break;
        case "Home":
        case "PageUp":
          if ($state.index === 0) return;
          if ($state.index > 0) {
            $state.children[$state.index].setAttribute("tabindex", "-1");
          }
          $state.children[0].setAttribute("tabindex", "0");
          break;
        case "End":
        case "PageDown":
          if ($state.index === maxSteps) return;
          if ($state.index > 0) {
            $state.children[$state.index].setAttribute("tabindex", "-1");
          }
          $state.children[maxSteps].setAttribute("tabindex", "0");
          break;
        default:
          break;
      }
    }

    function handleFocusout(event) {
      node.classList.remove("focus");
    }

    function handleFocusin(event) {
      node.classList.add("focus");
    }

    node.addEventListener("keyup", handleKeyup);
    node.addEventListener("focusout", handleFocusout);
    node.addEventListener("focusin", handleFocusin);

    return {
      destroy() {
        node.removeEventListener("focusout", handleFocusout);
        node.removeEventListener("focusin", handleFocusin);
        node.removeEventListener("keyup", handleKeyup);
      },
    };
  }
</script>

<div use:menuBarEvents aria-label={label} class="menubar" role="menubar">
  <slot />
</div>

<style>
  .menubar {
    position: relative;
    min-height: 40px;
    background-color: #fff;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
  }
</style>
