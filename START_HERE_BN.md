# RecruitOps V2 | বাংলা Quick Start

**এটি React + Node.js ওয়েব অ্যাপের লোকাল ডেমো; অনলাইনে প্রকাশিত ওয়েবসাইট নয়।**

## প্রথমবার চালাবেন যেভাবে (Mac)

1. ZIP ফাইলটি Extract করুন। ভিতরে `recruitment-ops-react` ফোল্ডার পাবেন।
2. Mac-এ **Node.js 20 বা পরবর্তী সংস্করণ** ইনস্টল থাকতে হবে।
3. `recruitment-ops-react` ফোল্ডারে `LAUNCH_ON_MAC.command` চালু করুন। (Mac Security বাধা দিলে Terminal দিয়ে নিচের কমান্ড চালান।)
4. অথবা Terminal-এ:

```bash
cd /path/to/recruitment-ops-react
npm run demo
```

5. ব্রাউজারে **http://127.0.0.1:3077** খুলুন।

ডেমো লগইন: `demo@recruitops.local` / `DemoPass!2026`। ডেমো পাসওয়ার্ড পাবলিক সার্ভারে ব্যবহার করবেন না।

**Windows:** `LAUNCH_ON_WINDOWS.bat` অথবা CMD থেকে `npm run demo`।

## কোন কাজ কোথায়?

| মেনু | ব্যবহার |
|---|---|
| Overview | আজ কী কাজ, কোনটি overdue, কে review করবে |
| Task Tracker | প্রত্যেক কাজের Owner, Deadline, Status, Brief, Links, Comments |
| Team Requests | Marketing → Creative/Web/Media Buying এ কাজ পাঠান; Tracker-এ linked task তৈরি হবে |
| Interviews | ইন্টারভিউ যোগ করুন; D-7 launch এবং ১২টি কাজ অটো তৈরি |
| Campaign Planner | একটি Interview-এর বাজেট Call/Web এবং Awareness/Retarget/Conversion-এ ভাগ |
| Ad Accounts | ৩ কোম্পানির ৩৮টি account ও stage mapping |
| Team Members | User, Company এবং Team Management |
| SOP & Strategy | কাজ চালানোর নিয়ম ও audience/budget guideline |
| Settings | Mother Google Sheet link, source tab names ও sync ব্যবস্থা |

## গুরুত্বপূর্ণ নিয়ম

- **১ Interview = আলাদা Budget**। অন্য কোম্পানির ইন্টারভিউর সঙ্গে অঙ্ক যোগ করবেন না।
- **CALL ৫০% | WEB ৫০%**। প্রতি চ্যানেলে TOF ৭০% | MOF ১৫% | BOF ১৫%।
- Creative: **১৪ Account**, প্রতি পেজ **৪ Call + ৩ Web**। Coastal: **১২**, প্রতি পেজ **৩ Call + ৩ Web**। SM: **১২**, প্রতি পেজ **৩ Call + ৩ Web**।
- ইন্টারভিউর **৭ দিন আগে Campaign Start**। একই দিনে আগের Interview ও নতুন launch থাকতে পারে।
- Employee কাজ **In Review** এ পাঠাবে; Manager **Approve & Complete** করবে।
- Team Request তৈরি করলে **একটি linked task** Task Tracker-এও দেখা যাবে।

## Google Sheet Live Connection

Settings থেকে Mother Google Sheet-এর লিংক রাখা যায়। **লাইভ সিঙ্ক করার আগে** সার্ভারে Google Sheets API-এর **service-account credential** কনফিগার করতে হবে এবং মূল শিটে সেই account-কে Viewer access দিতে হবে। এই ZIP-এ কোনো Google API credential নেই। Configuration ছাড়া Sync করা যাবে না।

Source tabs:
- `Creative International`
- `Coastal Manpower`
- `SM Enterprise`

Sheet-এর B = employer; D = interview date; J = marketing budget হিসেবে এই MVP প্রস্তুত। আপনার CMS-এ বাজেট অন্য কলামে হলে sync mapping বদলাতে হবে। Import **read-only**; এই ডেমো আপনার original Google Sheet পরিবর্তন করে না।

## এই ভার্সন কী নয়?

এটি এখনও **Meta Ads Manager-এ campaign publish করে না**, real ad spend বা call data আনে না। Hostinger-এ live চালাতে Node.js server support, HTTPS, proper database, user security এবং Google access setup লাগবে। কেবল PHP `public_html`-এ ZIP আপলোড করে Node.js API চালু হবে না।

মূল technical instructions: `README.md`।
