import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from "dotenv";
import { inquiryRouter } from "./server/routes/inquiryRoutes";
import { authRouter } from "./server/routes/authRoutes";
import { adminRouter } from "./server/routes/adminRoutes";
import { checkDbHealth } from "./server/db/connection";
import { runMigrations } from "./server/db/migrate";
import { verifyCsrf } from "./server/middleware/auth";

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || "3000", 10);
const isProduction = process.env.NODE_ENV === "production";

// Security & Body parsing
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true, limit: "50kb" }));
app.use(cookieParser());
app.use(verifyCsrf);

// Health check endpoint
app.get("/api/health", async (req: Request, res: Response) => {
  const dbHealth = await checkDbHealth();
  res.status(dbHealth.ok ? 200 : 503).json({
    status: dbHealth.ok ? "ok" : "degraded",
    database: dbHealth.ok ? "connected" : "disconnected",
    message: dbHealth.message,
    timestamp: new Date().toISOString(),
  });
});

// Mount API routes
app.use("/api/inquiries", inquiryRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);

// Explicit 404 for unhandled API routes so they never return HTML
app.all("/api/*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: `API endpoint ${req.method} ${req.path} not found`,
  });
});

// Setup Frontend serving (Vite in dev, static dist in production)
async function startServer() {
  if (!isProduction) {
    // Dynamic Vite middleware for dev mode
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.resolve(process.cwd(), "dist");
    app.use(express.static(distPath));

    app.get("*", (req: Request, res: Response, next: NextFunction) => {
      if (req.path.startsWith("/api")) {
        return next();
      }
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Attempt database migrations if database is available
  checkDbHealth()
    .then(async (health) => {
      if (health.ok) {
        console.log("Database connected. Running versioned migrations...");
        try {
          const result = await runMigrations();
          console.log(`Database ready. ${result.total} migrations recorded.`);
        } catch (migErr) {
          console.warn("Migration notice:", migErr);
        }
      } else {
        console.log(`Database notice: ${health.message}`);
        console.log("Server running in database-ready mode. Real inquiry submissions will return 503 until MySQL connection is established.");
      }
    })
    .catch((err) => {
      console.warn("Database initial check:", err?.message || err);
    });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AirRajasthan™ server running on port ${PORT} [mode: ${process.env.NODE_ENV || "development"}]`);
  });
}

startServer().catch((err) => {
  console.error("Server startup failure:", err);
  process.exit(1);
});
