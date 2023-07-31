import {
	app,
	BrowserWindow,
	Menu,
	dialog,
	powerMonitor,
} from "electron";
import isDev from "electron-is-dev";
import path from "path";

let mainWindow = {
	show: () => {
		console.log("show");
	},
};
let willQuit = false;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		minWidth: 320,
		height: 600,
		fullscreenable: true,
		backgroundColor: "#403F4D",
		icon: path.join(app.getAppPath(), "assets/png/128x128.png"),
		webPreferences: {
			preload: path.join(app.getAppPath(), "dist/preload/index.cjs"),
		},
	});

	mainWindow.loadURL(
		isDev
			? "http://localhost:5173"
			: new URL("../dist/renderer/index.html", "file://" + __dirname).toString()
	);
}

function menuSetup() {
	const menuTemplate = [
		{
			label: "About",
			submenu: [
				{
					label: "About Team",
					click: () => {
						dialog.showMessageBox(mainWindow, {
							type: "info",
							title: "About",
							message: "Application is built by : ",
							detail:
								"Add more details here about the team and responsibilities",
						});
					},
				},
				{
					type: "separator",
				},
				{
					/* For debugging */
					label: "Dev tools (Debugging)",
					click: () => {
						mainWindow.webContents.openDevTools();
					},
				},
				{
					label: "Quit",
					accelerator: "CommandOrControl+Q",
					click: () => {
						app.quit();
					},
				},
			],
		},
		{
			label: "Edit",
			submenu: [
				{ role: "undo" },
				{ role: "redo" },
				{ role: "cut" },
				{ role: "copy" },
				{ role: "paste" },
				{ role: "delete" },
				{ role: "selectall" },
			],
		},
		{
			label: "View",
			submenu: [
				{
					type: "separator",
				},
				{ role: "reload" },
				{ role: "togglefullscreen" },
				{ role: "minimize" },
				{ role: "close" },
			],
		},
	];
	const menu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(menu);
}

app.on("ready", () => {
	createWindow();
	menuSetup();

	powerMonitor.on("resume", () => {
		mainWindow.reload();
	});

	// On Mac, this will hide the window
	// On Windows, the app will close and quit
	mainWindow.on("close", (e) => {
		if (willQuit || process.platform === "win32") {
			mainWindow = null;
			app.quit();
		} else {
			e.preventDefault();
			mainWindow.hide();
		}
	});
});

app.on("activate", () => mainWindow.show());
app.on("before-quit", () => (willQuit = true));
