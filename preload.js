const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('wwwApi', {
  onOpenUrl: cb => ipcRenderer.on('open-url', (_e, u) => cb(u)),
  logout: () => ipcRenderer.invoke('logout'),
  login: p => ipcRenderer.invoke('login', p)
});
