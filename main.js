
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const sqlite3 = require('sqlite3');

function createMainWindow(){

    const mainWindow = new BrowserWindow(
        {
            width: 800, height:600,
            title: 'Electron'
        }
    );
    
    const startUrl = url.format({
        pathname: path.join(__dirname,'sign_up.html'),
        protocol:'file',
        slashes: true, 
    });
    
    mainWindow.loadURL(startUrl);

    // mainWindow.webContents.openDevTools();
}

app.whenReady().then(createMainWindow);

