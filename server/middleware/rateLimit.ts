import { Request, Response, NextFunction } from "express";

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

export function createRateLimiter(options: {
  windowMs: number;
  max: number;
  message: string;
}) {
  const store: RateLimitStore = {};

  // Cleanup expired entries every 5 minutes (unref so it doesn't block process exit)
  const timer = setInterval(() => {
    const now = Date.now();
    for (const key of Object.keys(store)) {
      if (store[key].resetTime <= now) {
        delete store[key];
      }
    }
  }, 5 * 60 * 1000);
  if (timer.unref) timer.unref();

  return (req: Request, res: Response, next: NextFunction) => {
    // Determine client identifier
    const clientIp =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      req.socket.remoteAddress ||
      "unknown";

    const now = Date.now();
    const clientData = store[clientIp];

    if (!clientData || clientData.resetTime <= now) {
      store[clientIp] = {
        count: 1,
        resetTime: now + options.windowMs,
      };
      return next();
    }

    if (clientData.count >= options.max) {
      const retryAfterSec = Math.ceil((clientData.resetTime - now) / 1000);
      res.setHeader("Retry-After", retryAfterSec);
      return res.status(429).json({
        success: false,
        error: options.message,
        retryAfter: retryAfterSec,
      });
    }

    clientData.count += 1;
    next();
  };
}

export const inquiryRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 15, // max 15 submissions per 15 minutes per IP
  message: "Too many inquiry requests from this network. Please wait a few minutes before trying again.",
});

export const loginRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 6, // max 6 login attempts per 15 minutes per IP
  message: "Too many authentication attempts. Please wait 15 minutes before retrying.",
});
