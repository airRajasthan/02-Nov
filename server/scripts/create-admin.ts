import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { getPool } from "../db/connection";
import { runMigrations } from "../db/migrate";
import { generateUuid } from "../middleware/auth";

dotenv.config();

async function main() {
  const email = process.env.INITIAL_ADMIN_EMAIL || process.argv[2];
  const password = process.env.INITIAL_ADMIN_PASSWORD || process.argv[3];
  const name = process.env.INITIAL_ADMIN_NAME || process.argv[4] || "Administrator";

  if (!email || !password) {
    console.error("Usage: INITIAL_ADMIN_EMAIL=admin@example.com INITIAL_ADMIN_PASSWORD=secret npx tsx server/scripts/create-admin.ts");
    console.error("   or: npx tsx server/scripts/create-admin.ts <email> <password> [name]");
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("Error: Password must be at least 8 characters long for administrative security.");
    process.exit(1);
  }

  console.log("Running migrations to ensure database tables are up to date...");
  try {
    const migrationResult = await runMigrations();
    console.log(`Migrations complete. Total migrations applied: ${migrationResult.total}`);
  } catch (err: any) {
    console.error("Failed running migrations before creating admin:", err.message);
    process.exit(1);
  }

  const pool = getPool();
  try {
    const [existing] = await pool.query(
      "SELECT id, email, role FROM staff_users WHERE email = ?",
      [email.toLowerCase()]
    );
    const existingList = existing as any[];

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);

    if (existingList.length > 0) {
      console.log(`Administrator ${email} already exists. Updating credentials...`);
      await pool.query(
        "UPDATE staff_users SET password_hash = ?, role = 'ADMIN', name = ?, is_active = 1 WHERE email = ?",
        [hash, name, email.toLowerCase()]
      );
      console.log(`Administrator [${email}] credentials successfully updated.`);
    } else {
      const id = generateUuid();
      await pool.query(
        "INSERT INTO staff_users (id, email, password_hash, name, role, is_active) VALUES (?, ?, ?, ?, 'ADMIN', 1)",
        [id, email.toLowerCase(), hash, name]
      );
      console.log(`Administrator [${email}] successfully created with ID: ${id}.`);
    }
    process.exit(0);
  } catch (err: any) {
    console.error("Failed to create administrator:", err.message);
    process.exit(1);
  }
}

main();
