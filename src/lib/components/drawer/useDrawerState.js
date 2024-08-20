import { writable } from "svelte/store";
import generateId from "$lib/client/util/local-unique-id-generator.js";

function useDrawerState(open = false) {
	const id = generateId("drawer");
	return {
		drawerId: `aria-uikit-drawer-${id}`,
    disclosureId: `aria-uikit-drawer-disclosure-${id}`,
		open: writable(open)
	};
}

export default useDrawerState;