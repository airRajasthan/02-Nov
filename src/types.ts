export type UserRole = "ADMIN" | "TEAM" | "USER";

export interface UserSession {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  organization?: string;
}

export type PageRoute =
  | "/"
  | "/our-vision"
  | "/services"
  | "/route-schedule"
  | "/the-hub"
  | "/partnership"
  | "/our-team"
  | "/contact"
  | "/about" // Legacy alias to /our-vision
  | "/dashboard"; // Authorized staff console

export type InquiryCategory =
  | "Shipper"
  | "CHA"
  | "Freight Forwarder"
  | "Airline Operator";

export type EnquiryStatus =
  | "NEW"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "AWAITING_CUSTOMER"
  | "CLOSED";

export interface EnquiryReply {
  id: string;
  enquiryId: string;
  senderRole: UserRole;
  senderName: string;
  message: string;
  createdAt: string;
}

export interface EnquiryNote {
  id: string;
  inquiry_id?: string;
  staff_id?: string;
  author_name: string;
  note: string;
  created_at: string;
  // Legacy aliases
  enquiryId?: string;
  authorName?: string;
  createdAt?: string;
}

export interface InquiryActivity {
  id: string;
  inquiry_id: string;
  staff_id?: string | null;
  actor_name: string;
  action: string;
  details?: string | null;
  created_at: string;
}

/**
 * Standard AirRajasthan™ Inquiry model:
 * - Unique internal ID
 * - Unique reference number (e.g. AR-INQ-YYYYMMDD-XXXX)
 * - Name
 * - Company Name
 * - Country code
 * - Mobile number
 * - Normalized mobile number
 * - "What you are" category (Shipper, CHA, Freight Forwarder, Airline Operator)
 * - Message (max 300 words)
 * - Optional CTA context
 * - Status (NEW, ASSIGNED, IN_PROGRESS, AWAITING_CUSTOMER, CLOSED)
 * - Optional assigned staff ID and name
 * - Timestamps in UTC
 */
export interface Inquiry {
  id: string;
  referenceNumber: string;
  name: string;
  companyName: string;
  countryCode: string;
  mobile: string;
  normalized_phone?: string;
  category: InquiryCategory;
  message: string;
  context?: string;
  status: EnquiryStatus;
  assigned_staff_id?: string | null;
  assigned_staff_name?: string | null;
  createdAt: string;
  updatedAt: string;
  replies?: EnquiryReply[];
  internalNotes?: EnquiryNote[];
  activityLog?: InquiryActivity[];
  // Legacy / Quote compatibility fields
  email?: string;
  phone?: string;
  contactPerson?: string;
  serviceType?: string;
  origin?: string;
  destination?: string;
  estimatedWeightKg?: number;
  dimensionsCm?: string;
  specialRequirements?: string;
}

export type Enquiry = Inquiry;

export interface TrackingMilestone {
  code: string;
  description: string;
  location: string;
  timestamp: string;
  completed: boolean;
}

export interface TrackingRecord {
  awbNumber: string;
  status: "BOOKED" | "RECEIVED" | "CUSTOMS_CLEARED" | "IN_TRANSIT" | "DELIVERED";
  statusText: string;
  origin: string;
  destination: string;
  flightNumber: string;
  aircraft: string;
  pieces: number;
  weightKg: number;
  temperature?: string;
  estimatedArrival: string;
  milestones: TrackingMilestone[];
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  icon: string;
  imageUrl: string;
  order: number;
  status: "DRAFT" | "PUBLISHED";
  aircraftCategory?: string;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  location: string;
  eventDate: string;
  isPast: boolean;
  status: "DRAFT" | "PUBLISHED";
  imageUrl: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "AIRCRAFT" | "OPERATIONS" | "WAREHOUSE" | "COLD_CHAIN" | "CHARTER";
  imageUrl: string;
  thumbnailUrl: string;
  altText: string;
  description: string;
  order: number;
  status: "DRAFT" | "PUBLISHED";
}

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  roleCategory: string;
  bio: string;
  isProfileComingSoon?: boolean;
  isSampleProfile?: boolean;
}
