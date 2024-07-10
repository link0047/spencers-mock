import { defineConfig } from "drizzle-kit";
import { env } from "$env/static/private";

export default defineConfig({
  schema: "./src/lib/server/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: `${env.DATABASE_URI}`,
  }
});