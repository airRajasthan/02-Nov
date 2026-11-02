# AirRajasthan™ — Official Web Platform & Persistent Inquiry System

**AirRajasthan™ Aviation & Logistics Solutions**
*Born in Desert. Built for Skies.*

Connecting India's industrial corridors to global gateways through the proposed Jaipur–Fujairah air cargo corridor, charter services, and integrated multimodal logistics.

---

## 1. Project Architecture & Stack

The application is structured as a full-stack TypeScript project:
- **Frontend**: React 19 + TypeScript SPA built with Vite and Tailwind CSS.
- **Routing**: Browser-history client router (`src/router/index.tsx`) supporting smooth scrolling, canonical `/about` alias redirection, and accessible focus management.
- **Backend API**: Express application (`server.ts` / `server/`) mounted on `/api/*` with JSON body limits, CSRF protection, in-memory sliding-window rate limiting, and HttpOnly session cookies.
- **Database Layer**: Production MySQL database (`server/db/`) utilizing connection pooling (`mysql2/promise`), versioned migrations, transactional commits, and audit logging.
- **Validation**: Strict schema validation with Zod (`server/validation/inquirySchema.ts`) on both server and client.
- **Brand System**:
  - Headings: `Rajdhani` (bold, uppercase tracking)
  - Body: `Barlow` (clean, highly readable)
  - Color Palette: Deep Charcoal (`#1C1B1A`), Brand Blue (`#0083C7`), Brand Orange (`#D39257`), Clean Slate (`#F9F9F8`).

---

## 2. Implemented Features & Team Updates

### 2.1 Home Page Refinements
- **Unified Hero Overlay**: Removed the visible vertical boundary across the hero image. Replaced with one smooth continuous overlay that preserves photographic depth while ensuring typographic legibility across mobile and desktop.
- **Removal of Legacy Card**: Completely removed the overlay card containing `"AIR FREIGHT & CHARTER OPERATIONS"` and `"PHASE 1"`.
- **Primary Hero CTA**: Updated the blue hero action button to **`REQUEST FOR CHARTER`**, which immediately opens the shared Inquiry modal with `"Charter Request - Home Hero"` context.
- **Header Inquiry CTA**: Kept the distinct navbar `Inquiry` button.
- **Strategic Corridor Overview (Brand Orange Headings)**:
  1. **Our Hub** (`#D39257`): *Fujairah’s strategic Air, Sea, Rail & Land connectivity.*
  2. **The Routes** (`#D39257`): *Connecting India to Global Trade.*
  3. **Project Cargo** (`#D39257`): *Available IL-76 & B747 Nose Door Opening.*
- **Fujairah Multimodal Hub Update**: Updated narrative highlighting AD Ports Group maritime facilities, Etihad Rail freight spine, and ICAD bonded road transport networks.
- **Fujairah Grand Mosque Imagery**: Integrated high-resolution photograph of the Sheikh Zayed Grand Mosque in Fujairah (`/images/Fujairah Grand Mosque.jpg`) with backdrop of the Hajar mountains as specified.
- **India–UAE Trade Connectivity Section**: Added dedicated feature section detailing bilateral trade acceleration, CEPA tariff benefits, Rajasthan industrial cluster integration (textiles, handicrafts, stone), and balanced two-way cargo flow.

### 2.2 Our Vision Page
- **Panoramic Header Banner**: Implemented the wide golden desert sunset banner with aircraft tail fin (`/images/Website Banner Page Ourvision.jpg`): *"AirRajasthan: Born in Desert. Built for Skies."*
- **Consolidated Text Structure**: Consolidated narrative into single comprehensive flow featuring the 4 approved paragraphs, followed by core vision statement and passenger expansion horizon.
- **Strategic Pillars Repositioning**: Moved the 3 core strategic pillar cards (*Connecting Trade & Markets*, *Jaipur & Fujairah Strengths*, *Customer & Partner Focus*) to the bottom of the page.
- **Supporting Imagery**: Preserved both `SKYTour.jpg` (long-term passenger fleet ambition) and `Our Vision.jpg` (operational tarmac grounding).

### 2.3 Services Page
- **Updated Main Title**: Set hero heading to **`CONNECTING YOUR TRADE WITH THE RIGHT SOLUTIONS`**.
- **Four Core Offerings**: Complete presentation of *Aviation & Charter Services*, *Air Cargo Services*, *Logistics & Supply Chain Solutions*, and *India–UAE Trade Connectivity*, with detailed capability bullets and dedicated *"Our Focus:"* strategic callouts.

