// Mise à jour automatique : au lancement, compare la version locale à celle du dépôt GitHub
const { net, app } = require('electron');
const fs = require('fs'), path = require('path'), os = require('os'), cp = require('child_process');

function get(url, ms = 4000) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('timeout')), ms);
    const r = net.request(url), chunks = [];
    r.on('response', x => {
      if (x.statusCode !== 200) { clearTimeout(t); return reject(new Error('HTTP ' + x.statusCode)); }
      x.on('data', c => chunks.push(c));
      x.on('end', () => { clearTimeout(t); resolve(Buffer.concat(chunks)); });
    });
    r.on('error', e => { clearTimeout(t); reject(e); });
    r.end();
  });
}
const newer = (a, b) => { const x = a.split('.').map(Number), y = b.split('.').map(Number);
  for (let i = 0; i < 3; i++) { if ((x[i] || 0) > (y[i] || 0)) return true; if ((x[i] || 0) < (y[i] || 0)) return false; } return false; };

async function checkUpdate() {
  try {
    const dir = __dirname;
    const depot = JSON.parse(fs.readFileSync(path.join(dir, 'depot.json'), 'utf8')).depot;
    const local = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8')).version;
    const remote = JSON.parse((await get(`https://raw.githubusercontent.com/${depot}/main/package.json`)).toString()).version;
    if (!newer(remote, local)) return false;
    const zip = path.join(os.tmpdir(), 'www-update.zip'), tmp = path.join(os.tmpdir(), 'www-update');
    fs.writeFileSync(zip, await get(`https://github.com/${depot}/archive/refs/heads/main.zip`, 60000));
    const ps = '$ErrorActionPreference="Stop";' +
      'if(Test-Path $env:WWW_TMP){Remove-Item $env:WWW_TMP -Recurse -Force};' +
      'Expand-Archive -LiteralPath $env:WWW_ZIP -DestinationPath $env:WWW_TMP -Force;' +
      '$d=(Get-ChildItem $env:WWW_TMP -Directory)[0].FullName;' +
      'robocopy $d $env:WWW_APP /E /XD node_modules .git | Out-Null;' +
      'if($LASTEXITCODE -lt 8){exit 0}else{exit 1}';
    cp.execFileSync('powershell', ['-NoProfile', '-Command', ps],
      { env: { ...process.env, WWW_ZIP: zip, WWW_TMP: tmp, WWW_APP: dir }, timeout: 120000 });
    return true;
  } catch (e) { return false; } // hors-ligne ou pas de dépôt : on lance l'appli normalement
}
module.exports = { checkUpdate };
