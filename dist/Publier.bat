@echo off
chcp 65001 >nul
title Publier World Wide Web
cd /d "%~dp0.."
where git >nul 2>nul || (echo Git n'est pas installe : https://git-scm.com/download/win & pause & exit /b 1)
where node >nul 2>nul || (echo Node.js n'est pas installe : https://nodejs.org & pause & exit /b 1)

set "DEPOT="
node dist\depot.js > "%TEMP%\www_depot.txt"
set /p DEPOT=<"%TEMP%\www_depot.txt"
if "%DEPOT%"=="" set "DEPOT=Marius-Guignard/World-Wide-Web"

echo Depot : %DEPOT%
if not exist .git git init -b main
git config user.name >nul 2>nul || git config user.name "Marius"
git config user.email >nul 2>nul || git config user.email "marius@world-wide-web.local"
git remote remove origin >nul 2>nul
git remote add origin https://github.com/%DEPOT%.git

call npm version patch --no-git-tag-version >nul
git add -A
git commit -m "Mise a jour de World Wide Web" >nul
git pull --rebase --autostash origin main >nul 2>nul
if errorlevel 1 git rebase --abort >nul 2>nul
git push -u origin main
if errorlevel 1 (
  echo Le depot contient autre chose, j'envoie ta version complete...
  git push -u origin main --force
)
if errorlevel 1 (
  echo.
  echo La publication a echoue. Verifie ta connexion internet et ta connexion GitHub.
  pause & exit /b 1
)

powershell -NoProfile -Command "$d=[Environment]::GetFolderPath('Desktop');$s=(New-Object -ComObject WScript.Shell).CreateShortcut($d+'\World Wide Web.lnk');$s.TargetPath='%CD%\dist\Lancer.bat';$s.WorkingDirectory='%CD%';$s.IconLocation='%CD%\icon.ico';$s.WindowStyle=7;$s.Save()" >nul 2>nul

echo.
echo Publie sur https://github.com/%DEPOT%
echo Le raccourci "World Wide Web" est sur ton bureau.
echo L'appli se mettra a jour a chaque lancement.
pause
