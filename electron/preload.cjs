const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  printText: (text) => ipcRenderer.send("print-text", text),
});

