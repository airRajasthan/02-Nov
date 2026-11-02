import dotenv from "dotenv";
import { runMigrations } from "../db/migrate";

dotenv.config();

async function main() {
  console.log("Checking MySQL connection and applying versioned migrations...");
  try {
    const result = await runMigrations();
    console.log(`Success: ${result.executed.length} new migration(s) applied. Total: ${result.total}.`);
    if (result.executed.length > 0) {
      console.log("Newly executed migrations:", result.executed.join(", "));
    }
    process.exit(0);
  } catch (error: any) {
    console.error("Migration execution failed:", error?.message || error);
    process.exit(1);
  }
}

main();
