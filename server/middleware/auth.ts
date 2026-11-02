import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import { getPool } from "../db/connection";

export interface AuthenticatedStaff {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "TEAM";
  sessionId: string;
}

declare global {
  namespace Express {
    interface Request {
      staff?: AuthenticatedStaff;
    }
  }
}

export const SESSION_COOKIE_NAME = "ar_session";

export function generateSessionId(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function generateUuid(): string {
  return crypto.randomUUID();
}

/**
 * Validates origin/referer for state-changing requests to protect against CSRF attacks.
 */
export function verifyCsrf(req: Request, res: Response, next: NextFunction) {
  // Safe methods do not mutate state
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    return next();
  }

  // Guest inquiry endpoint does not use session cookies, but still check basic origin if provided
  const origin = req.headers.origin || req.headers.referer;
  const expectedOrigin = process.env.APP_ORIGIN;

  if (origin && expectedOrigin) {
    try {
      const originHost = new URL(origin).host;
      const expectedHost = new URL(expectedOrigin).host;
      if (originHost !== expectedHost && originHost !== req.headers.host) {
        return res.status(403).json({
          success: false,
          error: "Cross-Site Request Forgery (CSRF) verification failed.",
        });
      }
    } catch {
      // Allow if URL cannot be parsed and host matches
    }
  }

  next();
}

/**
 * Middleware: Populates req.staff if a valid session exists in database.
 */
export async function authenticateSession(req: Request, res: Response, next: NextFunction) {
  const sessionId = req.cookies?.[SESSION_COOKIE_NAME];

  if (!sessionId || typeof sessionId !== "string" || sessionId.length < 16) {
    return next();
  }

  try {
    const pool = getPool();
    const [rows] = await pool.query(
      `SELECT s.id AS session_id, s.expires_at, u.id, u.email, u.name, u.role, u.is_active
       FROM staff_sessions s
       JOIN staff_users u ON s.staff_id = u.id
       WHERE s.id = ? AND s.expires_at > UTC_TIMESTAMP() AND u.is_active = 1`,
      [sessionId]
    );

    const sessions = rows as any[];
    if (sessions.length > 0) {
      const s = sessions[0];
      req.staff = {
        id: s.id,
        email: s.email,
        name: s.name,
        role: s.role as "ADMIN" | "TEAM",
        sessionId: s.session_id,
      };
    } else {
      // Clear expired / invalid cookie
      res.clearCookie(SESSION_COOKIE_NAME);
    }
  } catch (err) {
    // If database is down, simply proceed unauthenticated
    console.warn("Session check error (database may be unreachable):", err);
  }

  next();
}

/**
 * Guard: Requires an authenticated staff member (ADMIN or TEAM).
 */
export function requireStaff(req: Request, res: Response, next: NextFunction) {
  if (!req.staff) {
    return res.status(401).json({
      success: false,
      error: "Authentication required. Please log in with an authorized staff account.",
    });
  }
  next();
}

/**
 * Guard: Requires an authenticated administrator (ADMIN only).
 */
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.staff) {
    return res.status(401).json({
      success: false,
      error: "Authentication required. Please log in with an authorized administrator account.",
    });
  }

  if (req.staff.role !== "ADMIN") {
    return res.status(403).json({
      success: false,
      error: "Access denied. Administrator privileges required.",
    });
  }

  next();
}
