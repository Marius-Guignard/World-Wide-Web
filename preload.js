const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('wwwApi', { onOpenUrl: cb => ipcRenderer.on('open-url', (_e, u) => cb(u)) });
