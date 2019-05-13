// Modules
const { BrowserWindow } = require('electron')

// browserWindow instance
exports.win

//mainWindow createWindow fn
exports.createWindow = () => {
    this.win = new BrowserWindow({
        width: 500,
        height: 650,
        minWidth: 350,
        maxWidth: 650,
        minHeight: 310,

        webPreferences: {
            nodeIntegration: true,
            webviewTag: true
        }

    })

    // devTools
    this.win.webContents.openDevTools()

    //Load mainWindow content
    this.win.loadURL(`file://${__dirname}/renderer/main.html`)

    //handle window close
    this.win.on('close', () => {
        this.win = null
    })
}