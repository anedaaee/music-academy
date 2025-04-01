const electron = require('electron')
const { app, BrowserWindow } = electron
const path = require('path')
let win

app.on('ready', () => {
    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

    win = new BrowserWindow({
        width: width,
        height: height,
        fullscreenable: true,
        autoHideMenuBar: true,
        icon: path.join(__dirname, 'icon.png'),
        webPreferences: {
            nodeIntegration: false
        }
    });
    win.setTitle("آموزشگاه موسیقی محجوبی");
    win.loadURL('http://localhost')
})