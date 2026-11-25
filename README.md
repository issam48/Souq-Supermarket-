# Souq — Supermarket management and POS

Local-first supermarket ERP/POS with an SQLite database. The source/development mode requires Node.js 22.14 or newer. The packaged Windows desktop application bundles its own runtime, so the shop computers do not need Node.js installed.

## Install on a Windows shop computer

1. Copy `release/Souq-1.0.0-x64.exe` to the shop computer.
2. Run the installer and finish the setup. It adds a **Souq Supermarket** desktop shortcut.
3. Launch the shortcut. On first run, create the administrator account.

The installer is for 64-bit Windows. It runs offline and does not require Node.js or a browser to be installed separately. This build is unsigned, so Windows may show an unknown-publisher/SmartScreen warning.

The installed app stores its database and backups in `%APPDATA%\Souq Supermarket`. Each computer has its own database; the packaged app does not synchronize data between different computers.

To build or rebuild the installer on a development computer with Node.js 22.14+:

```powershell
npm.cmd install
npm.cmd run dist:win
```

The installer is generated under `release/`.

## Run locally

1. Install Node.js 22.14+.
2. Run `npm.cmd start` from PowerShell (or `npm start` from Command Prompt) in this folder.
3. Open `http://127.0.0.1:4173` in a browser.
4. On first run, create the store's administrator account. There is no seeded/mock business data.

The database is created at `data/souq.sqlite`. Set `SOUQ_DATA_DIR` to move it to a protected location. The service creates one consistent automatic backup per UTC day while running; an administrator can also create a backup from Settings. For a manual file copy, stop the app and include the SQLite WAL/SHM companions if present.

For source/development mode on Windows, double-click `create-desktop-shortcut.vbs` once to add a launcher to the desktop. The packaged installer creates its own desktop shortcut.

## Architecture

- `database/schema.sql`: relational schema, constraints, and indexes.
- `server/db.mjs`: SQLite connection, schema initialization, and transaction helper.
- `server/index.mjs`: local HTTP API, authentication, business transactions, reports, and backups.
- `desktop/main.mjs`: Electron desktop window and in-process local service.
- `desktop/create-icon.mjs`: generates the Windows application icon during packaging.
- `public/`: responsive Arabic/French interface and offline shell.
- `docs/architecture.md`: database relationships, consistency rules, and project structure.

All monetary amounts are stored as integer centimes (1 DZD = 100 centimes); quantities are numeric and stock-changing operations are transactional. Sales, purchases, cash movements, and inventory movements remain auditable.

The local service binds only to loopback. Local authentication uses scrypt password hashes and expiring opaque sessions. Keep the database directory restricted to authorized users; the application is designed for shop workstations, not exposure to the public internet.

## Backups

The app creates a consistent automatic backup per UTC day while running. Use **Settings → Create backup** for an additional timestamped SQLite backup. Keep independent copies on a separate secure storage device.
