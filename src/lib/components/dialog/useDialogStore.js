import { writable } from "svelte/store";

function useDialogStore(open = false) {
  return writable({
    open,
  });
}

export default useDialogStore;
