import fs from "fs";
import path from "path";
import { getPool } from "./connection";

export async function runMigrations(): Promise<{ executed: string[]; total: number }> {
  const pool = getPool();
  const migrationsDir = path.resolve(process.cwd(), "server", "migrations");

  // Create migration tracking table if not present
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`_migrations\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`name\` VARCHAR(191) NOT NULL UNIQUE,
      \`executed_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  const [existingRows] = await pool.query("SELECT name FROM `_migrations`");
  const executedSet = new Set((existingRows as any[]).map((r) => r.name));

  if (!fs.existsSync(migrationsDir)) {
    return { executed: [], total: executedSet.size };
  }

  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  const newlyExecuted: string[] = [];

  for (const file of files) {
    if (!executedSet.has(file)) {
      const sql = fs.readFileSync(path.join(migrationsDir, file), "utf-8");
      // Split on semicolons that terminate statements, ignoring empty statements
      const statements = sql
        .split(/;\s*$/m)
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const conn = await pool.getConnection();
      try {
        await conn.beginTransaction();
        for (const statement of statements) {
          await conn.query(statement);
        }
        await conn.query("INSERT INTO `_migrations` (name) VALUES (?)", [file]);
        await conn.commit();
        newlyExecuted.push(file);
      } catch (err) {
        await conn.rollback();
        throw new Error(`Failed executing migration ${file}: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        conn.release();
      }
    }
  }

  return { executed: newlyExecuted, total: executedSet.size + newlyExecuted.length };
}
