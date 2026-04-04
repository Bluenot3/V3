@echo off
setlocal
cd /d "%~dp0"

set "API_RUNNING="
for /f "tokens=5" %%P in ('netstat -ano ^| findstr :3001 ^| findstr LISTENING') do (
  set "API_RUNNING=%%P"
)

if not defined API_RUNNING (
  echo [preview] Starting API server on http://127.0.0.1:3001
  start "Vanguard API Server" cmd /k "cd /d \"%~dp0\" && node server\index.js"
  timeout /t 2 >nul
) else (
  echo [preview] API already running on port 3001 (PID %API_RUNNING%)
)

node scripts\serve-static-preview.cjs --host 127.0.0.1 --port 4173
endlocal
