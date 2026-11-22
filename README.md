# World Wide Web

Navigateur web (Electron) avec onglets, favoris, historique, recherche Google.

## Organisation
- `dist/`   : installateur (`Installer.bat`) et lanceur (`Lancer.bat`)
- `src/`    : `index.html`, `style.css`, `app.js`
- `main.js` : code principal Electron
- `package.json`

## Installation (Node.js requis)
Double-cliquer sur `dist\Installer.bat`, puis lancer « World Wide Web » depuis le Bureau.

## Publier une mise à jour
Double-cliquer sur `dist\Publier.bat` : la version est augmentée et l'appli est envoyée sur GitHub
(la première fois, l'adresse du dépôt est demandée). Au prochain lancement, chaque appli installée
compare sa version à celle du dépôt et se met à jour toute seule (le dépôt doit être public).

## Connexion Google / Microsoft (photo, e-mail)
Copier `oauth.example.json` en `oauth.json` (ce fichier n'est jamais envoyé sur GitHub) et y coller :
- **Google** : console.cloud.google.com → créer un projet → « Écran de consentement OAuth » (Externe, s'ajouter comme utilisateur test)
  → « Identifiants » → Créer → « ID client OAuth » de type **Application de bureau** → copier l'ID client et le code secret.
- **Microsoft** : portal.azure.com → Microsoft Entra ID → Inscriptions d'applications → Nouvelle inscription
  → comptes de tout annuaire **et comptes personnels** → URI de redirection : type « Client public / natif », valeur `http://localhost`
  → copier l'« ID d'application (client) ».
