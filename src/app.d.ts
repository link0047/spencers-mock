// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { SupabaseClient, Session } from "@supabase/supabase-js";

declare global {
	interface Window {
		VisualViewport: {
			height: Number;
			offsetLeft: Number;
			offsetTop: Number;
			onresize: Number;
			onscroll: Number;
			pageLeft: Number;
			pageTop: Number;
			scale: Number;
			width: Number;
		}
	}

	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient
			getSession(): Promise<Session | null>
			ua: string | undefined
		}
		
		interface PageData {
			session: Session | null
		}
		// interface Platform {}
	}

}

export {};