### 2.4 Our Team Page
- **Executive Photography**: Integrated real executive portraits replacing placeholder silhouettes:
  - **Mohammed Imran**: Co-Founder / Head of Commercial & Operation (`/images/Team_Imran.png`).
  - **Aman Jain**: Co-Founder & Managing Partner (`/images/Team Aman.jpeg`).
  - **Shourya Wadhwa**: Co-Founder / Finance & Administration Head (`/images/Team Shourya.jpg`).
- **Shourya Wadhwa Full Biography**: Added complete professional biography detailing financial strategy, cross-border fiscal governance, charter financial modeling, and administrative oversight across Jaipur and UAE hubs.

### 2.5 Contact Us Page & UAE Office
- Added the official **UAE Office**:
  ```text
  28, Y-1 Building, Sharjah International Airport Freezone (SAIF), Sharjah
  P.O. 9604, UAE
  Tel: +971 6 557 9569
  Mobile: +971 50 908 5541
  ```
- Retained the registered **India Head Office** in Jaipur:
  ```text
  2/594, Block-2, Ground Floor, Sector-2, Jawahar Nagar, Jaipur, Rajasthan-302004, INDIA
  Tel: +91 98293 02643
  Email: support@AirRajasthan.com
  ```
- Made all telephone and mobile numbers clickable (`tel:+97165579569`, `tel:+971509085541`, `tel:+919829302643`).

### 2.6 The Hub Page (Fujairah Multimodal Gateway)
- Integrated verified photographic assets:
  - `FIA.jpg`: Fujairah International Airport main terminal building.
  - `FIA ATC towrer.jpg`: Modern Fujairah Airport Air Traffic Control tower.
  - `Fujairah Google Image-1.jpg`: Aerial coastal geography along the Gulf of Oman.
- Mapped images to the Four Pillars of Connectivity (*Air Cargo Gateway*, *Aviation Infrastructure*, *Deepwater Maritime Port*, *National Freight Rail & Highway Integration*).

### 2.7 WhatsApp & Social Media Configuration
- Added an accessible floating WhatsApp button linked directly to:
  `https://wa.me/971509085541`
- Includes pre-filled inquiry text: *"Hello AirRajasthan team, I would like to inquire regarding air cargo & charter operations."*
- Centrally configured in `src/config/siteConfig.ts`.
- Non-intrusive positioning (z-40, bottom-6 right-6) with dismissible helper tooltip and aria accessibility labels.
- Social links (LinkedIn, Facebook, Instagram, YouTube) are prepared in `siteConfig.ts` and conditionally rendered only when non-empty URLs are provided (preventing dead `#` links).

---

## 3. Database Schema & Migration Guide

### 3.1 Migration Files
Located in `server/migrations/` and trackable via `_migrations`:
1. `001_create_inquiries_table.sql`: Inquiries table with constraints, indexes, and idempotency key support.
2. `002_create_staff_and_auth_tables.sql`: Staff users and session storage.
3. `003_create_notes_and_activity_tables.sql`: Internal notes and audit activity log.
A full monolithic dump is also available in `server/db/schema.sql`.

### 3.2 Key Table Specifications
- **`inquiries`**:
  - `id`: VARCHAR(36) UUID
  - `reference_number`: VARCHAR(32) UNIQUE (Format: `AR-INQ-YYYYMMDD-XXXX`)
  - `name`: VARCHAR(191) NOT NULL
  - `company_name`: VARCHAR(191) NOT NULL
  - `country_code`: VARCHAR(10) NOT NULL
  - `mobile`: VARCHAR(20) NOT NULL
  - `normalized_phone`: VARCHAR(32) NOT NULL
  - `category`: ENUM('Shipper', 'CHA', 'Freight Forwarder', 'Airline Operator')
  - `message`: TEXT (up to 300 words enforced)
  - `context`: VARCHAR(191) NULL (identifying originating CTA)
  - `idempotency_key`: VARCHAR(64) UNIQUE (prevents duplicate submission)
  - `status`: ENUM('NEW', 'ASSIGNED', 'IN_PROGRESS', 'AWAITING_CUSTOMER', 'CLOSED') DEFAULT 'NEW'
  - `assigned_staff_id`: VARCHAR(36) NULL
  - `created_at`, `updated_at`: UTC TIMESTAMP
