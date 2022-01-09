const { app, BrowserWindow } = require('electron')
const path = require('path')

require('electron-reload')(__dirname);
function createWindow(){
  const win = new BrowserWindow({
    width: 500,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
  win.webContents.openDevTools();
  // win.loadURL(`https://cosmoglint.github.io/art_with_javascript/`)
}


app.whenReady().then(() => {
  createWindow()

// for mac systems dont stop the app and let it run on the background. create a new window when the app button is clicked
  app.on('activate', function(){
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


// for windows and linux platforms close the app if none of the windows are oprn
app.on('window.all.closed', function(){
  if (process.platform !== 'darwin') app.quit()
})
