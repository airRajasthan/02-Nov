import http from "http";
import express from "express";
import cookieParser from "cookie-parser";
import { inquiryRouter } from "../routes/inquiryRoutes";
import { authRouter } from "../routes/authRoutes";
import { adminRouter } from "../routes/adminRoutes";
import { checkDbHealth } from "../db/connection";
import { verifyCsrf } from "../middleware/auth";

async function runIntegrationTests() {
  const app = express();
  app.use(express.json({ limit: "50kb" }));
  app.use(cookieParser());
  app.use(verifyCsrf);

  app.get("/api/health", async (_req, res) => {
    const dbHealth = await checkDbHealth();
    res.status(dbHealth.ok ? 200 : 503).json({
      status: dbHealth.ok ? "ok" : "degraded",
      database: dbHealth.ok ? "connected" : "disconnected",
      message: dbHealth.message,
    });
  });

  app.use("/api/inquiries", inquiryRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/admin", adminRouter);

  const server = http.createServer(app);
  await new Promise<void>((resolve) => server.listen(3333, "127.0.0.1", resolve));

  const baseUrl = "http://127.0.0.1:3333";
  let testsPassed = 0;
  let testsFailed = 0;

  function expect(cond: boolean, name: string, detail?: string) {
    if (cond) {
      console.log(`  ✓ PASS: ${name}`);
      testsPassed++;
    } else {
      console.error(`  ✗ FAIL: ${name} ${detail || ""}`);
      testsFailed++;
    }
  }

  console.log("\n=======================================================");
  console.log("Express API Integration Tests");
  console.log("=======================================================\n");

  try {
    // 1. Health Endpoint
    const healthRes = await fetch(`${baseUrl}/api/health`);
    const healthData = await healthRes.json();
    expect(
      healthRes.status === 200 || healthRes.status === 503,
      "GET /api/health responds with 200 or 503 status code"
    );
    expect(typeof healthData.status === "string", "GET /api/health returns structured status JSON");

    // 2. Reject Invalid Inquiry Payload
    const invalidInquiryRes = await fetch(`${baseUrl}/api/inquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "",
        companyName: "",
        countryCode: "invalid",
        mobile: "123",
        category: "InvalidCategory",
        message: "",
      }),
    });
    const invalidData = await invalidInquiryRes.json();
    expect(invalidInquiryRes.status === 400, "POST /api/inquiries rejects invalid payload with 400 Bad Request");
    expect(Boolean(invalidData.validationErrors), "POST /api/inquiries returns structured validationErrors object");

    // 3. Graceful Failure when MySQL is Unreachable (Never Silently Faking Success!)
    const validInquiryRes = await fetch(`${baseUrl}/api/inquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Aman Sharma",
        companyName: "Jaipur Jewels FZE",
        countryCode: "+91",
        mobile: "9829302643",
        category: "Shipper",
        message: "Inquiry for ad hoc charter capacity between JAI and FJR.",
        context: "Charter Request - Home Hero",
      }),
    });
    const validData = await validInquiryRes.json();
    if (validInquiryRes.status === 503) {
      expect(
        validData.success === false && validData.code === "DB_UNAVAILABLE",
        "POST /api/inquiries returns HTTP 503 DB_UNAVAILABLE without fake success when MySQL is unreachable"
      );
    } else if (validInquiryRes.status === 201) {
      expect(
        validData.success === true && Boolean(validData.referenceNumber),
        "POST /api/inquiries successfully committed and returned official reference number"
      );
    }

    // 4. Guard against Anonymous Access to Staff Records
    const unauthorizedAdminRes = await fetch(`${baseUrl}/api/admin/inquiries`);
    expect(
      unauthorizedAdminRes.status === 401,
      "GET /api/admin/inquiries rejects anonymous request with 401 Unauthorized"
    );

    const unauthorizedDetailRes = await fetch(`${baseUrl}/api/admin/inquiries/some-id`);
    expect(
      unauthorizedDetailRes.status === 401,
      "GET /api/admin/inquiries/:id rejects anonymous request with 401 Unauthorized"
    );

    // 5. Auth /me Endpoint
    const meRes = await fetch(`${baseUrl}/api/auth/me`);
    const meData = await meRes.json();
    expect(meRes.status === 200 && meData.authenticated === false, "GET /api/auth/me correctly returns authenticated: false for guest");

    // 6. Auth Login with Invalid Body
    const badLoginRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "notanemail", password: "" }),
    });
    expect(badLoginRes.status === 400, "POST /api/auth/login rejects invalid email/password format with 400");
  } finally {
    server.close();
  }

  console.log("\n=======================================================");
  console.log(`Integration Complete: ${testsPassed} Passed, ${testsFailed} Failed`);
  console.log("=======================================================\n");

  if (testsFailed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runIntegrationTests();
