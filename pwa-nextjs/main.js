const { app, BrowserWindow } = require('electron');
const path = require('path');
const waitOn = require('wait-on');
const { spawn } = require('child_process');

function createWindow() {
  try {
    console.log('🟢 Creating Electron window...');
    const win = new BrowserWindow({
      width: 1280,
      height: 800,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
      },
    });

    // Đợi Next.js server khởi chạy rồi load
    waitOn({ resources: ['http://localhost:3000'] }, () => {
      console.log('🟢 Next.js server is ready, loading URL...');
      win.loadURL('http://localhost:3000');
    });
  } catch (error) {
    console.error('❌ Error creating window:', error);
    app.quit();
  }
}

app.whenReady().then(() => {
  // 🟢 Start Next.js production server
  const serverPath = path.join(__dirname, '.next', 'standalone', 'server.js');
  console.log('🟢 Starting Next.js server from:', serverPath);

  const server = spawn('node', [serverPath], {
    cwd: __dirname,
    stdio: 'inherit',
    env: {
      ...process.env,
      PORT: '3000',
    },
  });

  server.on('error', (err) => {
    console.error('❌ Failed to start server:', err);
  });

  //
  createWindow();
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
