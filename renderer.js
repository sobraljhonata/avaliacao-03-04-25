const { ipcRenderer } = require('electron');

document.getElementById('generateBtn').addEventListener('click', () => {
    const url = document.getElementById('urlInput').value;
    ipcRenderer.send('generate-qr', url);
});

ipcRenderer.on('qr-generated', (event, qrData) => {
    const img = document.getElementById('qrCode');
    img.src = qrData;
    img.style.display = 'block';
});
