#!/bin/bash
cd "$(dirname "$0")" || exit 1
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js 20+ is required. Install it from https://nodejs.org"
  echo "Then open this file again."
  read -r -p "Press Enter to close..."
  exit 1
fi
printf '\nRecruitOps local demo is starting...\n'
printf 'Open: http://127.0.0.1:3077\n'
printf 'Demo login: demo@recruitops.local / DemoPass!2026\n\n'
(sleep 2; open 'http://127.0.0.1:3077') >/dev/null 2>&1 &
npm run demo
