const { ipcRenderer } = require('electron');

function ItemMenu() {
    ipcRenderer.send('open-add-item-menu');
}