- **`staff_users`**:
  - `id`: VARCHAR(36) UUID
  - `email`: VARCHAR(191) UNIQUE
  - `password_hash`: VARCHAR(255) (Bcrypt 12 rounds)
  - `name`: VARCHAR(191)
  - `role`: ENUM('ADMIN', 'TEAM')
- **`staff_sessions`**:
  - `id`: VARCHAR(64) Secure token
  - `staff_id`: Foreign key to `staff_users`
  - `expires_at`: UTC TIMESTAMP (24-hour lifetime)
- **`inquiry_notes`**:
  - Internal staff notes with author attribution and timestamp.
- **`inquiry_activity`**:
  - Full audit history tracking creations, status changes, assignments, and notes.

---

## 4. Staff Security & Permission Rules

- **Authentication**:
  - No public registration or demo role bypass buttons.
  - Login via `POST /api/auth/login` checks bcrypt password hash.
  - Issues an `HttpOnly`, `SameSite=Lax`, `Secure` (in production) cookie (`ar_session`).
- **Authorization Scopes**:
  - `ADMIN`: Full visibility across all inquiries. Authorized to assign inquiries to any active staff member, update workflow statuses, and add internal notes.
  - `TEAM`: Strictly scoped to inquiries assigned to their staff ID. Prohibited from viewing or modifying unassigned inquiries or inquiries assigned to colleagues.
- **Internal Notes Privacy**:
  - Internal notes are stored in `inquiry_notes` and only returned to authenticated staff through `/api/admin/*`. Guest endpoints never expose internal notes or activity logs.

---

## 5. Local Setup & Execution Guide

### Prerequisites
- Node.js 18+ or 20+
- MySQL 8.0+ or MariaDB 10.5+

### Installation & Environment Setup
```bash
# 1. Install dependencies
npm install

# 2. Configure environment settings
cp .env.example .env
# Edit .env with your MySQL credentials (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
```

### Running Migrations & Seeding First Administrator
```bash
# Apply database migrations
npm run migrate

# Create initial administrator account
npm run create-admin admin@airrajasthan.com MySecurePassword2026! "System Administrator"
```

### Running the Application
```bash
# Development server (port 3000)
npm run dev

# Run automated verification & integration test suites
npm test

# Production build & start
npm run build
npm start
```

---

## 6. Hostinger Deployment Instructions

For deploying to a Node.js-compatible Hostinger hosting environment (e.g., Hostinger Cloud or VPS with Node.js support):

1. **Database Setup**:
   - In Hostinger hPanel, create a new MySQL database (e.g. `u123456789_airraj`) and user.
   - Run the initial schema: import `server/db/schema.sql` via phpMyAdmin or run `npm run migrate`.
2. **Node.js Configuration**:
   - In hPanel under *Node.js Management*, set:
     - Node Version: `20.x` or `22.x`
     - Application Mode: `Production`
     - Application Root: `/` (or directory where repository is placed)
     - Application Startup File: `server.ts` (or `dist/server.js` if compiled)
3. **Environment Variables**:
   - In the Node.js settings or root `.env` (private, non-public):
     ```dotenv
     NODE_ENV=production
     PORT=3000
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_NAME=u123456789_airraj
     DB_USER=u123456789_user
     DB_PASSWORD=your_database_password
     SESSION_SECRET=your_32_char_random_secret
     APP_ORIGIN=https://airrajasthan.com
     ```
4. **Build & Admin Provisioning**:
   - Run `npm install --omit=dev`
   - Run `npm run build`
   - Run `npm run create-admin` with your administrative email and password.
   - Start the Node.js application process.
5. **Static & SPA Routing**:
   - The Express application serves `/dist` with SPA fallback for all routes while preserving `/api/*` routes.

---

## 7. Verification Results

All tests have been run and verified:
- **`npm run lint`**: `tsc --noEmit` passed with 0 errors.
- **`compile_applet`**: Vite production build completed with 0 errors.
- **Verification Suite (`server/tests/verify.ts`)**: 22 tests passed (Zod schema validation, word counter, mobile normalization, WhatsApp config, office details).
- **Integration Suite (`server/tests/api-integration.ts`)**: 9 tests passed (Health endpoint, 400 validation error formatting, 503 error handling on database disconnect without fake success, 401 unauthorized protection on staff routes).
