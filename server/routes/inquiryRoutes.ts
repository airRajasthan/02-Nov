import { Router, Request, Response } from "express";
import crypto from "crypto";
import { createInquirySchema } from "../validation/inquirySchema";
import { inquiryRateLimiter } from "../middleware/rateLimit";
import { getPool, withTransaction } from "../db/connection";
import { generateUuid } from "../middleware/auth";

export const inquiryRouter = Router();

/**
 * Generate a unique, human-readable reference number:
 * Format: AR-INQ-YYYYMMDD-XXXX (e.g. AR-INQ-20261024-7492)
 */
function generateReferenceNumber(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomSuffix = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `AR-INQ-${dateStr}-${randomSuffix}`;
}

/**
 * POST /api/inquiries
 * Public, rate-limited inquiry submission.
 */
inquiryRouter.post("/", inquiryRateLimiter, async (req: Request, res: Response) => {
  // 1. Validate payload with Zod
  const validationResult = createInquirySchema.safeParse(req.body);
  if (!validationResult.success) {
    const formattedErrors: Record<string, string> = {};
    for (const issue of validationResult.error.issues) {
      const field = issue.path[0] ? String(issue.path[0]) : "general";
      if (!formattedErrors[field]) {
        formattedErrors[field] = issue.message;
      }
    }
    return res.status(400).json({
      success: false,
      error: "Validation failed. Please verify the entered fields.",
      validationErrors: formattedErrors,
    });
  }

  const data = validationResult.data;
  const normalizedPhone = `${data.countryCode}${data.mobile}`;

  try {
    const pool = getPool();

    // 2. Idempotency Check
    if (data.idempotencyKey) {
      const [existingRows] = await pool.query(
        "SELECT id, reference_number, name, company_name, normalized_phone, category, message FROM inquiries WHERE idempotency_key = ?",
        [data.idempotencyKey]
      );
      const existing = (existingRows as any[])[0];
      if (existing) {
        // Compare core payload to ensure retry matches original intent
        if (
          existing.name === data.name &&
          existing.company_name === data.companyName &&
          existing.normalized_phone === normalizedPhone &&
          existing.category === data.category
        ) {
          return res.status(200).json({
            success: true,
            referenceNumber: existing.reference_number,
            message: "Your inquiry has already been received.",
            isDuplicateRetry: true,
          });
        } else {
          return res.status(409).json({
            success: false,
            error: "An inquiry with this idempotency key was already created with different data.",
          });
        }
      }
    }

    // 3. Transactional Insert with retry for unique reference
    let referenceNumber = generateReferenceNumber();
    const inquiryId = generateUuid();
    const activityId = generateUuid();

    await withTransaction(async (conn) => {
      // Ensure unique reference
      let attempts = 0;
      while (attempts < 5) {
        try {
          await conn.query(
            `INSERT INTO inquiries (
              id, reference_number, name, company_name, country_code,
              mobile, normalized_phone, category, message, context,
              idempotency_key, status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'NEW')`,
            [
              inquiryId,
              referenceNumber,
              data.name,
              data.companyName,
              data.countryCode,
              data.mobile,
              normalizedPhone,
              data.category,
              data.message,
              data.context || null,
              data.idempotencyKey || null,
            ]
          );
          break; // successfully inserted
        } catch (err: any) {
          if (err?.code === "ER_DUP_ENTRY" && String(err.message).includes("reference_number")) {
            referenceNumber = generateReferenceNumber();
            attempts++;
          } else {
            throw err;
          }
        }
      }

      // Record initial audit activity entry
      await conn.query(
        `INSERT INTO inquiry_activity (
          id, inquiry_id, actor_name, action, details
        ) VALUES (?, ?, ?, ?, ?)`,
        [
          activityId,
          inquiryId,
          data.name,
          "CREATED",
          `Inquiry submitted via ${data.context || "Direct Portal"}`,
        ]
      );
    });

    // 4. Return HTTP 201 only after commit
    return res.status(201).json({
      success: true,
      referenceNumber,
      message: "Thank you. Your inquiry has been successfully registered with our operations desk.",
    });
  } catch (error: any) {
    console.error("Inquiry persistence error:", error);
    // Explicitly return a failure status to the client
    const isConnError =
      error?.code === "ECONNREFUSED" ||
      error?.code === "PROTOCOL_CONNECTION_LOST" ||
      error?.code === "ENOTFOUND" ||
      error?.message?.includes("connect");

    return res.status(isConnError ? 503 : 500).json({
      success: false,
      error: isConnError
        ? "Database service is currently unavailable. Please verify MySQL service is running."
        : "Failed to persist inquiry due to an internal server error. Please try again.",
      code: isConnError ? "DB_UNAVAILABLE" : "INTERNAL_ERROR",
    });
  }
});
