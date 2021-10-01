const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const { spawn, Worker, Thread } = require('threads');
const path = require('path');
const workerURL = require('threads-plugin/dist/loader?name=auto!./auto.js');

const isDev = process.env.NODE_ENV === "development";

const state = {
  working: false,
  cps: 1000,
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      worldSafeExecuteJavaScript: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegrationInWorker: true
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  if(isDev) {
    mainWindow.webContents.openDevTools()
  }

  globalShortcut.register('CommandOrControl+Alt+A', async () => {
    let i
    if (!state.working) {
      state.working = true
      mainWindow.webContents.send('running', true)
      i = await spawn(new Worker(workerURL))
      i(state.cps)
    }
    if (globalShortcut.isRegistered('CommandOrControl+Alt+A')) {
      globalShortcut.register('Q', async () => {
        await Thread.terminate(i)
        mainWindow.webContents.send('running', false)
        state.working = false
        globalShortcut.unregister('Q')
      })
    }
  })
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.on('cps', (e, cps) => {
  state.cps = cps
})

app.on('will-quit', () => {
  // Supprime tous les raccourcis.
  globalShortcut.unregisterAll()
})