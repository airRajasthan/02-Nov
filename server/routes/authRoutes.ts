import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { loginSchema } from "../validation/inquirySchema";
import { loginRateLimiter } from "../middleware/rateLimit";
import { getPool } from "../db/connection";
import {
  SESSION_COOKIE_NAME,
  generateSessionId,
  authenticateSession,
} from "../middleware/auth";

export const authRouter = Router();

/**
 * POST /api/auth/login
 * Staff authentication using email and password.
 */
authRouter.post("/login", loginRateLimiter, async (req: Request, res: Response) => {
  const parseResult = loginSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      success: false,
      error: "Please provide a valid email and password.",
    });
  }

  const { email, password } = parseResult.data;

  try {
    const pool = getPool();
    const [rows] = await pool.query(
      `SELECT id, email, password_hash, name, role, is_active FROM staff_users WHERE email = ?`,
      [email.toLowerCase()]
    );

    const users = rows as any[];
    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password.",
      });
    }

    const user = users[0];
    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        error: "This staff account has been deactivated. Please contact an administrator.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password.",
      });
    }

    // Create session in database
    const sessionId = generateSessionId();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await pool.query(
      `INSERT INTO staff_sessions (id, staff_id, expires_at) VALUES (?, ?, ?)`,
      [sessionId, user.id, expiresAt]
    );

    // Set secure, HttpOnly session cookie
    const isProd = process.env.NODE_ENV === "production";
    res.cookie(SESSION_COOKIE_NAME, sessionId, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error("Staff login error:", error);
    const isConnError =
      error?.code === "ECONNREFUSED" ||
      error?.code === "PROTOCOL_CONNECTION_LOST" ||
      error?.message?.includes("connect");

    return res.status(isConnError ? 503 : 500).json({
      success: false,
      error: isConnError
        ? "Database connection failed. Please ensure MySQL is running."
        : "Internal server error during authentication.",
    });
  }
});

/**
 * POST /api/auth/logout
 * Destroys current session and clears cookie.
 */
authRouter.post("/logout", async (req: Request, res: Response) => {
  const sessionId = req.cookies?.[SESSION_COOKIE_NAME];
  if (sessionId) {
    try {
      const pool = getPool();
      await pool.query("DELETE FROM staff_sessions WHERE id = ?", [sessionId]);
    } catch (e) {
      console.warn("Error deleting session from database:", e);
    }
  }

  res.clearCookie(SESSION_COOKIE_NAME, { path: "/" });
  return res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
});

/**
 * GET /api/auth/me
 * Returns current authenticated user state.
 */
authRouter.get("/me", authenticateSession, (req: Request, res: Response) => {
  if (!req.staff) {
    return res.status(200).json({
      authenticated: false,
    });
  }

  return res.status(200).json({
    authenticated: true,
    user: req.staff,
  });
});
