// Lit (ou enregistre) l'adresse du dépôt GitHub dans depot.json
const fs = require('fs'), path = require('path');
const f = path.join(__dirname, '..', 'depot.json');
if (process.argv[2]) {
  const u = process.argv[2].trim().replace(/^https?:\/\/github\.com\//i, '').replace(/\.git$/, '').replace(/\/+$/, '');
  if (/^[\w.-]+\/[\w.-]+$/.test(u)) fs.writeFileSync(f, JSON.stringify({ depot: u }));
}
try { console.log(JSON.parse(fs.readFileSync(f, 'utf8')).depot || ''); } catch (e) { console.log(''); }
