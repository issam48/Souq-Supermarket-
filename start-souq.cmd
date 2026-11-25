@echo off
setlocal
cd /d "%~dp0"

where.exe node.exe >nul 2>nul
if errorlevel 1 (
  echo Node.js 22.14 or newer is required.
  echo Install Node.js, then run this shortcut again.
  pause
  exit /b 1
)

node.exe -e "require('node:sqlite').DatabaseSync" >nul 2>nul
if errorlevel 1 (
  echo This app requires Node.js 22.14 or newer.
  pause
  exit /b 1
)

curl.exe -fsS http://127.0.0.1:4173/api/status 2>nul | findstr.exe /C:"setupRequired" >nul
if not errorlevel 1 goto open_app

start "Souq server" /min /D "%~dp0" node.exe server\index.mjs

for /L %%I in (1,1,30) do (
  curl.exe -fsS http://127.0.0.1:4173/api/status 2>nul | findstr.exe /C:"setupRequired" >nul
  if not errorlevel 1 goto open_app
  timeout.exe /t 1 /nobreak >nul
)

echo Souq did not start. Check the minimized server window for the error.
pause
exit /b 1

:open_app
start "" http://127.0.0.1:4173
exit /b 0
