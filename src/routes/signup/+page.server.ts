import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

export async function load({ cookies }) {
  return {
    brand: cookies.get("brand")
  }
}

export const actions: Actions = {
  default: async ({ request, url, locals: { supabase }, cookies }) => {
    const { 
      email, 
      password,
      first_name,
      last_name,
    } = Object.fromEntries(
      await request.formData()
    ) as Record<string, string>

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${url.origin}/auth/callback?brand=${cookies.get("brand")}`,
        data: {
          first_name,
          last_name
        }
      }
    });
    
    if (error) {
      return fail(500, { message: "Server error. Try again later.", success: false, email });
    }

    return {
      message: "Please check your email for a magic link to log into the website.",
      success: true
    };
  }
};