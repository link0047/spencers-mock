import { writable } from "svelte/store";
import generateId from "$lib/client/util/local-unique-id-generator";

const uid = generateId("tooltip");

export default function useTooltipState(open = false) {
	return {
		id: `aria-uikit-tooltip-${uid}`,
		anchorId: `aria-uikit-tooltip-anchor-${uid}`,
		open: writable(open)
	};
}