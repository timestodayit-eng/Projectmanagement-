@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Please install Node.js 20 or newer: https://nodejs.org
  pause
  exit /b 1
)
echo RecruitOps local demo: http://127.0.0.1:3077
start "" "http://127.0.0.1:3077"
call npm run demo
pause
