import { Inquiry, InquiryCategory } from "../types";

export interface InquirySubmissionPayload {
  name: string;
  companyName: string;
  countryCode: string;
  mobile: string;
  category: InquiryCategory;
  message: string;
  context?: string;
  idempotencyKey?: string;
}

export interface InquirySubmissionResult {
  success: boolean;
  inquiry?: Inquiry;
  referenceNumber?: string;
  message: string;
  validationErrors?: Record<string, string>;
  isDbUnavailable?: boolean;
}

/**
 * Count words in a string according to standard whitespace tokenization.
 */
export function countWords(text: string): number {
  if (!text || !text.trim()) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Client-side validation helper for instant UI feedback before submission.
 */
export function validateInquiry(payload: InquirySubmissionPayload): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!payload.name.trim()) {
    errors.name = "Full name is required";
  } else if (payload.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!payload.companyName.trim()) {
    errors.companyName = "Company or business name is required";
  } else if (payload.companyName.trim().length < 2) {
    errors.companyName = "Company name must be at least 2 characters";
  }

  const cleanMobile = payload.mobile.replace(/[\s\-\(\)\.]/g, "");
  if (!cleanMobile) {
    errors.mobile = "Mobile number is required";
  } else if (!/^\d{6,15}$/.test(cleanMobile)) {
    errors.mobile = "Please enter a valid mobile number (digits only, 6-15 characters)";
  }

  const allowedCategories: InquiryCategory[] = [
    "Shipper",
    "CHA",
    "Freight Forwarder",
    "Airline Operator",
  ];
  if (!payload.category || !allowedCategories.includes(payload.category)) {
    errors.category = "Please select what best describes your organization";
  }

  const wordCount = countWords(payload.message);
  if (!payload.message.trim()) {
    errors.message = "Please provide details about your cargo or charter requirement";
  } else if (wordCount > 300) {
    errors.message = `Inquiry message exceeds the 300-word limit (currently ${wordCount} words)`;
  }

  return errors;
}

/**
 * Generate a client-side idempotency key to prevent accidental duplicate inquiries
 * from repeated clicks or network retries.
 */
export function generateIdempotencyKey(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "idemp_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

/**
 * Submits an inquiry to the persistent backend API.
 * Never silently fakes success when the database operation fails.
 */
export async function submitInquiry(
  payload: InquirySubmissionPayload
): Promise<InquirySubmissionResult> {
  // Client pre-validation
  const clientErrors = validateInquiry(payload);
  if (Object.keys(clientErrors).length > 0) {
    return {
      success: false,
      message: "Please correct the highlighted fields before submitting.",
      validationErrors: clientErrors,
    };
  }

  const idempotencyKey = payload.idempotencyKey || generateIdempotencyKey();

  try {
    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        idempotencyKey,
      }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      const nowIso = new Date().toISOString();
      const confirmedInquiry: Inquiry = {
        id: `inq_${Date.now()}`,
        referenceNumber: data.referenceNumber,
        name: payload.name.trim(),
        companyName: payload.companyName.trim(),
        countryCode: payload.countryCode || "+91",
        mobile: payload.mobile.trim(),
        category: payload.category,
        message: payload.message.trim(),
        context: payload.context,
        status: "NEW",
        createdAt: nowIso,
        updatedAt: nowIso,
        replies: [],
        internalNotes: [],
        contactPerson: payload.name.trim(),
        phone: `${payload.countryCode} ${payload.mobile.trim()}`,
        serviceType: payload.context || payload.category,
      };

      return {
        success: true,
        inquiry: confirmedInquiry,
        referenceNumber: data.referenceNumber,
        message: data.message || "Inquiry successfully submitted.",
      };
    }

    if (response.status === 400 && data.validationErrors) {
      return {
        success: false,
        message: data.error || "Please verify the highlighted fields.",
        validationErrors: data.validationErrors,
      };
    }

    if (response.status === 503 || data.code === "DB_UNAVAILABLE") {
      return {
        success: false,
        isDbUnavailable: true,
        message:
          data.error ||
          "Database service is currently unavailable. Your input has been preserved so you can retry.",
      };
    }

    return {
      success: false,
      message: data.error || `Submission failed with server status ${response.status}. Please retry.`,
    };
  } catch (error: any) {
    console.error("Network or API error submitting inquiry:", error);
    return {
      success: false,
      message:
        "Unable to connect to the server. Please check your network connection and retry.",
    };
  }
}
