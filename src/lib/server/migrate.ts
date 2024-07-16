import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db, client } from "./db";

async function migrateDB() {
  try {
    console.log("Starting database migration...");
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("Database migration completed successfully.");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error during database migration:", error.message);
      console.error("Stack trace:", error.stack);
    }
  } finally {
    // Close the database connection and exit the process
    await client.end({ timeout: 10 });
    process.exit(); // Explicitly exit the process when done
  }
}

// Self-executing function to run the migration
(async () => {
  await migrateDB();
})();