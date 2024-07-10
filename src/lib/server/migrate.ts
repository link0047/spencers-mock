import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./db";

async function migrateDB() {
  try {
    console.log("Starting database migration...");
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("Database migration completed successfully.");
  } catch (error) {
    console.error("Error during database migration:", error.message);
    console.error("Stack trace:", error.stack);
    process.exit(1); // Exit the process with an error code
  }
}

// Self-executing function to run the migration
(async () => {
  await migrateDB();
})();