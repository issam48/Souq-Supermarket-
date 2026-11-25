import { readFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const databasePath = resolve(process.env.SOUQ_DATA_DIR || resolve(root, 'data'), 'souq.sqlite');
mkdirSync(dirname(databasePath), { recursive: true });

export const db = new DatabaseSync(databasePath);
db.exec('PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL; PRAGMA busy_timeout = 5000;');
db.exec(`CREATE TABLE IF NOT EXISTS schema_migrations (
  version INTEGER PRIMARY KEY,
  applied_at TEXT NOT NULL DEFAULT (datetime('now'))
)`);

if (!db.prepare('SELECT version FROM schema_migrations WHERE version = 1').get()) {
  db.exec('BEGIN IMMEDIATE');
  try {
    db.exec(readFileSync(resolve(root, 'database/schema.sql'), 'utf8'));
    db.prepare('INSERT INTO schema_migrations (version) VALUES (1)').run();
    db.exec('COMMIT');
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
}
db.exec("INSERT OR IGNORE INTO settings (key, value) VALUES ('locale', 'fr'), ('store_name', 'Souq');");

export function transaction(callback) {
  db.exec('BEGIN IMMEDIATE');
  try {
    const result = callback();
    db.exec('COMMIT');
    return result;
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
}
