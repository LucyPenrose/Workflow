const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('index.html');
}

let addItemMenuWindow; 

function createAddItemMenuWindow() {
  addItemMenuWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  addItemMenuWindow.loadFile(path.join(__dirname, 'AddItemMenu.html'));

  addItemMenuWindow.on('closed', () => {
    addItemMenuWindow = null;
  });
}

app.whenReady().then(() => {
  createMainWindow();

  ipcMain.on('open-add-item-menu', createAddItemMenuWindow);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
