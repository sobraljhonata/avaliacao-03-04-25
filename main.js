const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
const qr = require('qr-image');

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 500,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile('index.html');

    // Criar menu personalizado
    const menuTemplate = [
        {
            label: 'Navegação',
            submenu: [
                { label: 'Gerador de QR Code', click: () => mainWindow.loadFile('index.html') },
                { label: 'Sobre', click: () => mainWindow.loadFile('about.html') },
                { type: 'separator' },
                { label: 'Sair', role: 'quit' }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
});

ipcMain.on('generate-qr', (event, url) => {
    if (url.trim() !== '') {
        const qrSvg = qr.imageSync(url, { type: 'svg' });
        event.reply('qr-generated', `data:image/svg+xml;base64,${Buffer.from(qrSvg).toString('base64')}`);
    }
});
