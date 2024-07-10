import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

let client;
const connectionString = process.env.DATABASE_URI;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing in the environment variables.");
}

try {
  // Disable prefetch as it is not supported for "Transaction" pool mode
  client = postgres(connectionString, { prepare: false });
} catch (error) {
  console.error("Error connecting to the database:", error);
  process.exit(1); // Terminate the process if database connection fails
}

const db = drizzle(client, { schema });

export { client, db };