# RecruitOps V2 - Hostinger Cloud deployment

## Important

This package is built from the existing RecruitOps V2 **pilot**. It is ready for a controlled Hostinger staging deployment but has not undergone a comprehensive production security audit. Do not invite all employees or enter sensitive recruiting/candidate records before a full security review, backup policy and user-account controls are in place.

Unlike the original MVP, this package can store all task/interview/user/application state in **Hostinger MySQL**, so updating the website does not erase the local `operations.json` file. The database implementation uses **one JSON document per app** (single row), suitable for small single-process pilots only. Migrate to normalized SQL tables before large scale. No automated database backups are included.

## 1. Create a new MySQL database

In Hostinger hPanel: **Websites > Dashboard > Databases > Management**. Create a DB and account. Write down the **FULL** database name and username, both typically include your Hostinger user prefix, plus your own DB password. Use `DB_HOST=127.0.0.1` for Hostinger managed MySQL, not `localhost`.

## 2. Upload app as NEW Node.js website

1. hPanel > Websites > Create Website > Web App (Node.js).
2. Choose **Upload your website files**. Upload `RecruitOps_Hostinger_Cloud_Ready.zip`, not the old local/demo ZIP.
3. Select **Node.js 22.x**.
4. This app is a Node.js HTTP server (framework detection may say `Other`); choose the server app, not static React.
5. App root must contain `package.json` and `server.js` (the new ZIP has them at top-level, without a parent folder).
6. Set **Entry file: `server.js`** (if entry file is requested). Set **Start command: `npm start`** (or `node server.js` if only raw command accepted). No React build step is required; the client files are already in `public/`.
7. Add environment variables in the deployment screen. Hostinger should install `mysql2` from package.json.
8. Deploy. Check Hostinger Deployments / logs if it fails.

## 3. Required environment variables

| Variable | Value |
|--|--|
| NODE_ENV | `production` |
| DEMO_MODE | `false` |
| ADMIN_EMAIL | your NEW private administrator email |
| ADMIN_PASSWORD | a unique strong password, minimum 12 characters, preferably 20+ |
| DB_HOST | `127.0.0.1` |
| DB_PORT | `3306` |
| DB_USER | full Hostinger database username |
| DB_PASSWORD | database password |
| DB_NAME | full Hostinger database name |

**Do not set `HOST` or `PORT`.** The program listens on `0.0.0.0` and Hostinger's `PORT` when NODE_ENV is production. **Do not upload `.env`** to GitHub; enter secrets in hPanel. `ADMIN_PASSWORD` creates the admin account only on the database's very first run; later changing this environment variable will **not** reset the account password.

The server refuses production startup when MySQL settings are missing, to prevent accidental loss of all tasks on a website redeploy.

## 4. Verify

- Open the temporary Hostinger domain and expect the login screen.
- Open `/api/health`: expect `{"ok":true,"storage":"mysql","demo":false}`.
- Sign in with your custom admin email/password. **Never use the V2 demo password online.**
- Add a test interview, a Team Request and a Task, and change one status.
- Use Hostinger's **Restart** (not Remove Website) and confirm the records remain after logging in again.
- Check Hostinger **phpMyAdmin** for a row in `recruitops_state`; don't edit its JSON manually.
- Test backups before real use.

## 5. Connect a custom domain

In the Node.js Website dashboard choose **Connect domain**. For a new app, prefer a separate subdomain, such as `tasks.your-domain.com`, so your existing marketing sites are not overwritten. Hostinger will guide DNS, then install SSL automatically.

## 6. Mother Google Sheet (optional)

The app uses a read-only Google Cloud **service account**. Enable Google Sheets API, share the source Mother spreadsheet with the service-account email as **Viewer**, and set `GOOGLE_SERVICE_ACCOUNT_JSON_B64` in Hostinger environment variables (base64-encoded service account JSON). In RecruitOps Settings, paste the Mother Sheet link and name the 3 company tabs. Click **Sync interviews**. This is a MANUAL operation; automatic sync isn't included. The application does not modify the Google Sheet and does not connect to Meta Ads.

## 7. Operational constraints / what is NOT in this package

- Production security audit, account recovery, session persistence, automated backups, database migrations, fine-grained employee permissions and audit logs are still pending.
- Sessions live in server memory, so users sign in again after restart/redeploy.
- Database is a single-row JSON snapshot for a small/single-instance pilot; it is not an enterprise multi-instance relational task DB.
- Meta Ads OAuth and actual campaign launch are NOT included; the 38 ad accounts are planning/management records.
- Old React vendor runtime is included from the V2 MVP; upgrade the frontend runtime before production rollout.
- This version intentionally has NO auto-seeded fake demo interviews in production.

Hostinger references: https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/ , https://www.hostinger.com/support/connecting-a-hostinger-mysql-database-to-a-node-js-application/ .
