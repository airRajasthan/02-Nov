# AirRajasthan™ — project and continuation guide

Reviewed: 24 October 2026. Source: the supplied `air_Rajasthan.zip`.

This document explains the existing website, how to run and extend it, what is missing, and how to turn the inquiry preview into a persistent service. **Current implementation and proposed work are explicitly separated.** Place this file at the project root alongside `vite.config.ts` and, once restored, `package.json`.

## Contents

1. [Current status](#1-current-status)
2. [Product scope and brand](#2-product-scope-and-brand)
3. [Restore and run locally](#3-restore-and-run-locally)
4. [Project structure](#4-project-structure)
5. [How the application works](#5-how-the-application-works)
6. [Page and design editing guide](#6-page-and-design-editing-guide)
7. [Inquiry flow](#7-inquiry-flow)
8. [Known gaps and priorities](#8-known-gaps-and-priorities)
9. [Backend and database implementation](#9-backend-and-database-implementation)
10. [Deployment](#10-deployment)
11. [Verification checklist](#11-verification-checklist)
12. [Git and AI development workflow](#12-git-and-ai-development-workflow)
13. [Troubleshooting](#13-troubleshooting)
14. [Next implementation milestones](#14-next-implementation-milestones)
15. [Official references](#15-official-references)

## 1. Current status

The supplied source is a **React + TypeScript single-page application built with Vite**, with Tailwind styling and a custom browser-history router. It is not a Next.js application.

| Area | What exists in this source |
| --- | --- |
| Public website | Eight page views and shared navigation/footer |
| Inquiry form | Client validation, modal and embedded form, in-memory result |
| Inquiry delivery | No network request, database write, email or CRM delivery |
| Backend | No implemented API server found |
| Database | No configured database, schema or migrations found |
| Dashboard | Demonstration UI using React state and mock data |
| Authentication | Demo role/session selection; not real authentication |
| CMS | Mock editing/publishing state; not a persistent content system |
| Tracking | Not a public route; unused tracking source remains |
| Dependency manifest | `package.json` and lockfile are missing from this ZIP |
| Build verification | This archive cannot independently reproduce installation/build until the manifest is restored |

An installed dependency, a TypeScript interface, or a dashboard screen does not prove a backend exists. In particular, the previously shared package list included Express and dotenv, but the inspected application has no implemented server using them.

The key application, router, inquiry service, inquiry form, home page and Vite configuration files match the earlier reviewed snapshot. Do not assume later AI design edits were included in this export without checking your working copy.

## 2. Product scope and brand

### Public navigation

| Label | URL | Main source |
| --- | --- | --- |
| Home | `/` | `src/views/HomeView.tsx` |
| Our Vision | `/our-vision` | `src/views/OurVisionView.tsx` |
| Services | `/services` | `src/views/ServicesView.tsx` |
| Route & Schedule | `/route-schedule` | `src/views/RouteScheduleView.tsx` |
| The Hub | `/the-hub` | `src/views/TheHubView.tsx` |
| Partnership | `/partnership` | `src/views/PartnershipView.tsx` |
| Our Team | `/our-team` | `src/views/OurTeamView.tsx` |
| Contact Us | `/contact` | `src/views/ContactView.tsx` |

`/about` is a legacy alias for Our Vision. `/dashboard` is a demonstration route. Unknown paths render the not-found view. Inquiry is a button opening a shared form, rather than a required standalone page.

### Requirements to preserve

- Use the latest approved AirRajasthan™ logo. The supplied logo may already contain the trademark mark; avoid adding it twice.
- Use Rajdhani for headings and Barlow for body copy.
- Give the home page the strongest visual attention: a full-width hero, readable overlay content, deliberate spacing and responsive imagery.
- Avoid reverting to the rejected equal-width left-text/right-image hero.
- Provide smooth, accessible scrolling without trapping wheel, touch or keyboard input.
- Use approved images and real business information. Do not invent operating routes, certifications, client logos, team identities or performance statistics.
- Keep tracking removed. Do not reintroduce it because old files or types remain.
- No public customer signup is required for the guest inquiry flow.
- Merchandise and unconfirmed contact integrations are outside the current scope.

Current source colors include blue `#0083C7`, warm accent `#D39257`, charcoal `#2B2A29` and pale surface `#F9F9F8`. These describe the source, not a substitute for the team's approved brand guide.

## 3. Restore and run locally

### Step 1 — preserve your working copy

Before editing, save a ZIP or commit the current working version. Keep the latest approved assets separately. Do not overwrite a working project with an incomplete export.

### Step 2 — restore the missing manifest

This ZIP lacks `package.json` and `package-lock.json`. Retrieve them from the working Google AI Studio export, Antigravity folder or the matching Git commit. Prefer restoring both files from the same working snapshot.

Do not run `npm init -y` as a repair: it creates an empty manifest without the project's dependencies and scripts. Do not reconstruct dependency versions from memory or use an unrelated project's lockfile.

If no working manifest survives, reconstruct it from source imports, choose a compatible package set, install and verify it, then commit the generated lockfile. That is a separate recovery task; this README does not claim to have performed it.

### Step 3 — open the actual project directory

In Windows Command Prompt:

```bat
cd /d "C:\project\Web Versions\20-otc\air_Rajasthan-main"
dir package.json
node --version
npm --version
```

Use the actual extracted folder name if it differs. In PowerShell, use `Set-Location` with the quoted path instead of `cd /d`.

If `dir package.json` cannot find the file, fix the folder or restore the manifest before installing. Spaces in `Web Versions` require quoting paths.

Use a Node.js version supported by the restored Vite and other dependencies. Record that exact runtime in the repository and match it on hosting; the current archive does not establish a tested runtime version.

### Step 4 — install dependencies

When a matching lockfile exists:

```bat
npm ci
```

When only a verified manifest exists:

```bat
npm install
```

Commit the resulting lockfile after validation. Do not routinely bypass dependency conflicts with `--force` or `--legacy-peer-deps`.

The earlier reported installation conflict was between the project's esbuild range and Vite's peer range. Resolve such conflicts by aligning compatible dependencies in the manifest, then reinstalling and testing; do not assume the earlier pasted versions are the exact current dependency set.

### Step 5 — run the frontend

The previously supplied manifest had these scripts. Confirm them in the restored file first:

```bat
npm run dev
```

Its development command was `vite --port=3000 --host=0.0.0.0`. Open the URL printed by Vite; if port 3000 is occupied, the actual port may differ. Stop with `Ctrl+C`. Binding to `0.0.0.0` makes the development server available on network interfaces, so use localhost-only binding when network access is unnecessary.

### Step 6 — check types and production output

```bat
npm run lint
npm run build
npm run preview
```

In the earlier manifest, `lint` runs `tsc --noEmit`: it is a TypeScript check, not an ESLint audit. `build` generates `dist`; `preview` serves the production frontend locally and is not a production hosting service.

The earlier `clean` script used `rm -rf dist server.js`, which is not portable to Windows Command Prompt and could delete a future server entry. Review it before use. Do not copy that cleanup command into a backend workflow.

## 4. Project structure

| Path | Responsibility |
| --- | --- |
| `index.html` | HTML shell, metadata and current font loading |
| `vite.config.ts` | React/Tailwind plugins, alias and development HMR settings |
| `tsconfig.json` | TypeScript compiler configuration |
| `src/main.tsx` | Mounts React and imports global styles |
| `src/App.tsx` | Page resolution, global modal/session state, mock dashboard state |
| `src/router/index.tsx` | Router context, navigation and custom Link |
| `src/index.css` | Global styles, typography and motion rules |
| `src/types.ts` | Page, inquiry, session and content types |
| `src/data/mockData.ts` | Demo inquiries and other sample content |
| `src/services/inquiryService.ts` | Validation and simulated inquiry submission |
| `src/components/Navbar.tsx` | Desktop/mobile navigation and main CTA |
| `src/components/Footer.tsx` | Footer links and demo login entry |
| `src/components/BrandLogo.tsx` | Shared logo rendering |
| `src/components/InquiryForm.tsx` | Shared inquiry fields and submission UI |
| `src/components/InquiryModal.tsx` | Dialog wrapper and interaction behavior |
| `src/components/LoginModal.tsx` | Demonstration login |
| `src/components/DashboardView.tsx` | Demonstration inquiry/content management |
| `src/views/` | Individual public page components |
| `public/` | Files served directly by path |
| `public/images/` | Supplied page imagery |

Some legacy files, including tracking, events, gallery and older query components, are disconnected from the current public routes. Confirm imports and references before removing them. A filename alone does not indicate an active feature.

The alias in the current Vite configuration points `@` to the project root, not directly to `src`. Follow existing import conventions unless you intentionally align both Vite and TypeScript aliases.

## 5. How the application works

`main.tsx` mounts `App`. `App` places the application inside `RouterProvider`. The router reads the browser pathname, and `AppContent` chooses the matching view. Navbar, footer and shared modals sit around that page content.

The custom router updates browser history and React state. Its Link retains ordinary anchor behavior for modifier keys and new tabs. Navigation scrolls to the top and includes a main-content focus action. Browser back/forward is handled through `popstate`.

This is not React Router. Avoid introducing React Router hooks into individual files without deliberately migrating the routing system.

Routing limitations to consider when extending:

- Exact route matching requires care with trailing slashes.
- `/about` is internally mapped to Our Vision; the address is not necessarily replaced with the canonical URL.
- Query-string and hash-dependent features need deliberate implementation.
- The production server must return `index.html` for valid client-side page URLs.
- Back/forward navigation should receive accessibility testing alongside ordinary clicks.

App-level inquiry/content edits currently change React state only. Refreshing the page restores mock data and discards newly submitted inquiries. No browser state should be treated as a trusted authorization boundary.

## 6. Page and design editing guide

### Change existing content

1. Locate the page in the navigation table.
2. Edit its text, sections and asset references.
3. Change shared navigation in `Navbar.tsx` and `Footer.tsx` only when needed.
4. Check desktop, tablet and narrow mobile layouts.
5. Run type checking and the production build after restoring dependencies.
6. Verify every changed CTA and link in the production preview.

### Add a public page

1. Create `src/views/NewPageView.tsx`, following the export style of neighboring views.
2. Add the pathname to `PageRoute` in `src/types.ts`.
3. Update the route list in `src/router/index.tsx` where applicable.
4. Add the matching resolver branch in `src/App.tsx` and import the view.
5. Add navigation entries in the appropriate shared components.
6. Use the project's custom Link for internal navigation.
7. Set page title/description if introducing route metadata; that mechanism may need to be added.
8. Test direct URL loading, refresh, back/forward, unknown paths and mobile navigation.

Do not add new navigation labels without working destinations. Prefer a clear unavailable state over links that silently go nowhere.

### Add or replace images and logos

1. Use the newest team-approved asset rather than older logo variants.
2. Put public assets in `public/images/` with descriptive, consistent filenames.
3. Reference them as `/images/example.webp`, without `/public` in the URL.
4. Match filename capitalization exactly; deployed Linux systems may be case-sensitive.
5. Supply useful alt text for meaningful images; use empty alt text for decorative imagery.
6. Set dimensions/aspect ratios to prevent layout jumps.
7. Compress images and choose crops suitable for both desktop and mobile.
8. Keep the primary hero available immediately; lazy-load lower-page imagery.

Existing filenames contain spaces. They can work, but if renaming them, update every reference and verify the built site. Never replace a logo globally without checking header and footer contrast and aspect ratio.

### Improve the home page

Work first in `HomeView.tsx`, then shared styles and navigation as needed:

1. Use one strong full-width aviation/logistics image with a readable overlay.
2. Keep a concise headline, supporting copy and clear Inquiry CTA.
3. Check hero text against the image at every viewport, especially narrow screens.
4. Establish a consistent content width, section rhythm, heading scale and button system.
5. Follow with relevant service information, the route/hub story, credible company information and a closing contact CTA.
6. Use real approved business evidence; hide unsupported statistics and sample testimonials.
7. Keep scroll effects subtle and avoid excessive sticky sections or long empty animation sequences.
8. Respect `prefers-reduced-motion` in CSS and any JavaScript-driven effects.

The current home source includes a generic external `ForBiggerBlazes.mp4` video in its motion mode. Replace it with approved footage or remove that mode before launch. Current map decorations use hardcoded positions; do not present those as verified geographic routes.

### Smooth scrolling and accessible motion

Prefer native scrolling and small opacity/transform transitions. Smooth scrolling is an enhancement, not a reason to intercept all input. Disable decorative motion and smooth behavior for reduced-motion users. Keep content visible if an animation fails, and test sticky navigation, anchor offsets, keyboard focus and touch scrolling.

### Connect another Inquiry button

Use the existing `onOpenInquiry` callback passed into page components. Pass a short relevant context, such as the selected service, and reuse the shared form. Do not create another form with a separate data model or a simulated success handler.

## 7. Inquiry flow

### Current fields

| Field | Current behavior |
| --- | --- |
| Name | Required |
| Company name | Required |
| Country code and mobile | Country selector plus local mobile input |
| Category | Shipper, CHA, Freight Forwarder or Airline Operator |
| Message | Required; maximum 300 whitespace-separated words |
| Context | Optional information from the CTA |

The main type is `Inquiry`; `Enquiry` remains an alias for older components. Optional legacy freight/email fields exist for compatibility and are not all present in the public form.

### Current submission sequence

1. `InquiryForm` collects the input.
2. `validateInquiry` checks required fields, category, mobile and message length.
3. `submitInquiry` generates an object and demonstration reference number locally.
4. The success callback adds the inquiry to App's React state.
5. The UI displays a preview result.
6. Refreshing the browser loses the submission.

**This does not send a lead to the business.** Make the preview status clear before submission until a real API is connected.

Current validation accepts 6–15 local mobile digits after limited normalization. Country-code validation and combined international number validation need improvement. The generated reference is not guaranteed unique, and timestamps are display strings rather than a durable UTC storage format.

The form has no required email field. Do not promise email confirmations or customer email replies without changing the form, consent handling and delivery system. Initially, staff can follow up using the supplied phone number through an approved business process.

## 8. Known gaps and priorities

| Priority | Finding | Required action |
| --- | --- | --- |
| Before reproducible development | Manifest and lockfile missing | Restore matching files and verify installation |
| Before collecting real leads | Inquiries are memory-only | Implement persistence or clearly keep the site in preview |
| Before public release | Demo login/dashboard reachable | Remove demo access from production; add real server authorization before enabling staff features |
| Before public release | Sample team profiles remain | Replace with approved profiles or omit them |
| Before public release | Generic video and decorative map | Replace/remove or label accurately |
| Before production data | Demo customer filtering uses email/company text; selection can use a broader inquiry list | Replace with server-side permissions and scoped queries |
| Before production CMS | Dashboard edits do not reliably drive public content | Connect views and editing APIs to one persistent source |
| Form robustness | Fixed form IDs can collide when embedded form and modal coexist | Generate instance-specific IDs and label associations |
| Form robustness | Submission needs exception handling | Add pending, failure, timeout and retry behavior |
| Accessibility | Motion support is incomplete | Test reduced motion, focus, dialog behavior and navigation |
| Maintenance | Legacy disconnected code remains | Remove only after import/reference audit |

The demo dashboard must not be treated as a secure admin panel. A role supplied by the browser is not evidence of permission. Hide the demo route, footer entry and login in production; also ensure real protected API endpoints authenticate and authorize every request. A UI-only route guard does not protect data.

## 9. Backend and database implementation

### Proposed architecture — not present yet

Preserve the existing Vite frontend and add a small TypeScript Node API with MySQL. Express is a possible API framework; this is a proposed implementation choice, not an existing working server. If an earlier Next.js specification remains mandatory, treat that as a separately planned migration rather than pretending this code already uses Next.js.

Use same-origin `/api` requests where possible. In development, proxy `/api` from Vite to the API. In production, either serve the built frontend from the API server or configure a reverse proxy. Keep the database private and accessible only to trusted server processes.

### Stage A — prepare the server

1. Restore and verify the frontend build first.
2. Add `server/` for API code and a separate server TypeScript configuration.
3. Choose and pin compatible server dependencies: HTTP framework, MySQL driver or ORM, validation, password hashing, session storage and rate limiting.
4. Add a health endpoint and a consistent JSON error format.
5. Add environment validation so missing database or session settings cause clear startup failures.
6. Add development, server build and production start scripts. They do not exist in this archive; document their exact names once implemented.
7. Keep API routes before any SPA fallback so API errors return JSON rather than HTML.

Suggested new structure:

```text
server/
  app.ts
  index.ts
  config.ts
  db/
  routes/
  middleware/
  services/
  validation/
  migrations/
```

These are proposed paths, not files discovered in the ZIP.

### Stage B — create persistent storage

1. Provision separate development and production MySQL databases.
2. Create a dedicated application account with only required permissions. Use separate migration credentials if schema changes require broader access.
3. Store credentials in server-only environment settings.
4. Choose one migration approach, such as a supported ORM or a versioned SQL migration runner. Do not mix manual production edits with untracked schema changes.
5. Create and review the initial schema migration.
6. Apply it to development, test it on staging, and back up production before applying reviewed migrations there.
7. Do not seed real environments with mock inquiries or publicly known demo passwords.

Suggested minimum tables:

| Table | Essential data and constraints |
| --- | --- |
| `staff_users` | ID, unique login email, password hash, ADMIN/TEAM role, active flag, timestamps |
| `sessions` | Server-side session identity, staff ID, expiry and revocation support |
| `inquiries` | ID, unique reference, name, company, country code, normalized mobile, category, message, context, status, nullable assigned staff ID, timestamps |
| `inquiry_notes` | ID, inquiry ID, author staff ID, note, timestamp; staff-only |
| `inquiry_activity` | Inquiry ID, staff actor when applicable, action/status transition, timestamp |
| `notification_jobs` | Optional durable delivery job, attempt count and delivery state |

Use foreign keys for relationships; index frequently filtered fields such as status, assignment and creation time. Use generated unique IDs, an enforced unique reference constraint, UTC timestamps and `utf8mb4` text storage. Retry reference generation on collision. Do not rely on a four-digit random suffix as the sole uniqueness guarantee.

Store internal notes separately from public response shapes. Return an explicit allowlist of response fields rather than serializing an entire database record. A comment saying “hidden from customers” in a TypeScript interface does not enforce privacy.

CMS tables such as services, team members and page content can follow later. They are not necessary to make guest inquiries reliable.

### Stage C — define API contracts

| Endpoint | Access | Purpose |
| --- | --- | --- |
| `GET /api/health` | Public, minimal response | Service availability without configuration disclosure |
| `POST /api/inquiries` | Guest, rate-limited | Validate and persist an inquiry |
| `POST /api/auth/login` | Staff credentials | Create a secure session |
| `POST /api/auth/logout` | Session | Revoke session |
| `GET /api/auth/me` | Session | Return authenticated staff identity |
| `GET /api/admin/inquiries` | Authorized staff | Paginated, scoped listing |
| `GET /api/admin/inquiries/:id` | Authorized staff | Scoped detail |
| `PATCH /api/admin/inquiries/:id` | Authorized staff | Validated status/assignment changes |
| `POST /api/admin/inquiries/:id/notes` | Authorized staff | Add an internal note |

These are proposed endpoints, not available URLs. Agree whether TEAM members can view all inquiries or only assigned inquiries, and enforce that policy in server queries. No public inquiry-listing or customer account endpoint is needed for the current scope.

Example guest request:

```json
{
  "name": "Example Person",
  "companyName": "Example Company",
  "countryCode": "+91",
  "mobile": "9000000000",
  "category": "Shipper",
  "message": "Please contact us about cargo services.",
  "context": "Services page"
}
```

Example successful response, only after the transaction commits:

```json
{
  "success": true,
  "referenceNumber": "AR-INQ-EXAMPLE",
  "message": "Your inquiry has been received."
}
```

Never accept client-supplied role, status, internal notes, assigned staff or trusted timestamps as part of guest creation. Return validation errors without database details or stack traces.

### Stage D — implement reliable submission

1. Validate and normalize all input again on the server.
2. Enforce category, message word count, character/body-size limits and international phone rules.
3. Apply spam protection and rate limits appropriate to the deployment.
4. Insert the inquiry and initial activity in a transaction.
5. Return the reference only after a successful commit.
6. Use an idempotency key or equivalent deduplication strategy to avoid duplicates after ambiguous timeouts/retries.
7. If staff notifications are required, queue them after persistence and retry independently. A notification failure must not erase the saved inquiry.
8. Do not log full inquiry text, credentials or session tokens unnecessarily.

### Stage E — replace the frontend simulation

1. Keep the `InquiryForm` UI and validation helpers.
2. Replace local object creation in `submitInquiry` with a request to `/api/inquiries`.
3. Update the submission result type and its callers together; the current result expects a locally created inquiry.
4. Add `try/catch/finally`, pending state and readable error feedback.
5. Disable repeated submission while a request is pending.
6. Preserve user input on failure.
7. Show success only when the server confirms persistence.
8. Remove preview wording only once real persistence is verified.
9. Load dashboard inquiries from the protected API rather than `INITIAL_ENQUIRIES`.
10. Verify persistence after browser refresh and server restart, and from a second authorized browser.

### Stage F — implement real staff authentication

Create staff accounts through a controlled administrative process. Store password hashes using a suitable password-hashing library, never plaintext. Use secure, HttpOnly session cookies in production, appropriate SameSite settings, session expiry/revocation and CSRF protection for cookie-authenticated writes. Rate-limit login attempts.

Read roles from the authenticated server-side user record. Validate permissions on every detail, list, note and update endpoint. Remove browser role selection and mock login behavior from production. Keep guest inquiry submission separate from staff login.

### Proposed environment configuration

The following is an example specification, not a currently implemented loader:

```dotenv
# Server-only; replace placeholders outside Git.
NODE_ENV=development
PORT=3001
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=air_rajasthan_dev
DB_USER=air_rajasthan_app
DB_PASSWORD=replace_locally
SESSION_SECRET=generate_a_long_random_secret
APP_ORIGIN=http://localhost:3000

# Public frontend configuration only, if needed.
VITE_API_BASE_URL=/api
```

Match variable names to the implemented server. Commit `.env.example` with placeholders; ignore real `.env` files. Never prefix database passwords, API secrets or session secrets with `VITE_`: Vite exposes that prefix to browser code. The current frontend preview does not require a database credential or Gemini key to simulate inquiries.

### Backups and operations

Before launch, configure scheduled database backups, retention, restricted access and a tested restore procedure. Track API errors, availability and notification failures. Keep uploads, if later introduced, in durable storage outside replaceable deployment folders. Agree how long inquiry data is retained and how authorized staff correct or delete it.

## 10. Deployment

### Option A — frontend preview only

1. Restore dependencies and complete local verification.
2. Build with the verified project script.
3. Upload the contents of `dist` to the configured static web root.
4. Configure SPA fallback to `index.html` for page routes, while serving real assets normally.
5. Enable HTTPS and test every route directly and after refresh.
6. Keep inquiry submission visibly in preview, or disable it until delivery exists.
7. Remove demo login/dashboard entry points and sample content from the public release.

Static hosting alone does not turn this inquiry form into a working backend.

### Option B — full application with API and MySQL

Hostinger offers Node.js deployment options, but confirm the actual purchased plan supports the required runtime and database arrangement. Do not assume every hosting plan can run this proposed API.

1. Prepare a staging environment and separate staging database.
2. Configure server environment variables in hosting, not in frontend source.
3. Set the actual implemented build/start commands and listening port behavior.
4. Apply reviewed database migrations with the intended migration credentials.
5. Deploy the API and frontend with same-origin `/api` routing or an explicitly configured cross-origin policy.
6. Configure SPA fallback without swallowing API routes or missing static assets.
7. Verify HTTPS cookies, login, authorization, persistence and error handling.
8. Test contact details, images and direct route access on the real domain.
9. Deploy production only after review, with a database backup and rollback plan.

Do not use `npm run dev` or Vite preview as the production server. Redeployment must not destroy database records or uploaded files. Application rollback and database rollback are separate decisions; destructive reverse migrations can lose data.

## 11. Verification checklist

### Frontend checks

- All eight public pages render from both navigation and direct URLs.
- Browser refresh and back/forward work on nested paths.
- Mobile menu opens, closes and supports keyboard interaction.
- Inquiry buttons open the shared form with the correct context.
- Closing the dialog restores focus and scrolling correctly.
- Labels point to unique input IDs, including when two forms are mounted.
- Empty fields, invalid mobile, invalid category and more than 300 words fail clearly.
- Buttons remain usable at narrow widths; text does not overlap imagery.
- Reduced-motion settings work and no essential content depends on animation.
- Approved logo, typography, team details and contact information appear correctly.
- No tracking link, sample identity or generic placeholder media appears unintentionally.
- Type checking and production build pass after manifest restoration.

### Backend checks after implementation

- A valid guest inquiry creates one persistent database record.
- Invalid and oversized requests are rejected on the server.
- Refreshing and restarting do not lose submitted data.
- Retried submissions do not create accidental duplicates.
- Anonymous users cannot list inquiries or read internal notes.
- TEAM permissions are enforced for each requested record.
- Changing a role in browser state does not grant permission.
- Session logout/expiry actually revokes access.
- Database and notification failures produce accurate outcomes.
- Logs and client bundles do not expose secrets or unnecessary personal data.
- A backup can be restored successfully in an isolated environment.

Prioritize automated tests for validation, persistence, authorization and retry behavior. Visual changes can be checked with focused browser review; avoid adding tests that merely repeat static markup.

## 12. Git and AI development workflow

### Small, reviewable changes

1. Check `git status` and preserve existing work.
2. Start from the intended branch and create a focused feature branch.
3. Give the AI one defined feature with acceptance criteria.
4. Inspect the changed files and dependency diff.
5. Run the relevant checks and inspect the UI.
6. Update this README when behavior, scripts or setup change.
7. Commit the completed change with a clear message.
8. Review through the team's development branch before merging to main and deploying.

Do not overwrite an existing repository or recreate `.git` simply because an AI export is missing files. Do not commit `node_modules`, build output unless intentionally required, credentials, database dumps or real customer data. Keep pushes and deployments deliberate.

### Prompt for continuing in Google AI Studio or Antigravity

> Read README.md and inspect the actual source before editing. Preserve the existing React, TypeScript, Vite and custom-router architecture unless I explicitly approve a migration. Keep the eight public pages, AirRajasthan™ branding, Rajdhani headings, Barlow body text and shared Inquiry flow. Tracking remains removed. Implement only the requested feature, using the existing components where appropriate. Clearly separate mock behavior from persistent behavior. Do not invent routes, business claims, team identities, API responses or database availability. Never put secrets in frontend code. Check the dependency manifest and lockfile before changing packages. Run the relevant available checks, report what passed and what could not run, and update README.md with changed files, setup steps and limitations. Do not automatically push or deploy.

For each feature, append a concrete goal and acceptance criteria, for example: “Persist guest inquiries through a server API; success requires a database commit; show failures without losing input; verify persistence after restart; staff-only APIs must reject anonymous access.”

## 13. Troubleshooting

| Symptom | Likely cause and next action |
| --- | --- |
| `ENOENT ... package.json` | Wrong directory or incomplete export. Confirm and restore the manifest first. |
| `ERESOLVE` | Incompatible dependency ranges. Read the named peer requirement and align compatible versions. |
| `npm ci` fails | Missing or out-of-sync lockfile, runtime mismatch or package retrieval problem. Resolve the specific error; do not blindly delete the lockfile. |
| Script missing | Restored manifest does not define that command. Inspect scripts before running it. |
| `rm` not recognized | Unix-only cleanup script in Windows Command Prompt. Use a reviewed cross-platform replacement. |
| Page refresh returns 404 | Hosting lacks SPA fallback for client routes. |
| Images work locally only | Path/capitalization mismatch or files omitted from deployment. |
| Inquiry disappears | Expected current in-memory behavior; implement persistence. |
| Dashboard edit does not affect public content | Demo state is not connected to that view. Implement a shared persistent content source. |
| API returns HTML | SPA fallback caught `/api`, or API URL/proxy is wrong. |
| Duplicate inquiries | Repeated submission or retry without server deduplication. |
| Environment change has no frontend effect | Vite frontend values are build-time configuration; restart development or rebuild deployment as appropriate. |
| HMR behaves differently in AI Studio | `DISABLE_HMR` controls watcher/HMR behavior in the current Vite config. Preserve the intentional environment-specific setup. |

## 14. Next implementation milestones

1. **Reproducible project:** restore manifest/lockfile, document Node runtime, verify types/build.
2. **Launch-quality frontend:** approve home page, imagery, team/contact details and accessibility; remove production demo access.
3. **Persistent inquiries:** API, MySQL migration, server validation, error handling and persistence verification.
4. **Staff operations:** real sessions, scoped dashboard, assignment, status, notes and activity history.
5. **Operational readiness:** staging, backups, monitoring, spam controls and reviewed deployment.
6. **Optional CMS:** connect approved editable content to both dashboard and public views only if the team needs it.

Tracking, public customer accounts and a framework migration are not part of these milestones unless separately requested.

## 15. Official references

Implementation details and hosting products can change. Verify versions against the restored manifest before choosing exact installation commands.

- Vite environment variables and browser exposure: https://vite.dev/guide/env-and-mode
- Hostinger Node.js deployment: https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/
- Hostinger Node.js hosting options: https://www.hostinger.com/support/node-js-hosting-options-at-hostinger/

This README documents the inspected source and a proposed continuation plan. It does not claim that the backend, database, security controls or deployment described as future work have already been implemented.
