# Hostinger Cloud-এ RecruitOps চালু করার সহজ গাইড

**এটি লাইভ Hosting-এর জন্য staging/pilot প্যাকেজ, production security audit শেষ হয়নি।**

1. Hostinger hPanel > **Websites > Create Website > Web App (Node.js)**।
2. **Databases > Management** থেকে একটি **MySQL database** তৈরি করুন। পূর্ণ DB Name, DB Username ও Password নোট করুন।
3. **Upload your website files**-এ `RecruitOps_Hostinger_Cloud_Ready.zip` দিন।
4. **Node.js 22**, App Entry `server.js`, Start `npm start` দিন। Static/React-only website নয়; Node.js app সিলেক্ট করুন।
5. **Environment variables** সেকশনে `.env.example` অনুযায়ী সব Required নাম দিন: `NODE_ENV=production`, `DEMO_MODE=false`, নিজের `ADMIN_EMAIL`, শক্ত `ADMIN_PASSWORD`, `DB_HOST=127.0.0.1`, `DB_PORT=3306`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`।
6. Hostinger নিজে PORT দেয়। `HOST`/`PORT` manually set করার দরকার নেই।
7. **Deploy** করুন। temporary domain খুলুন। `/api/health`-এ `storage:mysql` দেখতে পাবেন। নিজের নতুন Admin Email/Password দিয়ে Login করুন।
8. **Connect domain**-এ আলাদা subdomain (`tasks.yourdomain.com`) রাখুন। SSL automatic হবে।
9. Google Sheet connect পরে করতে পারবেন: Google Service Account JSON Base64 environment variable-এ, Sheet-এ Viewer access, অ্যাপে Settings > Sync interviews।

**সতর্কতা:** পুরনো demo password অনলাইনে ব্যবহার করবেন না। সব employee-এর জন্য public release-এর আগে security testing, backup এবং permission audit দরকার। বর্তমান MySQL adapter single process pilot-এর জন্য।
