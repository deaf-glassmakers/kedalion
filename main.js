const { Menu, MenuItem, app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

require('electron-reload')(__dirname);

const isMac = process.platform === 'darwin'

const fullmenu = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideOthers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
    // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac ? [
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startSpeaking' },
            { role: 'stopSpeaking' }
          ]
        }
      ] : [
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ])
    ]
  },
    // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ])
    ]
  },
  {
    label: app.name,
    submenu: [
      {
        label: "Diff",
        click: () => {createDiffWindow()},
      },
      {
        label: "Dictionary convertor",
        click: () => {createJsonToPyDictWindow()},
      },
    ],
  },
]


//const kedalionMenu = new MenuItem(kedalionMenuTemplate);
const menu = Menu.buildFromTemplate(fullmenu);
//console.log(Menu.getApplicationMenu())

//const mainmenu = Menu.getApplicationMenu()
//fullmenu = mainmenu.append(kedalionMenu)
Menu.setApplicationMenu(menu)


function createJsonToPyDictWindow(){
  const win = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  })

  win.loadFile('./static/html/dictionary_convertor_py.html')
  //win.webContents.openDevTools();
}

function createDiffWindow(){
  const win = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  })

  win.loadFile('./static/html/diff.html')
  //win.webContents.openDevTools();
  // win.loadURL(`https://cosmoglint.github.io/art_with_javascript/`)
}

function createTestWindow(){
  const win = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  })

  win.loadFile('./static/html/test.html')
  //win.webContents.openDevTools();
  // win.loadURL(`https://cosmoglint.github.io/art_with_javascript/`)
}

app.whenReady().then(() => {
  createTestWindow()

// for mac systems dont stop the app and let it run on the background. create a new window when the app button is clicked
  app.on('activate', function(){
    if (BrowserWindow.getAllWindows().length === 0) createDiffWindow()
  })
})


ipcMain.on('test', function(e, data){
  console.log("tested successfully")
})


// for windows and linux platforms close the app if none of the windows are oprn
app.on('window.all.closed', function(){
  if (process.platform !== 'darwin') app.quit()
})
