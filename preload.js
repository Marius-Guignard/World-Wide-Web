const { contextBridge, ipcRenderer } = require('electron');
const inv = (c, ...a) => ipcRenderer.invoke(c, ...a);
contextBridge.exposeInMainWorld('wwwApi', {
  onOpenUrl: cb => ipcRenderer.on('open-url', (_e, u) => cb(u)),
  onShortcut: cb => ipcRenderer.on('shortcut', (_e, c) => cb(c)),
  logout: () => inv('logout'),
  login: p => inv('login', p),
  clearData: () => inv('clear-data'),
  newWindow: priv => inv('new-window', priv),
  fullscreen: () => inv('fullscreen'),
  capture: id => inv('capture', id),
  downloads: () => inv('downloads'),
  showItem: p => inv('show-item', p),
  openItem: p => inv('open-item', p)
});
