@echo off
cd /d "%~dp0.."
if not exist node_modules\electron\dist call npm install
start "" /min cmd /c "npx --no-install electron ."
