const {
    contextBridge,
    ipcRenderer
} = require("electron");

contextBridge.exposeInMainWorld(
  "api", {
    send: (channel, data) => {
      ipcRenderer.send(channel, data)
    },
    recieve:(channel, func) => {
      ipcRenderer.on(channel, (event, ...args) => fn(...args));
    }
  },
  "diff", {

  }
);

