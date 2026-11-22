@echo off
cd /d "%~dp0.."
start "" powershell -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -STA -File "%~dp0Installateur.ps1"
