import mysql, { Pool, PoolConnection } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let pool: Pool | null = null;

export interface DbConfig {
  host: string;
  port: number;
  user: string;
  password?: string;
  database: string;
  connectionLimit: number;
}

export function getDbConfig(): DbConfig {
  return {
    host: process.env.DB_HOST || "127.0.0.1",
    port: parseInt(process.env.DB_PORT || "3306", 10),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "air_rajasthan",
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || "10", 10),
  };
}

export function getPool(): Pool {
  if (!pool) {
    const config = getDbConfig();
    pool = mysql.createPool({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.database,
      waitForConnections: true,
      connectionLimit: config.connectionLimit,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
      timezone: "Z", // Store timestamps in UTC
    });
  }
  return pool;
}

export async function checkDbHealth(): Promise<{ ok: boolean; message: string }> {
  try {
    const dbPool = getPool();
    const [rows] = await dbPool.query("SELECT 1 AS health");
    if (Array.isArray(rows) && rows.length > 0) {
      return { ok: true, message: "MySQL database connected successfully." };
    }
    return { ok: false, message: "Unexpected response from database health query." };
  } catch (error: any) {
    return {
      ok: false,
      message: `MySQL connection failed: ${error?.message || "Unknown database error"}. Check DB_HOST, DB_USER, DB_PASSWORD in .env.`,
    };
  }
}

export async function withTransaction<T>(
  callback: (connection: PoolConnection) => Promise<T>
): Promise<T> {
  const dbPool = getPool();
  const connection = await dbPool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
