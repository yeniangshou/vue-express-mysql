const {app, BrowserWindow, ipcMain} = require('electron');
const isDev = require("electron-is-dev");
const path = require('path');

function createWindow () {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration:true, // 可使用node开发API;
        contextIsolation: false, // 可使用require;
      }
    })
  
    // and load the index.html of the app.
    // mainWindow.loadFile('index.html')
    const url = isDev ? "http://localhost:3000":'zanding'
    mainWindow.loadURL(url);
  
    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
  }

  app.whenReady().then(() => {
    createWindow()

})