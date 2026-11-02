import { Router, Request, Response } from "express";
import { requireStaff } from "../middleware/auth";
import { getPool, withTransaction } from "../db/connection";
import { updateInquirySchema, addNoteSchema } from "../validation/inquirySchema";
import { generateUuid } from "../middleware/auth";

export const adminRouter = Router();

// Protect all admin endpoints with staff authentication
adminRouter.use(requireStaff);

/**
 * GET /api/admin/inquiries
 * List inquiries with status filtering and pagination, strictly scoped by role.
 * - ADMIN: Views all inquiries.
 * - TEAM: Views only inquiries assigned to them.
 */
adminRouter.get("/inquiries", async (req: Request, res: Response) => {
  const staff = req.staff!;
  const status = req.query.status as string | undefined;
  const page = Math.max(1, parseInt((req.query.page as string) || "1", 10));
  const limit = Math.min(50, Math.max(1, parseInt((req.query.limit as string) || "10", 10)));
  const offset = (page - 1) * limit;

  try {
    const pool = getPool();
    const whereClauses: string[] = [];
    const queryParams: any[] = [];

    // Role-based scoping
    if (staff.role === "TEAM") {
      whereClauses.push("i.assigned_staff_id = ?");
      queryParams.push(staff.id);
    }

    // Status filter
    if (status && status !== "ALL") {
      whereClauses.push("i.status = ?");
      queryParams.push(status);
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    // Count total matching
    const [countRows] = await pool.query(
      `SELECT COUNT(*) AS total FROM inquiries i ${whereSql}`,
      queryParams
    );
    const total = (countRows as any[])[0]?.total || 0;

    // Fetch paginated inquiries
    const [rows] = await pool.query(
      `SELECT 
        i.id, i.reference_number, i.name, i.company_name, i.country_code,
        i.mobile, i.normalized_phone, i.category, i.message, i.context,
        i.status, i.assigned_staff_id, i.created_at, i.updated_at,
        u.name AS assigned_staff_name
       FROM inquiries i
       LEFT JOIN staff_users u ON i.assigned_staff_id = u.id
       ${whereSql}
       ORDER BY i.created_at DESC
       LIMIT ? OFFSET ?`,
      [...queryParams, limit, offset]
    );

    return res.status(200).json({
      success: true,
      inquiries: rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (error: any) {
    console.error("Admin list inquiries error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve inquiries from database.",
    });
  }
});

/**
 * GET /api/admin/inquiries/:id
 * Retrieve details for a specific inquiry including internal notes and activity log.
 * Enforces role scoping (TEAM cannot view inquiries assigned to others).
 */
adminRouter.get("/inquiries/:id", async (req: Request, res: Response) => {
  const staff = req.staff!;
  const inquiryId = req.params.id;

  try {
    const pool = getPool();

    // 1. Fetch inquiry
    const [inquiryRows] = await pool.query(
      `SELECT 
        i.id, i.reference_number, i.name, i.company_name, i.country_code,
        i.mobile, i.normalized_phone, i.category, i.message, i.context,
        i.status, i.assigned_staff_id, i.created_at, i.updated_at,
        u.name AS assigned_staff_name
       FROM inquiries i
       LEFT JOIN staff_users u ON i.assigned_staff_id = u.id
       WHERE i.id = ?`,
      [inquiryId]
    );

    const inquiries = inquiryRows as any[];
    if (inquiries.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Inquiry not found.",
      });
    }

    const inquiry = inquiries[0];

    // Role check: TEAM can only view their own assigned inquiries
    if (staff.role === "TEAM" && inquiry.assigned_staff_id !== staff.id) {
      return res.status(403).json({
        success: false,
        error: "Access denied. You can only view inquiries assigned to you.",
      });
    }

    // 2. Fetch internal notes (staff-only)
    const [noteRows] = await pool.query(
      `SELECT id, inquiry_id, staff_id, author_name, note, created_at
       FROM inquiry_notes
       WHERE inquiry_id = ?
       ORDER BY created_at ASC`,
      [inquiryId]
    );

    // 3. Fetch activity log
    const [activityRows] = await pool.query(
      `SELECT id, inquiry_id, staff_id, actor_name, action, details, created_at
       FROM inquiry_activity
       WHERE inquiry_id = ?
       ORDER BY created_at ASC`,
      [inquiryId]
    );

    return res.status(200).json({
      success: true,
      inquiry: {
        ...inquiry,
        internalNotes: noteRows,
        activityLog: activityRows,
      },
    });
  } catch (error: any) {
    console.error("Admin get inquiry detail error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve inquiry details.",
    });
  }
});

/**
 * PATCH /api/admin/inquiries/:id
 * Update status and/or assign staff.
 * - ADMIN can update status and assign to any staff.
 * - TEAM can only update status of their assigned inquiries (cannot reassign).
 */
