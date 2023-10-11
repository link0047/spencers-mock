import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from "$env/static/public";
import { createSupabaseServerClient } from "@supabase/auth-helpers-sveltekit";
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
  event.locals.supabase = createSupabaseServerClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event
  });

  event.locals.getSession = async () => {
    const {
      data: { session }
    } = await event.locals.supabase.auth.getSession();
    return session;
  }
  
  const response = await resolve(event, {
    filterSerializedResponseHeaders(name) { return name === "content-range"}
  });

  securityHeaders.forEach((value, header) => response.headers.set(header, value));

  return response;
}

export const handle: Handle = sequence(customHandle);