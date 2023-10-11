import { fail, redirect } from "@sveltejs/kit";
import { AuthApiError } from "@supabase/supabase-js";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ request, cookies, locals: { supabase } }) => {
    const { email, password } = Object.fromEntries(
      await request.formData()
    ) as Record<string, string>

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    
   if (error) {
      if (error instanceof AuthApiError && error.status === 400) {
        return fail(400, {
          error: "Invalid credentials.",
          values: {
            email,
          },
        });
      }

      return fail(500, {
        error: "Server error. Try again later.",
        values: {
          email,
        },
      });
    }

    throw redirect(303, `/${cookies.get("brand")}`);
  }
};