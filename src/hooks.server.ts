// import { auth } from "$lib/server/lucia";
// import { handleHooks } from "@lucia-auth/sveltekit";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

const securityHeaders = new Map([
  // ["cross-origin-embedder-policy", "require-corp"],
  ["cross-origin-opener-policy", "same-origin"],
  ["cross-origin-resource-policy", "same-origin"],
  ["referrer-policy", "no-referrer"],
  ["x-content-type-options", "nosniff"],
  ["x-frame-options", "SAMEORIGIN"],
]);

export const customHandle: Handle = async ({ resolve, event }) => {
  event.locals.ua = event.request.headers.get('user-agent');
  const response = await resolve(event);

  securityHeaders.forEach((value, header) => response.headers.set(header, value));

  return response;
}

export const handle: Handle = sequence(customHandle);