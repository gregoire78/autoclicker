const {
    contextBridge,
    ipcRenderer,
    shell,
    desktopCapturer
} = require("electron");

contextBridge.exposeInMainWorld(
    "api", {
        receive: (channel, func) => {
            let validChannels = ["running"];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        },
        setCps: async (cps) => {
            return await ipcRenderer.invoke('setCps', cps);
        },
        desktopCapturer
    }
);