import { PrismaClient } from '@prisma/client';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
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
			validate: import("@lucia-auth/sveltekit").Validate
			validateUser: import("@lucia-auth/sveltekit").ValidateUser
			setSession: import("@lucia-auth/sveltekit").SetSession
		}
		
		// interface PageData {}
		// interface Platform {}
	}

	// eslint-disable-next-line no-var
	var prisma: PrismaClient

  declare namespace Lucia {
    type Auth = import("$lib/server/lucia").Auth;
    type UserAttributes = {
      username: string
      name: string
    }
  }

}

export {};
