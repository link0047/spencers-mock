import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const { user } = await locals.validateUser();
  
  if (!user) {
    throw redirect(302, "/login");
  }

  return { user };
}