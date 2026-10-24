# RecruitOps 2.0 — Recruitment Operations Command Center (MVP)

An improved, **React-powered, responsive task-management website** for three recruitment companies. The frontend uses bundled React 16 with `React.createElement` (no JSX compile step), and the backend is a zero-dependency Node.js HTTP API. You can run the local demo without `npm install`.

## What is included

| Module | Available in this MVP |
| --- | --- |
| Overview | Open / due today / overdue / review counts, activity, upcoming interviews |
| Task Tracker | 5 visible information columns; search, filters, task details, status and priority |
| Team-to-Team Requests | Marketing → Creative → Web → Media Buying or other teams; every request automatically creates a linked tracked task |
| Task assignment | Assign team and member, add links and comments, submit for review, manager approval |
| Interviews | Each interview has its **own** budget and 12 automatic tasks; launch `interview date - 7 days` |
| Campaign Planner | Interview-specific 50% CALL / 50% WEB and 70 / 15 / 15 per channel |
| Account map | 38 accounts, split into 14 Creative / 12 Coastal / 12 SM, across two Pages each |
| Teams | Company-specific users and teams |
| SOP / Strategy | Expandable, simplified operational instructions and campaign strategy |
| Google Sheets | Secure server-side read-only import from the Mother Command Center when configured |
| Permissions | Super Admin sees 3 brands; other users see their company only |

### Budget mapping

- Creative International: **14 total** (Page 1 and Page 2: each 4 CALL + 3 WEB). Per page, CALL01 + CALL02 = Awareness (split equally), CALL03 = Retargeting, CALL04 = Conversion, WEB01 / WEB02 / WEB03 = these 3 stages.
- Coastal Manpower: **12 total** (per Page 3 CALL + 3 WEB). Stage 01 / 02 / 03 = Awareness / Retargeting / Conversion.
- SM Enterprise: **12 total**, same 3 CALL + 3 WEB per Page.
- For a **single interview** with a $2,500 budget, CALL = $1,250 and WEB = $1,250. Each channel: Awareness $875, Retargeting $187.50, Conversion $187.50. Account allocations add back to $2,500 for the chosen company only.

## 1. Run the local demo on Mac, Windows, or Linux

Requirements: **Node.js 20+**. No dependencies to install.

```bash
# Unzip the package and enter its folder
cd recruitment-ops-react

# Runs ONLY on your own computer; never expose demo publicly
npm run demo
```

Open **http://127.0.0.1:3077**.

**Local demo login (not for public use):**

```text
Email: demo@recruitops.local
Password: DemoPass!2026
```

The demo automatically creates **6 fake interviews, 72 tasks, 18 teams and 38 account slots**. Example employers, job types and budgets are **fictional demonstration data**, not confirmed recruiting offers.

Changes are saved in `data/operations.json` until you remove that file. Task and linked-request status changes are kept together. For a clean demo reset, shut down the server and delete `data/operations.json`.

## 2. Configure a private team environment

This is an MVP/pilot, not hardened production software. Only run it on a trusted private machine or protected staging environment until you add a production database, security audit, backups and monitoring.

Copy `.env.example` to `.env` and enter a strong password. Environment variables can be loaded by a process manager or shell:

```bash
cp .env.example .env
# Edit .env. Set ADMIN_EMAIL and a unique ADMIN_PASSWORD (minimum 12 characters).
# Set DEMO_MODE=false. Never use the sample demo password.
set -a
. ./.env
set +a
npm start
```

**Important:** The app defaults to `HOST=127.0.0.1` and is not reachable publicly. The production host must support running a persistent Node.js process. Simply uploading the ZIP to a PHP-only `public_html` folder will **not** run the Node backend. Add HTTPS, reverse proxy, persistent storage and access controls before exposing it to staff.

The backend writes a local JSON file (`DATA_FILE`) with atomic replacement. It is suitable for a single-instance pilot, **not** reliable multi-instance production. Sessions are in server memory and log out on restart. See `docs/postgres-schema.sql` for a recommended relational schema to migrate to PostgreSQL.

## 3. Connect your Mother Google Sheet

