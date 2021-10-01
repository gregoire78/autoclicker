import {
    contextBridge,
    ipcRenderer,
    shell,
    desktopCapturer
} from "electron";

contextBridge.exposeInMainWorld(
    "api", {
        ipcRenderer,
        shell,
        send: (channel, ...args) => {
            // whitelist channels
            let validChannels = ["cps"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, ...args);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["running"];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        },
        isOpen: async () => {
            return await ipcRenderer.invoke('isOpen');
        },
        desktopCapturer
    }
);