adminRouter.patch("/inquiries/:id", async (req: Request, res: Response) => {
  const staff = req.staff!;
  const inquiryId = req.params.id;

  const parseResult = updateInquirySchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      success: false,
      error: "Invalid update payload.",
      details: parseResult.error.format(),
    });
  }

  const { status, assignedStaffId } = parseResult.data;

  try {
    const pool = getPool();

    // Verify existing inquiry and access
    const [existingRows] = await pool.query(
      "SELECT id, status, assigned_staff_id, reference_number FROM inquiries WHERE id = ?",
      [inquiryId]
    );
    const existing = (existingRows as any[])[0];

    if (!existing) {
      return res.status(404).json({ success: false, error: "Inquiry not found." });
    }

    if (staff.role === "TEAM") {
      if (existing.assigned_staff_id !== staff.id) {
        return res.status(403).json({
          success: false,
          error: "Access denied. You can only update inquiries assigned to you.",
        });
      }
      if (assignedStaffId !== undefined && assignedStaffId !== existing.assigned_staff_id) {
        return res.status(403).json({
          success: false,
          error: "Only administrators can reassign inquiries.",
        });
      }
    }

    await withTransaction(async (conn) => {
      const updates: string[] = [];
      const values: any[] = [];

      if (status && status !== existing.status) {
        updates.push("status = ?");
        values.push(status);

        await conn.query(
          `INSERT INTO inquiry_activity (id, inquiry_id, staff_id, actor_name, action, details)
           VALUES (?, ?, ?, ?, 'STATUS_CHANGE', ?)`,
          [
            generateUuid(),
            inquiryId,
            staff.id,
            staff.name,
            `Status changed from ${existing.status} to ${status}`,
          ]
        );
      }

      if (assignedStaffId !== undefined && assignedStaffId !== existing.assigned_staff_id) {
        updates.push("assigned_staff_id = ?");
        values.push(assignedStaffId);

        let targetStaffName = "Unassigned";
        if (assignedStaffId) {
          const [staffRows] = await conn.query("SELECT name FROM staff_users WHERE id = ?", [
            assignedStaffId,
          ]);
          targetStaffName = (staffRows as any[])[0]?.name || "Staff Member";
        }

        await conn.query(
          `INSERT INTO inquiry_activity (id, inquiry_id, staff_id, actor_name, action, details)
           VALUES (?, ?, ?, ?, 'ASSIGNED', ?)`,
          [
            generateUuid(),
            inquiryId,
            staff.id,
            staff.name,
            `Inquiry assigned to ${targetStaffName}`,
          ]
        );
      }

      if (updates.length > 0) {
        values.push(inquiryId);
        await conn.query(`UPDATE inquiries SET ${updates.join(", ")} WHERE id = ?`, values);
      }
    });

    return res.status(200).json({
      success: true,
      message: "Inquiry updated successfully.",
    });
  } catch (error: any) {
    console.error("Admin update inquiry error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to update inquiry.",
    });
  }
});

/**
 * POST /api/admin/inquiries/:id/notes
 * Append an internal note with authenticated staff identity.
 */
adminRouter.post("/inquiries/:id/notes", async (req: Request, res: Response) => {
  const staff = req.staff!;
  const inquiryId = req.params.id;

  const parseResult = addNoteSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      success: false,
      error: "Please provide a valid note text (2-3000 characters).",
    });
  }

  const { note } = parseResult.data;

  try {
    const pool = getPool();

    // Verify existing inquiry and access
    const [existingRows] = await pool.query(
      "SELECT id, assigned_staff_id FROM inquiries WHERE id = ?",
      [inquiryId]
    );
    const existing = (existingRows as any[])[0];

    if (!existing) {
      return res.status(404).json({ success: false, error: "Inquiry not found." });
    }

    if (staff.role === "TEAM" && existing.assigned_staff_id !== staff.id) {
      return res.status(403).json({
        success: false,
        error: "Access denied. You can only add notes to inquiries assigned to you.",
      });
    }

    const noteId = generateUuid();
    const activityId = generateUuid();

    await withTransaction(async (conn) => {
      await conn.query(
        `INSERT INTO inquiry_notes (id, inquiry_id, staff_id, author_name, note)
         VALUES (?, ?, ?, ?, ?)`,
        [noteId, inquiryId, staff.id, staff.name, note]
      );

      await conn.query(
        `INSERT INTO inquiry_activity (id, inquiry_id, staff_id, actor_name, action, details)
         VALUES (?, ?, ?, ?, 'NOTE_ADDED', ?)`,
        [activityId, inquiryId, staff.id, staff.name, `Internal note added by ${staff.name}`]
      );
    });

    return res.status(201).json({
      success: true,
      note: {
        id: noteId,
        inquiry_id: inquiryId,
        staff_id: staff.id,
        author_name: staff.name,
        note,
        created_at: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error("Admin add note error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to record internal note.",
    });
  }
});

/**
 * GET /api/admin/staff
 * List all active staff users (for assignment dropdown, admin only).
 */
adminRouter.get("/staff", async (req: Request, res: Response) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query(
      "SELECT id, name, email, role FROM staff_users WHERE is_active = 1 ORDER BY name ASC"
    );
    return res.status(200).json({
      success: true,
      staff: rows,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve staff directory.",
    });
  }
});