The app accepts a spreadsheet URL in **Settings**, then reads three worksheets. It does **not** request Meta Ads permissions.

1. Create a Google Cloud project, enable **Google Sheets API** and create a **service account**. Save the JSON key **outside the public website folder**.
2. Share only your Mother Sheet with that service account email as **Viewer**. This is read-only access; do not share the file publicly.
3. On the server set `GOOGLE_SERVICE_ACCOUNT_FILE=/secure/path/service-account.json` (or `GOOGLE_SERVICE_ACCOUNT_JSON_B64` as a server secret).
4. Restart the Node server.
5. In Settings, paste the Mother Sheet URL and verify the tabs:
   - `Creative International`
   - `Coastal Manpower`
   - `SM Enterprise`
6. Click **Save connection**, then **Sync interviews**.

Default source format read in `A2:K300` per tab:

| Source column | Import field |
| --- | --- |
| B | Employer / interview name |
| C | Country |
| D | Interview date (valid date/serial or date text) |
| J | Total marketing budget **for that specific interview**, USD |

Blank employer/date rows are skipped. Interview identities use **company + source row**. Do not insert/delete arbitrary source rows after task assignment without reviewing mapping. The first sync creates task templates; later syncs update interview data and move date-based task deadlines if the interview date changes. Existing task comments/status remain intact. If your actual CMS budget column differs from J, change the mapping in `server/server.mjs` before importing, and test a sample first.

No source sheet changes are made by this app. Nothing is imported automatically in the background yet: managers click **Sync interviews** manually.

## 4. Daily workflow

1. Open **Overview** and check overdue and due-today tasks.
2. Open **My Tasks**, filter, open a task, assign its team/member and add brief or proof links.
3. Use **Team Requests** when one team asks another for deliverables.
4. An assignee moves their task **To do → In progress → In review**. A company manager/admin **approves → Completed**, or marks **Needs revision**.
5. Open **Interview Planner**. Each new interview starts a fresh `D-7` workflow.
6. Open **Campaign Planner**, select one interview and verify its account budget split.
7. In **Ad Accounts**, enter real Meta Ad Account IDs and owners when ready. This is **tracking only**.
8. Follow **SOP & Strategy** for campaign and content instructions.

## 5. Important boundaries / work still needed for production

**Available now:** task creation/assignment, link handling, review states, interview dates/tasks, company separation, allocation calculator, manual CMS Google import, per-account mapping.

**Not connected:** Actual Meta Ads Manager login/OAuth, Meta campaign publishing, ad spend import, automated call recordings/connected calls, employee email notifications, Slack/WhatsApp reminders, storage uploads, Google personal OAuth, and live background sync. Those require separate APIs, consent, credentials, monitoring and implementation.

**Security/operations upgrades required:** PostgreSQL and migrations, hardened session storage, CSRF strategy suited to your domain, reverse-proxy trust configuration, password reset/change flow, audit logs for every field edit, secure file uploads, scheduled data synchronization, backups, finer role permissions, tests and security review. Do not use `DEMO_MODE=true` on a public machine.

The included older UMD React runtime avoids requiring an npm install for this reviewable pilot. Before long-term deployment, migrate the React UI to a supported current React/Vite toolchain and update dependencies through your usual security process.

## 6. New in version 2

- Clear **three-step daily workflow** directly on the dashboard.
- Team-to-team requests now **generate tasks automatically** and share the same approval status.
- Improved permission validation for task edits and company ownership.
- Time-sensitive UI dates use the **Asia/Dhaka** date instead of UTC.
- The `npm run demo` command is cross-platform on Node.js 20+.
- Shorter, usable Task Tracker with five visible fields plus an open-task action.

## 7. Files

- `public/index.html` — the React app entrypoint
- `public/app.js` — React UI (JSX-free)
- `public/styles.css` — responsive enterprise dashboard styling
- `public/vendor/` — bundled React runtime for offline demo
- `server/server.mjs` — secure-ish pilot API, authentication, tasks, interviews, Google read-only import
- `docs/postgres-schema.sql` — recommended production database model (NOT yet connected)
- `data/` — local state (automatically created on run)

**No real company data, passwords or Google service-account keys are included in the ZIP.**
