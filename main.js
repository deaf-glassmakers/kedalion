const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow(){
  const win = new BrowserWindow({
    width: 500,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
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

