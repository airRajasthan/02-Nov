import { z } from "zod";

export function countWords(text: string): number {
  if (!text || !text.trim()) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export const createInquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must not exceed 100 characters"),
  companyName: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must not exceed 100 characters"),
  countryCode: z
    .string()
    .trim()
    .regex(/^\+[1-9]\d{0,3}$/, "Country code must be a valid international prefix (e.g. +91, +971)"),
  mobile: z
    .string()
    .trim()
    .transform((val) => val.replace(/[\s\-\(\)\.]/g, ""))
    .refine((val) => /^\d{6,15}$/.test(val), {
      message: "Mobile number must be between 6 and 15 digits",
    }),
  category: z.enum([
    "Shipper",
    "CHA",
    "Freight Forwarder",
    "Airline Operator",
  ]),
  message: z
    .string()
    .trim()
    .min(5, "Inquiry message must be at least 5 characters")
    .max(5000, "Inquiry message body exceeds maximum allowable character limit")
    .refine((val) => countWords(val) <= 300, {
      message: "Inquiry message must not exceed 300 words",
    }),
  context: z
    .string()
    .trim()
    .max(191, "Context must not exceed 191 characters")
    .optional(),
  idempotencyKey: z
    .string()
    .trim()
    .max(64, "Idempotency key must not exceed 64 characters")
    .optional(),
});

export type CreateInquiryInput = z.infer<typeof createInquirySchema>;

export const updateInquirySchema = z.object({
  status: z
    .enum(["NEW", "ASSIGNED", "IN_PROGRESS", "AWAITING_CUSTOMER", "CLOSED"])
    .optional(),
  assignedStaffId: z.string().uuid().nullable().optional(),
});

export const addNoteSchema = z.object({
  note: z
    .string()
    .trim()
    .min(2, "Note must be at least 2 characters")
    .max(3000, "Note must not exceed 3000 characters"),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
