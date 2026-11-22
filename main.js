const { app, BrowserWindow, session, ipcMain, shell, net, webContents, clipboard, dialog, nativeImage } = require('electron');
const path = require('path'), fs = require('fs'), http = require('http'), crypto = require('crypto');
const { checkUpdate } = require('./updater');

/* ---------- Connexion Google / Microsoft (OAuth2 + PKCE, navigateur du système) ---------- */
const PROV = {
  google: { auth: 'https://accounts.google.com/o/oauth2/v2/auth', token: 'https://oauth2.googleapis.com/token',
    scope: 'openid email profile', host: '127.0.0.1' },
  microsoft: { auth: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize', token: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    scope: 'openid profile email User.Read', host: 'localhost' }
};
const b64 = b => b.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const loadCfg = () => { try { return JSON.parse(fs.readFileSync(path.join(__dirname, 'oauth.json'), 'utf8')); } catch (e) { return {}; } };
async function toDataUrl(url, headers) {
  try {
    const r = await net.fetch(url, { headers });
    if (!r.ok) return null;
    const type = r.headers.get('content-type') || 'image/jpeg';
    return `data:${type};base64,${Buffer.from(await r.arrayBuffer()).toString('base64')}`;
  } catch (e) { return null; }
}
function waitForCode(server, state) {
  return new Promise(resolve => {
    const timer = setTimeout(() => { server.close(); resolve(null); }, 180000);
    server.on('request', (req, res) => {
      const u = new URL(req.url, 'http://localhost');
      if (!u.searchParams.has('code') && !u.searchParams.has('error')) { res.end(); return; }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<html><body style="font-family:Segoe UI,sans-serif;text-align:center;margin-top:20vh"><h2>Connexion réussie ✔</h2><p>Vous pouvez fermer cet onglet et revenir à World Wide Web.</p></body></html>');
      clearTimeout(timer); server.close();
      resolve(u.searchParams.get('state') === state ? u.searchParams.get('code') : null);
    });
  });
}
ipcMain.handle('login', async (_e, prov) => {
  const cfg = loadCfg()[prov], P = PROV[prov];
  if (!P || !cfg || !cfg.clientId || /^COLLER/i.test(cfg.clientId)) return { error: 'config' };
  try {
    const server = http.createServer();
    await new Promise(r => server.listen(0, r));
    const redirect = `http://${P.host}:${server.address().port}`;
    const verifier = b64(crypto.randomBytes(32)), state = b64(crypto.randomBytes(12));
    const challenge = b64(crypto.createHash('sha256').update(verifier).digest());
    const q = new URLSearchParams({ client_id: cfg.clientId, redirect_uri: redirect, response_type: 'code', scope: P.scope,
      code_challenge: challenge, code_challenge_method: 'S256', state, prompt: 'select_account' });
    const pending = waitForCode(server, state);
    shell.openExternal(`${P.auth}?${q}`);
    const code = await pending;
    if (!code) return { error: 'annule' };
    const body = new URLSearchParams({ client_id: cfg.clientId, code, code_verifier: verifier, redirect_uri: redirect, grant_type: 'authorization_code' });
    if (cfg.clientSecret) body.set('client_secret', cfg.clientSecret);
    const tr = await net.fetch(P.token, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() });
    const tok = await tr.json();
    if (!tok.access_token) return { error: 'jeton' };
    const auth = { Authorization: 'Bearer ' + tok.access_token };
    if (prov === 'google') {
      const u = await (await net.fetch('https://openidconnect.googleapis.com/v1/userinfo', { headers: auth })).json();
      return { prov, name: u.name || u.email, email: u.email, photo: u.picture ? await toDataUrl(u.picture) : null };
    }
    const u = await (await net.fetch('https://graph.microsoft.com/v1.0/me', { headers: auth })).json();
    return { prov, name: u.displayName || u.userPrincipalName, email: u.mail || u.userPrincipalName,
      photo: await toDataUrl('https://graph.microsoft.com/v1.0/me/photo/$value', auth) };
  } catch (e) { return { error: 'reseau' }; }
});

