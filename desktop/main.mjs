import { app, BrowserWindow, dialog } from 'electron';
import { resolve } from 'node:path';
import { once } from 'node:events';

app.setName('Souq Supermarket');

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  let mainWindow;
  let server;
  let quitting = false;

  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.whenReady().then(async () => {
    try {
      app.setPath('userData', resolve(app.getPath('appData'), 'Souq Supermarket'));
      process.env.SOUQ_DATA_DIR = app.getPath('userData');
      const service = await import('../server/index.mjs');
      server = service.server;
      service.startServer({ host: '127.0.0.1', port: 0 });
      await once(server, 'listening');
      const { port } = server.address();

      mainWindow = new BrowserWindow({
        width: 1440,
        height: 920,
        minWidth: 850,
        minHeight: 620,
        autoHideMenuBar: true,
        show: false,
        backgroundColor: '#f3f6f7',
        webPreferences: {
          contextIsolation: true,
          nodeIntegration: false,
          sandbox: true,
        },
      });

      const appUrl = `http://127.0.0.1:${port}`;
      mainWindow.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
      mainWindow.webContents.on('will-navigate', (event, url) => {
        if (new URL(url).origin !== appUrl) event.preventDefault();
      });
      mainWindow.once('ready-to-show', () => mainWindow.show());
      mainWindow.on('closed', () => { mainWindow = null; });
      await mainWindow.loadURL(appUrl);
    } catch (error) {
      console.error('Souq desktop startup failed:', error);
      dialog.showErrorBox('Souq could not start', error.message);
      app.quit();
    }
  });

  app.on('before-quit', (event) => {
    if (server?.listening && !quitting) {
      event.preventDefault();
      quitting = true;
      server.close(() => app.quit());
    }
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
}
