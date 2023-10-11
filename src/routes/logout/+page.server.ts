import { redirect } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ locals: { supabase }, cookies }) => {
    await supabase.auth.signOut()
    throw redirect(303, `/${cookies.get("brand")}`);
  }
}