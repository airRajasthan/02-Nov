import React, { useState, useEffect } from "react";
import { UserSession, Inquiry, EnquiryStatus, InquiryActivity } from "../types";
import {
  LayoutDashboard,
  MessageSquare,
  Clock,
  User,
  Send,
  Filter,
  CheckCircle2,
  Shield,
  Plane,
  RefreshCw,
  LogOut,
  AlertCircle,
  Building,
  Phone,
  FileText,
  History,
  UserCheck,
} from "lucide-react";

interface DashboardViewProps {
  session: UserSession;
  onLogout: () => void;
}

interface StaffUserOption {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function DashboardView({ session, onLogout }: DashboardViewProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [noteText, setNoteText] = useState("");
  const [staffOptions, setStaffOptions] = useState<StaffUserOption[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch inquiries from server
  const fetchInquiries = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const url =
        statusFilter === "ALL"
          ? "/api/admin/inquiries"
          : `/api/admin/inquiries?status=${encodeURIComponent(statusFilter)}`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok && data.success) {
        setInquiries(data.inquiries || []);
        if (data.inquiries?.length > 0) {
          // If none selected or selected not in list, select first
          const currentId = selectedInquiry?.id;
          const found = data.inquiries.find((i: Inquiry) => i.id === currentId);
          if (!found) {
            fetchInquiryDetail(data.inquiries[0].id);
          }
        } else {
          setSelectedInquiry(null);
        }
      } else {
        setError(data.error || "Failed to load inquiries from server.");
      }
    } catch (err: any) {
      setError("Network error loading inquiries. Please check connection.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch single inquiry detail with internal notes and activity log
  const fetchInquiryDetail = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/inquiries/${id}`);
      const data = await response.json();
      if (response.ok && data.success && data.inquiry) {
        setSelectedInquiry(data.inquiry);
      }
    } catch (err) {
      console.error("Failed to fetch inquiry detail:", err);
    }
  };

  // Fetch staff list for assignment (ADMIN only)
  const fetchStaffList = async () => {
    if (session.role !== "ADMIN") return;
    try {
      const response = await fetch("/api/admin/staff");
      const data = await response.json();
      if (response.ok && data.success) {
        setStaffOptions(data.staff || []);
      }
    } catch (e) {
      console.warn("Could not load staff list:", e);
    }
  };

  useEffect(() => {
    fetchInquiries();
    fetchStaffList();
  }, [statusFilter]);

  // Handle status update
  const handleUpdateStatus = async (newStatus: EnquiryStatus) => {
    if (!selectedInquiry) return;
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/admin/inquiries/${selectedInquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        // Refresh detail and list
        await fetchInquiryDetail(selectedInquiry.id);
        const updatedList = inquiries.map((i) =>
          i.id === selectedInquiry.id ? { ...i, status: newStatus } : i
        );
        setInquiries(updatedList);
      } else {
        alert(data.error || "Failed to update status.");
      }
    } catch (err) {
      alert("Error communicating with server.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle assignment (ADMIN only)
  const handleAssignStaff = async (staffId: string | null) => {
    if (!selectedInquiry || session.role !== "ADMIN") return;
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/admin/inquiries/${selectedInquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignedStaffId: staffId || null }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        await fetchInquiryDetail(selectedInquiry.id);
        await fetchInquiries();
      } else {
        alert(data.error || "Failed to assign staff.");
      }
    } catch (err) {
      alert("Error communicating with server.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle adding an internal note
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim() || !selectedInquiry) return;
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/admin/inquiries/${selectedInquiry.id}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: noteText.trim() }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setNoteText("");
        await fetchInquiryDetail(selectedInquiry.id);
      } else {
        alert(data.error || "Failed to add note.");
      }
    } catch (err) {
      alert("Error communicating with server.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle logout
  const handleLogoutClick = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      // Ignore network errors on logout
    }
    onLogout();
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Top Banner / Role Identity & Operations Console Header */}
      <div className="bg-white rounded-xl border border-[#E5E5E3] p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                session.role === "ADMIN" ? "bg-[#0083C7]" : "bg-[#D39257]"
              }`}
            />
            <span className="text-xs font-semibold tracking-wider uppercase text-[#0083C7] font-display">
              AirRajasthan™ Operations &bull; {session.role} Role
            </span>
          </div>
          <h1 className="text-2xl font-bold font-display uppercase tracking-tight text-[#1C1B1A] mt-1">
            Operations Management Console
          </h1>
          <p className="text-xs text-[#686664] mt-0.5">
            Logged in as <strong>{session.name}</strong> ({session.email})
            {session.role === "TEAM" && (
              <span className="ml-2 px-2 py-0.5 rounded bg-[#FAF5EE] text-[#704724] border border-[#E7CFB2]">
                Restricted to Assigned Inquiries
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchInquiries}
            disabled={isLoading}
            className="px-3.5 py-2 bg-[#F9F9F8] hover:bg-[#F2F2F0] border border-[#E5E5E3] rounded text-xs font-semibold text-[#1C1B1A] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-[#0083C7]" : ""}`} />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            onClick={handleLogoutClick}
            className="px-3.5 py-2 bg-white hover:bg-red-50 border border-red-200 text-red-600 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold">Database Notice</strong>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Filter & Inquiry List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-xl border border-[#E5E5E3] p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#0083C7]" />
                <span className="font-bold text-[#1C1B1A] uppercase tracking-wider font-display">
                  Inquiries ({inquiries.length})
                </span>
              </div>

              {/* Status Filter Dropdown */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs bg-[#F9F9F8] border border-[#E5E5E3] rounded px-2.5 py-1.5 font-medium text-[#1C1B1A] focus:outline-none focus:border-[#0083C7]"
              >
                <option value="ALL">All Statuses</option>
                <option value="NEW">New</option>
                <option value="ASSIGNED">Assigned</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="AWAITING_CUSTOMER">Awaiting Customer</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>

            {/* Inquiries list */}
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {isLoading && inquiries.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#8C8A88]">
                  <RefreshCw className="w-5 h-5 animate-spin mx-auto text-[#0083C7] mb-2" />
                  Loading persistent inquiries from database...
                </div>
              ) : inquiries.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#8C8A88] space-y-1">
                  <p className="font-semibold text-[#1C1B1A]">No inquiries found</p>
                  <p>
                    {statusFilter !== "ALL"
                      ? `No inquiries currently have status '${statusFilter}'.`
                      : "No inquiries recorded in the database yet."}
                  </p>
                </div>
              ) : (
                inquiries.map((inq) => {
                  const isSelected = selectedInquiry?.id === inq.id;
                  return (
                    <button
                      key={inq.id}
                      type="button"
                      onClick={() => fetchInquiryDetail(inq.id)}
                      className={`w-full text-left p-3.5 rounded-lg border transition-all cursor-pointer block ${
                        isSelected
                          ? "bg-[#EFF7FC] border-[#0083C7] shadow-xs"
                          : "bg-white border-[#E5E5E3] hover:border-[#B7B6B4]"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-mono font-bold text-[#0083C7]">
                          {inq.referenceNumber}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            inq.status === "NEW"
                              ? "bg-blue-100 text-blue-700"
                              : inq.status === "ASSIGNED"
                              ? "bg-purple-100 text-purple-700"
                              : inq.status === "IN_PROGRESS"
                              ? "bg-amber-100 text-amber-700"
                              : inq.status === "AWAITING_CUSTOMER"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {inq.status.replace("_", " ")}
                        </span>
                      </div>

                      <div className="font-semibold text-[#1C1B1A] text-xs truncate">
                        {inq.companyName}
                      </div>

                      <div className="text-[11px] text-[#686664] flex items-center justify-between mt-1">
                        <span>{inq.name} ({inq.category})</span>
                        <span className="tabular-nums">
                          {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : ""}
                        </span>
                      </div>

                      {inq.assigned_staff_name && (
                        <div className="mt-1 text-[10px] text-[#0083C7] flex items-center gap-1">
                          <UserCheck className="w-3 h-3" />
                          <span>Assigned to: {inq.assigned_staff_name}</span>
                        </div>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Inquiry Detail, Workflow, Internal Notes & Activity Log */}
        <div className="lg:col-span-7">
          {selectedInquiry ? (
            <div className="bg-white rounded-xl border border-[#E5E5E3] p-6 space-y-6 shadow-xs">
              {/* Header Details */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-[#E5E5E3]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-bold text-[#0083C7]">
                      {selectedInquiry.referenceNumber}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${
                        selectedInquiry.status === "NEW"
                          ? "bg-blue-100 text-blue-700"
                          : selectedInquiry.status === "ASSIGNED"
                          ? "bg-purple-100 text-purple-700"
                          : selectedInquiry.status === "IN_PROGRESS"
                          ? "bg-amber-100 text-amber-700"
                          : selectedInquiry.status === "AWAITING_CUSTOMER"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {selectedInquiry.status.replace("_", " ")}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold font-display text-[#1C1B1A] uppercase mt-1">
                    {selectedInquiry.companyName}
                  </h2>
                  <p className="text-xs text-[#686664]">
                    Submitted by <strong>{selectedInquiry.name}</strong> &bull; Category:{" "}
                    <strong>{selectedInquiry.category}</strong>
                  </p>
                </div>

                <div className="text-right text-xs space-y-1">
                  <div className="text-[#8C8A88]">Created (UTC):</div>
                  <div className="font-mono text-[#1C1B1A]">
                    {new Date(selectedInquiry.createdAt).toLocaleString()}
                  </div>
                  {selectedInquiry.context && (
                    <div className="text-[11px] text-[#0083C7] font-medium">
                      Focus: {selectedInquiry.context}
                    </div>
                  )}
                </div>
              </div>

              {/* Contact & Phone Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#F9F9F8] rounded-lg border border-[#E5E5E3] text-xs">
                <div>
                  <span className="text-[#8C8A88] block text-[11px]">Contact Phone</span>
                  <a
                    href={`tel:${selectedInquiry.countryCode}${selectedInquiry.mobile}`}
                    className="font-bold text-[#0083C7] text-sm hover:underline flex items-center gap-1.5 mt-0.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>
                      {selectedInquiry.countryCode} {selectedInquiry.mobile}
                    </span>
                  </a>
                </div>

                <div>
                  <span className="text-[#8C8A88] block text-[11px]">Staff Assignment</span>
                  {session.role === "ADMIN" ? (
                    <select
                      value={selectedInquiry.assigned_staff_id || ""}
                      onChange={(e) => handleAssignStaff(e.target.value || null)}
                      disabled={isUpdating}
                      className="mt-0.5 text-xs bg-white border border-[#E5E5E3] rounded px-2 py-1 font-medium w-full"
                    >
                      <option value="">Unassigned</option>
                      {staffOptions.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.role})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="font-semibold text-[#1C1B1A] block mt-1">
                      {selectedInquiry.assigned_staff_name || "Unassigned"}
                    </span>
                  )}
                </div>
              </div>

              {/* Full Inquiry Message */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1C1B1A] block font-display">
                  Inquiry Message
                </span>
                <div className="p-4 bg-[#FAF5EE] rounded-lg border border-[#E7CFB2] text-xs text-[#2B2A29] leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Status Workflow Actions */}
              <div className="space-y-2 pt-2 border-t border-[#E5E5E3]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1C1B1A] block font-display">
                  Workflow Status Transition
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {(["NEW", "ASSIGNED", "IN_PROGRESS", "AWAITING_CUSTOMER", "CLOSED"] as EnquiryStatus[]).map(
                    (st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => handleUpdateStatus(st)}
                        disabled={isUpdating || selectedInquiry.status === st}
                        className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                          selectedInquiry.status === st
                            ? "bg-[#0083C7] text-white shadow-xs"
                            : "bg-[#F9F9F8] border border-[#E5E5E3] text-[#1C1B1A] hover:border-[#0083C7]"
                        }`}
                      >
                        {st.replace("_", " ")}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Internal Staff Notes (Staff Only — Never Exposed to Guests) */}
              <div className="space-y-3 pt-4 border-t border-[#E5E5E3]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#D39257]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1C1B1A] font-display">
                      Internal Operations Notes ({selectedInquiry.internalNotes?.length || 0})
                    </span>
                  </div>
                  <span className="text-[10px] text-[#8C8A88]">Confidential &bull; Staff eyes only</span>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {selectedInquiry.internalNotes && selectedInquiry.internalNotes.length > 0 ? (
                    selectedInquiry.internalNotes.map((note, idx) => (
                      <div
                        key={note.id || idx}
                        className="p-3 bg-[#F9F9F8] rounded border border-[#E5E5E3] text-xs space-y-1"
                      >
                        <div className="flex justify-between items-center text-[11px] text-[#686664]">
                          <strong className="text-[#1C1B1A]">{note.author_name}</strong>
                          <span className="tabular-nums">
                            {new Date(note.created_at).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-[#4A4846] leading-relaxed whitespace-pre-wrap">{note.note}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-[#8C8A88] italic py-2">
                      No internal notes recorded yet.
                    </p>
                  )}
                </div>

                {/* Add Note Form */}
                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Add an internal note or update for operations..."
                    className="flex-1 px-3 py-2 text-xs bg-white border border-[#E5E5E3] rounded focus:outline-none focus:border-[#0083C7]"
                  />
                  <button
                    type="submit"
                    disabled={isUpdating || !noteText.trim()}
                    className="px-4 py-2 bg-[#0083C7] hover:bg-[#0072AD] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer"
                  >
                    Add Note
                  </button>
                </form>
              </div>

              {/* Activity History Audit Trail */}
              {selectedInquiry.activityLog && selectedInquiry.activityLog.length > 0 && (
                <div className="space-y-2 pt-4 border-t border-[#E5E5E3]">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1C1B1A] font-display">
                    <History className="w-3.5 h-3.5 text-[#0083C7]" />
                    <span>Audit &amp; Activity Log</span>
                  </div>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto text-[11px]">
                    {selectedInquiry.activityLog.map((act) => (
                      <div
                        key={act.id}
                        className="flex items-start justify-between py-1 border-b border-[#F2F2F0] text-[#686664]"
                      >
                        <div>
                          <strong className="text-[#1C1B1A] mr-1.5">{act.actor_name}:</strong>
                          <span>{act.details || act.action}</span>
                        </div>
                        <span className="text-[#8C8A88] tabular-nums shrink-0 ml-2">
                          {new Date(act.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-[#E5E5E3] p-12 text-center text-xs text-[#8C8A88]">
              Select an inquiry from the list on the left to inspect details, add notes, and advance status.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
