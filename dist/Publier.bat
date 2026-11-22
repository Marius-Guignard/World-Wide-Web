@echo off
chcp 65001 >nul
title Publier World Wide Web sur GitHub
cd /d "%~dp0.."
where git >nul 2>nul || (echo Git n'est pas installe : https://git-scm.com/download/win & pause & exit /b 1)
where node >nul 2>nul || (echo Node.js n'est pas installe. & pause & exit /b 1)

if not exist depot.json (
  echo Colle l'adresse de ton depot GitHub, par exemple :
  echo    https://github.com/ton-nom/World-Wide-Web
  set /p URL=Adresse : 
  call node -e "const u=process.argv[1].trim().replace(/^https:\/\/github.com\//,'').replace(/\.git$/,'').replace(/\/$/,'');require('fs').writeFileSync('depot.json',JSON.stringify({depot:u}))" "%URL%"
)
for /f %%i in ('node -p "require('./depot.json').depot"') do set DEPOT=%%i

if not exist .git git init -b main
git remote remove origin >nul 2>nul
git remote add origin https://github.com/%DEPOT%.git

call npm version patch --no-git-tag-version >nul
git add -A
git commit -m "Mise a jour de World Wide Web"
git pull --rebase origin main >nul 2>nul
git push -u origin main
if errorlevel 1 (
  echo.
  echo La publication a echoue. Verifie l'adresse du depot et ta connexion GitHub.
  pause & exit /b 1
)
echo.
echo Publie sur https://github.com/%DEPOT%
echo Les apps se mettront a jour au prochain lancement.
pause
