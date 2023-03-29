import { writable } from "svelte/store";

function useRadioState() {
  return writable(new Map());
}

export default useRadioState;
