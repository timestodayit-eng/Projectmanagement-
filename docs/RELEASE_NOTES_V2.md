# RecruitOps V2 - MVP release notes

## Improvements over original MVP
- Overview now features three large one-click steps: Check Tasks, Assign Team, Review Interviews.
- Team requests create a linked task immediately, rather than living only in a separate Requests section.
- A request and its linked task have synchronized statuses (start, review, revision and approval).
- Task edits reject unauthorized employees instead of silently reporting success.
- Due date calculation in the frontend follows Asia/Dhaka instead of UTC.
- `npm run demo` starts on Mac, Linux and Windows without POSIX-only environment prefixes.
- Includes single-click Mac and Windows launchers.
- User-facing task list remains 5 informational columns, plus open-task action.
- Contains no Google service-account private key or Meta access token.

## Verified
- Syntax validation of server and frontend JavaScript.
- API smoke test: authentication, 3-company access separation, 38-account structure, interview-triggered templates, manager review.
- V2 API test: team request -> linked task, bidirectional status sync, members cannot change someone else's task, D-7 launch.
- React UI rendered successfully through automated headless browser and screenshots captured.

## Remaining before production
- Replace pilot JSON state store with PostgreSQL, backed-up persistent storage and migrations.
- Use supported current React toolchain and security-maintained dependencies.
- Replace server-memory sessions with persistent secure sessions and hardened CSRF controls.
- Implement password reset/change and robust audit logs.
- Add Google service-account setup / test with your actual Sheet; map the correct budget column.
- Connect Meta OAuth and call tracking only with approved credentials / APIs.
- Deploy to Node-capable hosting with TLS and supervisor/restart policy.
