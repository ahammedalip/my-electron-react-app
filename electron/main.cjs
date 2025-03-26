const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.cjs"), // Preload script for IPC
    },
  });

  mainWindow.loadURL("http://localhost:5173");
}


// Handle silent printing
ipcMain.on("print-text", (event, printContent) => {
  let printWindow = new BrowserWindow({ show: false }); // Hidden print window
  printWindow.loadURL(`data:text/html,<pre>${printContent}</pre>`); // Convert text to HTML

  printWindow.webContents.once("did-finish-load", () => {
    printWindow.webContents.print(
      {
        silent: false, // No print dialog
        printBackground: true, // Ensure background printing
      },
      () => {
        printWindow.close(); // Close print window after printing
      }
    );
  });
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
