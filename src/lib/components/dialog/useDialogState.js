import { writable } from "svelte/store";
import generateId from "$lib/client/util/local-unique-id-generator.js";

function useDialogState(open = false) {
  const id = generateId("dialog");
  return {
    dialogId: `aria-uikit-dialog-${id}`,
    disclosureId: `aria-uikit-dialog-disclosure-${id}`,
    open: writable(open)
  };
}

export default useDialogState;
