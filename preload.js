const {
    contextBridge,
    ipcRenderer
} = require("electron");

const Diff = require("diff");



contextBridge.exposeInMainWorld(
  "api", {
    send: (channel, data) => {
      ipcRenderer.send(channel, data)
    },
    recieve:(channel, func) => {
      ipcRenderer.on(channel, (event, ...args) => fn(...args));
    }
  }
);


contextBridge.exposeInMainWorld(
  "diff", {
    diffChars: (old_text, new_text) => {
      return Diff.diffChars(old_text, new_text);
    },
    diffSentences: (old_text, new_text) => {
      return Diff.diffSentences(old_text, new_text);
    }
  }
);
