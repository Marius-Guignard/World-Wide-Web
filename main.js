const { app, BrowserWindow } = require('electron');
const path = require('path');
const { checkUpdate } = require('./updater');
function createWindow() {
  const win = new BrowserWindow({
    width: 1280, height: 800, minWidth: 600, minHeight: 400, title: 'World Wide Web', backgroundColor: '#f8e4e4',
    icon: path.join(__dirname, 'icon.ico'),
    titleBarStyle: 'hidden',
    titleBarOverlay: { color: '#f8e4e4', symbolColor: '#222222', height: 40 },
    webPreferences: { webviewTag: true, contextIsolation: true, preload: path.join(__dirname, 'preload.js') }
  });
  win.setMenuBarVisibility(false);
  win.webContents.on('did-attach-webview', (e, wc) => {
    wc.setWindowOpenHandler(({ url }) => { win.webContents.send('open-url', url); return { action: 'deny' }; });
  });
  win.loadFile(path.join(__dirname, 'src', 'index.html'));
}
app.whenReady().then(async () => {
  if (await checkUpdate()) { app.relaunch(); app.exit(0); return; }
  createWindow();
});
app.on('window-all-closed', () => app.quit());
