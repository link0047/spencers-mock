import { auth } from "$lib/server/lucia";
import { handleHooks } from "@lucia-auth/sveltekit";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

export const customHandle: Handle = async ({ resolve, event }) => {
  event.locals.ua = event.request.headers.get('user-agent');
  const response = await resolve(event);

  return response;
}

export const handle: Handle = sequence(handleHooks(auth), customHandle)