/* ---------- Fenêtre ---------- */
function createWindow(priv) {
  const win = new BrowserWindow({
    width: 1280, height: 800, minWidth: 600, minHeight: 400, title: 'World Wide Web', backgroundColor: priv ? '#3a3a40' : '#f8e4e4',
    icon: path.join(__dirname, 'icon.ico'),
    titleBarStyle: 'hidden',
    titleBarOverlay: { color: priv ? '#3a3a40' : '#f8e4e4', symbolColor: priv ? '#ffffff' : '#222222', height: 40 },
    webPreferences: { webviewTag: true, contextIsolation: true, preload: path.join(__dirname, 'preload.js') }
  });
  win.setMenuBarVisibility(false);
  win.webContents.on('did-attach-webview', (e, wc) => {
    wc.setWindowOpenHandler(({ url }) => { win.webContents.send('open-url', url); return { action: 'deny' }; });
    // raccourcis clavier utilisables aussi quand une page web a le focus
    wc.on('before-input-event', (ev, input) => {
      if (input.type !== 'keyDown') return;
      const k = input.key.length === 1 ? input.key.toLowerCase() : input.key;
      const ctrl = input.control || input.meta, shift = input.shift;
      let combo = null;
      if (ctrl && !shift && ['t', 'w', 'n', 'h', 'j', 'p', 'f', 'l', '+', '=', '-', '0'].includes(k)) combo = 'ctrl+' + k;
      if (ctrl && shift && ['n', 's', 'o', 'Delete'].includes(k)) combo = 'ctrl+shift+' + k;
      if (k === 'F11' || k === 'F12') combo = k;
      if (combo) { ev.preventDefault(); win.webContents.send('shortcut', combo); }
    });
  });
  win.loadFile(path.join(__dirname, 'src', 'index.html'), priv ? { query: { private: '1' } } : undefined);
  return win;
}
const downloads = [];
app.whenReady().then(async () => {
  const ses = session.fromPartition('persist:www');
  ses.setUserAgent(ses.getUserAgent().replace(/\s(Electron|world-wide-web)\/[\d.]+/gi, ''));
  ipcMain.handle('logout', () => ses.clearStorageData());
  ipcMain.handle('clear-data', async () => { await ses.clearStorageData(); await ses.clearCache(); });
  ipcMain.handle('new-window', (_e, priv) => { createWindow(!!priv); });
  ipcMain.handle('fullscreen', e => { const w = BrowserWindow.fromWebContents(e.sender); w.setFullScreen(!w.isFullScreen()); });
  ipcMain.handle('capture', async (e, id) => {
    const wc = id ? webContents.fromId(id) : e.sender;
    const img = await wc.capturePage();
    const file = path.join(app.getPath('downloads'), 'Capture ' + new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19) + '.png');
    fs.writeFileSync(file, img.toPNG());
    return file;
  });
  ipcMain.handle('downloads', () => downloads.map(d => ({ ...d })));
  ipcMain.handle('show-item', (_e, p) => shell.showItemInFolder(p));
  ipcMain.handle('open-item', (_e, p) => shell.openPath(p));
  /* ---- clic droit sur une image ---- */
  const getBuf = async (url, part) => {
    if (url.startsWith('data:')) { const i = url.indexOf(','); const meta = url.slice(5, i);
      return meta.includes(';base64') ? Buffer.from(url.slice(i + 1), 'base64') : Buffer.from(decodeURIComponent(url.slice(i + 1))); }
    const r = await session.fromPartition(part || 'persist:www').fetch(url);
    return Buffer.from(await r.arrayBuffer());
  };
  const baseName = (url, ext) => { let n = 'image';
    try { n = decodeURIComponent(new URL(url).pathname.split('/').pop() || 'image'); } catch (e) {}
    n = n.replace(/[\\/:*?"<>|]/g, '_').replace(/\.[a-z0-9]{2,5}$/i, '') || 'image'; return n + ext; };
  const extOf = (url, buf) => { const m = /\.(png|jpe?g|gif|webp|bmp|svg|ico)(\?|$)/i.exec(url); if (m) return '.' + m[1].toLowerCase();
    if (buf[0] === 0x89) return '.png'; if (buf[0] === 0xff) return '.jpg'; if (buf[0] === 0x47) return '.gif'; if (buf[0] === 0x52) return '.webp'; return '.png'; };
  ipcMain.handle('copy-text', (_e, t) => clipboard.writeText(String(t || '')));
  ipcMain.handle('copy-image', (_e, id, x, y) => { const wc = webContents.fromId(id); if (wc) wc.copyImageAt(Math.round(x), Math.round(y)); });
  ipcMain.handle('save-image-as', async (e, o) => {
    try {
      const buf = await getBuf(o.url, o.part); const ext = extOf(o.url, buf);
      const win = BrowserWindow.fromWebContents(e.sender);
      const r = await dialog.showSaveDialog(win, { defaultPath: path.join(app.getPath('downloads'), baseName(o.url, ext)),
        filters: [{ name: 'Image', extensions: [ext.slice(1)] }, { name: 'Tous les fichiers', extensions: ['*'] }] });
      if (r.canceled || !r.filePath) return null;
      fs.writeFileSync(r.filePath, buf);
      downloads.unshift({ name: path.basename(r.filePath), path: r.filePath, state: 'terminé', date: Date.now() });
      return r.filePath;
    } catch (err) { return false; }
  });
  ipcMain.handle('save-image-jpeg', async (_e, o) => {
    try {
      let img = null;
      const wc = o.id ? webContents.fromId(o.id) : null;
      if (wc) { const pt = clipboard.readText(), pi = clipboard.readImage();
        wc.copyImageAt(Math.round(o.x), Math.round(o.y)); await new Promise(r => setTimeout(r, 250));
        const c = clipboard.readImage(); if (!c.isEmpty()) img = c;
        clipboard.clear(); if (pt) clipboard.writeText(pt); else if (!pi.isEmpty()) clipboard.writeImage(pi); }
      if (!img) { const n = nativeImage.createFromBuffer(await getBuf(o.url, o.part)); if (!n.isEmpty()) img = n; }
      if (!img) return false;
      const dir = app.getPath('downloads'); let f = path.join(dir, baseName(o.url, '.jpg')), k = 1;
      while (fs.existsSync(f)) f = path.join(dir, baseName(o.url, '') + ' (' + (k++) + ').jpg');
      fs.writeFileSync(f, img.toJPEG(92));
      downloads.unshift({ name: path.basename(f), path: f, state: 'terminé', date: Date.now() });
      return f;
    } catch (err) { return false; }
  });
  ses.on('will-download', (_e, item) => {
    const file = path.join(app.getPath('downloads'), item.getFilename());
    item.setSavePath(file);
    const rec = { name: item.getFilename(), path: file, state: 'en cours', date: Date.now() };
    downloads.unshift(rec);
    item.on('done', (_ev, state) => { rec.state = state === 'completed' ? 'terminé' : 'échoué'; });
  });
  if (await checkUpdate()) { app.relaunch(); app.exit(0); return; }
  createWindow();
});
app.on('window-all-closed', () => app.quit());
