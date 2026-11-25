import { createHash, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { createReadStream, existsSync } from 'node:fs';
import { mkdir, readdir } from 'node:fs/promises';
import { createServer } from 'node:http';
import { basename, dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { backup } from 'node:sqlite';
import { db, databasePath, transaction } from './db.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const publicRoot = resolve(root, 'public');
const mimeTypes = { '.css': 'text/css; charset=utf-8', '.html': 'text/html; charset=utf-8', '.ico': 'image/x-icon', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.webmanifest': 'application/manifest+json' };

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const fail = (status, message) => { throw new HttpError(status, message); };
const money = (value) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) fail(400, 'Enter a valid non-negative amount.');
  const cents = Math.round(parsed * 100);
  if (!Number.isSafeInteger(cents)) fail(400, 'Amount is too large.');
  return cents;
};
const quantity = (value, allowNegative = false) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || (!allowNegative && parsed <= 0) || (allowNegative && parsed === 0)) fail(400, 'Enter a valid quantity.');
  const result = Math.round(parsed * 1000) / 1000;
  if (!Number.isSafeInteger(Math.round(result * 1000))) fail(400, 'Quantity is too large.');
  return result;
};
const validDate = (value) => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
};
const optionalDate = (value) => {
  const date = cleanText(value, 'Date', 10);
  if (date && !validDate(date)) fail(400, 'Enter a valid date in YYYY-MM-DD format.');
  return date;
};
const numberId = (value) => {
  const id = Number(value);
  if (!Number.isSafeInteger(id) || id < 1) fail(400, 'Invalid record ID.');
  return id;
};
const cleanText = (value, field, max = 180, required = false) => {
  const result = String(value ?? '').trim();
  if (required && !result) fail(400, `${field} is required.`);
  if (result.length > max) fail(400, `${field} is too long.`);
  return result || null;
};
const audit = (userId, action, entity, entityId, details = null) => db.prepare(
  'INSERT INTO audit_log (user_id, action, entity, entity_id, details) VALUES (?, ?, ?, ?, ?)',
).run(userId || null, action, entity, entityId == null ? null : String(entityId), details ? JSON.stringify(details) : null);
const getSettings = () => Object.fromEntries(db.prepare('SELECT key, value FROM settings').all().map(({ key, value }) => [key, value]));
const activeCashSession = () => db.prepare('SELECT * FROM cash_sessions WHERE closed_at IS NULL ORDER BY id DESC LIMIT 1').get();
const addCashMovement = (userId, source, reference, amount) => {
  const session = activeCashSession();
  if (!session) fail(409, 'Open a cash register before recording a cash movement.');
  db.prepare('INSERT INTO cash_movements (cash_session_id, user_id, source, reference, amount) VALUES (?, ?, ?, ?, ?)')
    .run(session.id, userId, source, reference == null ? null : String(reference), amount);
  return session.id;
};
async function createBackupFile(automatic = false) {
  const backupDir = resolve(dirname(databasePath), 'backups');
  await mkdir(backupDir, { recursive: true });
  const day = new Date().toISOString().slice(0, 10);
  if (automatic) {
    const dailyFile = resolve(backupDir, `souq-auto-${day}.sqlite`);
    if (existsSync(dailyFile)) return basename(dailyFile);
    await backup(db, dailyFile);
    return basename(dailyFile);
  }
  const file = resolve(backupDir, `souq-${new Date().toISOString().replace(/[:.]/g, '-')}.sqlite`);
  await backup(db, file);
  return basename(file);
}

function hashPassword(password, salt = randomBytes(16).toString('hex')) {
  return `${salt}:${scryptSync(password, salt, 64).toString('hex')}`;
}
function verifyPassword(password, storedHash) {
  const [salt, expectedHex] = storedHash.split(':');
  if (!salt || !expectedHex) return false;
  const expected = Buffer.from(expectedHex, 'hex');
  const actual = scryptSync(password, salt, expected.length);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
const hashToken = (token) => createHash('sha256').update(token).digest('hex');
function sessionUser(req) {
  const token = req.headers.cookie?.split(';').map((part) => part.trim()).find((part) => part.startsWith('souq_session='))?.slice('souq_session='.length);
  if (!token) fail(401, 'Please sign in.');
  const row = db.prepare(`SELECT u.id, u.username, u.role
    FROM sessions s JOIN users u ON u.id = s.user_id
    WHERE s.token_hash = ? AND s.expires_at > datetime('now') AND u.active = 1`).get(hashToken(decodeURIComponent(token)));
  if (!row) fail(401, 'Your session expired. Please sign in again.');
  return row;
}
function requireRole(user, roles) {
  if (!roles.includes(user.role)) fail(403, 'You do not have permission to perform this action.');
}
function bodyJson(req) {
  return new Promise((resolveBody, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > 1024 * 1024) reject(new HttpError(413, 'Request is too large.'));
    });
    req.on('end', () => {
      if (!data) return resolveBody({});
      try {
        const parsed = JSON.parse(data);
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return reject(new HttpError(400, 'Request body must be a JSON object.'));
        resolveBody(parsed);
      } catch { reject(new HttpError(400, 'Request body must be valid JSON.')); }
    });
    req.on('error', reject);
  });
}
function json(res, status, value, headers = {}) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers });
  res.end(JSON.stringify(value));
}
function cashCookie(token, maxAge) {
  return `souq_session=${encodeURIComponent(token)}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAge}`;
}
async function handleApi(req, res, url) {
  const path = url.pathname;
  const method = req.method;
  if (method === 'GET' && path === '/api/status') return json(res, 200, { setupRequired: !db.prepare('SELECT id FROM users LIMIT 1').get() });

  if (method === 'POST' && path === '/api/setup') {
    const data = await bodyJson(req);
    if (db.prepare('SELECT id FROM users LIMIT 1').get()) fail(409, 'The administrator account has already been created.');
    const username = cleanText(data.username, 'Username', 48, true);
    const password = String(data.password || '');
    if (!/^[\p{L}\p{N}_.-]{3,48}$/u.test(username)) fail(400, 'Username must be 3–48 letters, numbers, dots, dashes, or underscores.');
    if (password.length < 12 || password.length > 256) fail(400, 'Use an administrator password with at least 12 characters.');
    const userId = transaction(() => {
      const result = db.prepare('INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)').run(username, hashPassword(password), 'admin');
      audit(Number(result.lastInsertRowid), 'initialize', 'user', result.lastInsertRowid);
      return Number(result.lastInsertRowid);
    });
    const token = randomBytes(32).toString('base64url');
    db.prepare("INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, datetime('now', '+12 hours'))").run(hashToken(token), userId);
    return json(res, 201, { user: { id: userId, username, role: 'admin' } }, { 'Set-Cookie': cashCookie(token, 43200) });
  }

  if (method === 'POST' && path === '/api/login') {
    const data = await bodyJson(req);
    const user = db.prepare('SELECT id, username, password_hash, role FROM users WHERE username = ? COLLATE NOCASE AND active = 1').get(String(data.username || '').trim());
    const password = String(data.password || '');
    if (!user || !verifyPassword(password, user.password_hash)) fail(401, 'Incorrect username or password.');
    const token = randomBytes(32).toString('base64url');
    db.prepare("INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, datetime('now', '+12 hours'))").run(hashToken(token), user.id);
    return json(res, 200, { user: { id: user.id, username: user.username, role: user.role } }, { 'Set-Cookie': cashCookie(token, 43200) });
  }

  if (method === 'POST' && path === '/api/logout') {
    const token = req.headers.cookie?.split(';').map((part) => part.trim()).find((part) => part.startsWith('souq_session='))?.slice('souq_session='.length);
    if (token) db.prepare('DELETE FROM sessions WHERE token_hash = ?').run(hashToken(decodeURIComponent(token)));
    return json(res, 200, { ok: true }, { 'Set-Cookie': cashCookie('', 0) });
  }

  const user = sessionUser(req);
  if (method === 'GET' && path === '/api/me') return json(res, 200, { user, settings: getSettings() });

  if (method === 'GET' && path === '/api/settings') return json(res, 200, getSettings());
  if (method === 'PUT' && path === '/api/settings') {
    requireRole(user, ['admin', 'manager']);
    const data = await bodyJson(req);
    if (data.locale && !['fr', 'ar'].includes(data.locale)) fail(400, 'Choose Arabic or French.');
    const storeName = cleanText(data.store_name, 'Store name', 100);
    if (storeName) db.prepare("INSERT INTO settings (key, value) VALUES ('store_name', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value").run(storeName);
    if (data.locale) db.prepare("INSERT INTO settings (key, value) VALUES ('locale', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value").run(data.locale);
    audit(user.id, 'update', 'settings', null, { locale: data.locale, store_name: storeName });
    return json(res, 200, getSettings());
  }

  if (method === 'GET' && path === '/api/users') {
    requireRole(user, ['admin']);
    return json(res, 200, db.prepare('SELECT id, username, role, active, created_at FROM users ORDER BY id').all());
  }
  if (method === 'POST' && path === '/api/users') {
    requireRole(user, ['admin']);
    const data = await bodyJson(req);
    const username = cleanText(data.username, 'Username', 48, true);
    const password = String(data.password || '');
    const role = String(data.role || '');
    if (!/^[\p{L}\p{N}_.-]{3,48}$/u.test(username)) fail(400, 'Username must be 3–48 letters, numbers, dots, dashes, or underscores.');
    if (password.length < 12 || password.length > 256) fail(400, 'Use a password with at least 12 characters.');
    if (!['admin', 'manager', 'cashier'].includes(role)) fail(400, 'Choose a valid user role.');
    const result = db.prepare('INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)').run(username, hashPassword(password), role);
    audit(user.id, 'create', 'user', result.lastInsertRowid, { username, role });
    return json(res, 201, { id: Number(result.lastInsertRowid), username, role });
  }
  const userMatch = path.match(/^\/api\/users\/(\d+)$/);
  if (method === 'PATCH' && userMatch) {
    requireRole(user, ['admin']);
    const id = numberId(userMatch[1]);
    if (id === user.id) fail(400, 'You cannot deactivate your own account.');
    const result = db.prepare('UPDATE users SET active = 0 WHERE id = ?').run(id);
    if (!result.changes) fail(404, 'User not found.');
    db.prepare('DELETE FROM sessions WHERE user_id = ?').run(id);
    audit(user.id, 'deactivate', 'user', id);
    return json(res, 200, { ok: true });
  }

  if (method === 'GET' && path === '/api/categories') return json(res, 200, db.prepare('SELECT * FROM categories ORDER BY name').all());
  if (method === 'POST' && path === '/api/categories') {
    requireRole(user, ['admin', 'manager']);
    const data = await bodyJson(req);
    const name = cleanText(data.name, 'Category name', 80, true);
    return json(res, 201, { id: Number(db.prepare('INSERT INTO categories (name) VALUES (?)').run(name).lastInsertRowid), name });
  }

  if (method === 'GET' && path === '/api/products') {
    const search = `%${String(url.searchParams.get('search') || '').trim().replace(/[%_]/g, '\\$&')}%`;
    const lowOnly = url.searchParams.get('low') === '1';
    const expired = url.searchParams.get('expired') === '1';
    const rows = db.prepare(`SELECT p.*, c.name AS category_name FROM products p
      LEFT JOIN categories c ON c.id = p.category_id
      WHERE p.active = 1 AND (p.name LIKE ? ESCAPE '\\' OR COALESCE(p.barcode, '') LIKE ? ESCAPE '\\' OR COALESCE(p.sku, '') LIKE ? ESCAPE '\\')
      AND (? = 0 OR p.stock <= p.minimum_stock)
      AND (? = 0 OR (p.expiry_date IS NOT NULL AND p.expiry_date <= date('now', '+30 days')))
      ORDER BY p.name LIMIT 500`).all(search, search, search, Number(lowOnly), Number(expired));
    return json(res, 200, rows);
  }
  if (method === 'POST' && path === '/api/products') {
    requireRole(user, ['admin', 'manager']);
    const data = await bodyJson(req);
    const name = cleanText(data.name, 'Product name', 160, true);
    const barcode = cleanText(data.barcode, 'Barcode', 80);
    const sku = cleanText(data.sku, 'SKU', 80);
    const categoryId = data.category_id ? numberId(data.category_id) : null;
    const purchasePrice = money(data.purchase_price || 0);
    const sellingPrice = money(data.selling_price);
    const stock = Math.round(Number(data.stock ?? 0) * 1000) / 1000;
    if (!Number.isFinite(stock) || stock < 0) fail(400, 'Stock cannot be negative.');
    const minimumStock = Number(data.minimum_stock || 0);
    if (!Number.isFinite(minimumStock) || minimumStock < 0) fail(400, 'Minimum stock cannot be negative.');
    if (categoryId && !db.prepare('SELECT id FROM categories WHERE id = ?').get(categoryId)) fail(404, 'Category not found.');
    const id = transaction(() => {
      const result = db.prepare(`INSERT INTO products
        (name, barcode, sku, category_id, purchase_price, selling_price, stock, minimum_stock, unit, variation, expiry_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(
        name, barcode, sku, categoryId, purchasePrice, sellingPrice, stock, minimumStock,
        cleanText(data.unit || 'piece', 'Unit', 30, true), cleanText(data.variation, 'Variation', 100),
        optionalDate(data.expiry_date),
      );
      if (stock > 0) db.prepare(`INSERT INTO stock_movements (product_id, user_id, movement_type, quantity, reference, note)
        VALUES (?, ?, 'adjustment', ?, ?, 'Opening stock')`).run(result.lastInsertRowid, user.id, stock, 'opening');
      audit(user.id, 'create', 'product', result.lastInsertRowid);
      return Number(result.lastInsertRowid);
    });
    return json(res, 201, db.prepare('SELECT * FROM products WHERE id = ?').get(id));
  }
  const productMatch = path.match(/^\/api\/products\/(\d+)$/);
  if (method === 'PUT' && productMatch) {
    requireRole(user, ['admin', 'manager']);
    const id = numberId(productMatch[1]);
    const data = await bodyJson(req);
    const old = db.prepare('SELECT * FROM products WHERE id = ? AND active = 1').get(id);
    if (!old) fail(404, 'Product not found.');
    const name = cleanText(data.name, 'Product name', 160, true);
    const purchasePrice = money(data.purchase_price);
    const sellingPrice = money(data.selling_price);
    const minimumStock = Number(data.minimum_stock);
    if (!Number.isFinite(minimumStock) || minimumStock < 0) fail(400, 'Minimum stock cannot be negative.');
    const categoryId = data.category_id ? numberId(data.category_id) : null;
    if (categoryId && !db.prepare('SELECT id FROM categories WHERE id = ?').get(categoryId)) fail(404, 'Category not found.');
    db.prepare(`UPDATE products SET name = ?, barcode = ?, sku = ?, category_id = ?, purchase_price = ?, selling_price = ?,
      minimum_stock = ?, unit = ?, variation = ?, expiry_date = ?, updated_at = datetime('now') WHERE id = ?`).run(
      name, cleanText(data.barcode, 'Barcode', 80), cleanText(data.sku, 'SKU', 80),
      categoryId, purchasePrice, sellingPrice, minimumStock,
      cleanText(data.unit, 'Unit', 30, true), cleanText(data.variation, 'Variation', 100),
      optionalDate(data.expiry_date), id,
    );
    audit(user.id, 'update', 'product', id);
    return json(res, 200, db.prepare('SELECT * FROM products WHERE id = ?').get(id));
  }
  if (method === 'DELETE' && productMatch) {
    requireRole(user, ['admin', 'manager']);
    const id = numberId(productMatch[1]);
    const result = db.prepare(`UPDATE products SET active = 0, updated_at = datetime('now') WHERE id = ? AND active = 1`).run(id);
    if (!result.changes) fail(404, 'Product not found.');
    audit(user.id, 'archive', 'product', id);
    return json(res, 200, { ok: true });
  }

  if (method === 'GET' && path === '/api/inventory/movements') {
    const rows = db.prepare(`SELECT m.*, p.name AS product_name, u.username FROM stock_movements m
      JOIN products p ON p.id = m.product_id JOIN users u ON u.id = m.user_id ORDER BY m.id DESC LIMIT 300`).all();
    return json(res, 200, rows);
  }
  if (method === 'POST' && path === '/api/inventory/adjustments') {
    requireRole(user, ['admin', 'manager']);
    const data = await bodyJson(req);
    const id = numberId(data.product_id);
    const delta = quantity(data.delta, true);
    const note = cleanText(data.note, 'Reason', 200, true);
    transaction(() => {
      const product = db.prepare('SELECT stock FROM products WHERE id = ? AND active = 1').get(id);
      if (!product) fail(404, 'Product not found.');
      if (product.stock + delta < 0) fail(409, 'Adjustment would make stock negative.');
      db.prepare(`UPDATE products SET stock = stock + ?, updated_at = datetime('now') WHERE id = ?`).run(delta, id);
      db.prepare(`INSERT INTO stock_movements (product_id, user_id, movement_type, quantity, reference, note)
        VALUES (?, ?, 'adjustment', ?, 'manual', ?)`).run(id, user.id, delta, note);
      audit(user.id, 'adjust', 'inventory', id, { delta, note });
    });
    return json(res, 200, { ok: true });
  }

  if (method === 'GET' && path === '/api/suppliers') return json(res, 200, db.prepare(`SELECT s.*,
    COALESCE((SELECT SUM(total) FROM purchases p WHERE p.supplier_id = s.id), 0) -
    COALESCE((SELECT SUM(amount) FROM supplier_payments sp WHERE sp.supplier_id = s.id), 0) AS balance
    FROM suppliers s WHERE s.active = 1 ORDER BY s.name`).all());
  if (method === 'POST' && path === '/api/suppliers') {
    requireRole(user, ['admin', 'manager']);
    const data = await bodyJson(req);
    const name = cleanText(data.name, 'Supplier name', 160, true);
    const result = db.prepare('INSERT INTO suppliers (name, phone, email, address) VALUES (?, ?, ?, ?)').run(name,
      cleanText(data.phone, 'Phone', 40), cleanText(data.email, 'Email', 120), cleanText(data.address, 'Address', 240));
    audit(user.id, 'create', 'supplier', result.lastInsertRowid);
    return json(res, 201, { id: Number(result.lastInsertRowid), name });
  }
  const supplierMatch = path.match(/^\/api\/suppliers\/(\d+)$/);
  if (method === 'PUT' && supplierMatch) {
    requireRole(user, ['admin', 'manager']);
    const id = numberId(supplierMatch[1]);
    const data = await bodyJson(req);
    const name = cleanText(data.name, 'Supplier name', 160, true);
    const result = db.prepare('UPDATE suppliers SET name = ?, phone = ?, email = ?, address = ? WHERE id = ? AND active = 1').run(
      name, cleanText(data.phone, 'Phone', 40), cleanText(data.email, 'Email', 120), cleanText(data.address, 'Address', 240), id,
    );
    if (!result.changes) fail(404, 'Supplier not found.');
    audit(user.id, 'update', 'supplier', id);
    return json(res, 200, db.prepare('SELECT * FROM suppliers WHERE id = ?').get(id));
  }
  if (method === 'DELETE' && supplierMatch) {
    requireRole(user, ['admin', 'manager']);
    const id = numberId(supplierMatch[1]);
    const balance = db.prepare(`SELECT COALESCE((SELECT SUM(total) FROM purchases WHERE supplier_id = ?), 0) -
      COALESCE((SELECT SUM(amount) FROM supplier_payments WHERE supplier_id = ?), 0) AS balance`).get(id, id).balance;
    if (balance !== 0) fail(409, 'Settle the supplier balance before archiving this supplier.');
    const result = db.prepare('UPDATE suppliers SET active = 0 WHERE id = ? AND active = 1').run(id);
    if (!result.changes) fail(404, 'Supplier not found.');
    audit(user.id, 'archive', 'supplier', id);
    return json(res, 200, { ok: true });
  }
  if (method === 'GET' && path === '/api/customers') return json(res, 200, db.prepare(`SELECT c.*,
    COALESCE((SELECT SUM(total) FROM sales s WHERE s.customer_id = c.id AND s.status NOT IN ('void', 'refunded')), 0) -
    COALESCE((SELECT SUM(amount) FROM sale_payments sp JOIN sales s ON s.id = sp.sale_id WHERE s.customer_id = c.id AND s.status NOT IN ('void', 'refunded')), 0) -
    COALESCE((SELECT SUM(amount) FROM customer_payments cp WHERE cp.customer_id = c.id), 0) AS balance
    FROM customers c WHERE c.active = 1 ORDER BY c.name`).all());
  if (method === 'POST' && path === '/api/customers') {
    requireRole(user, ['admin', 'manager', 'cashier']);
    const data = await bodyJson(req);
    const name = cleanText(data.name, 'Customer name', 160, true);
    const result = db.prepare('INSERT INTO customers (name, phone, email, address) VALUES (?, ?, ?, ?)').run(name,
      cleanText(data.phone, 'Phone', 40), cleanText(data.email, 'Email', 120), cleanText(data.address, 'Address', 240));
    audit(user.id, 'create', 'customer', result.lastInsertRowid);
    return json(res, 201, { id: Number(result.lastInsertRowid), name });
  }
  const customerMatch = path.match(/^\/api\/customers\/(\d+)$/);
  if (method === 'PUT' && customerMatch) {
    requireRole(user, ['admin', 'manager', 'cashier']);
    const id = numberId(customerMatch[1]);
    const data = await bodyJson(req);
    const name = cleanText(data.name, 'Customer name', 160, true);
    const result = db.prepare('UPDATE customers SET name = ?, phone = ?, email = ?, address = ? WHERE id = ? AND active = 1').run(
      name, cleanText(data.phone, 'Phone', 40), cleanText(data.email, 'Email', 120), cleanText(data.address, 'Address', 240), id,
    );
    if (!result.changes) fail(404, 'Customer not found.');
    audit(user.id, 'update', 'customer', id);
    return json(res, 200, db.prepare('SELECT * FROM customers WHERE id = ?').get(id));
  }
  if (method === 'DELETE' && customerMatch) {
    requireRole(user, ['admin', 'manager']);
    const id = numberId(customerMatch[1]);
    const balance = db.prepare(`SELECT
      COALESCE((SELECT SUM(total) FROM sales WHERE customer_id = ? AND status NOT IN ('void','refunded')), 0) -
      COALESCE((SELECT SUM(amount) FROM sale_payments sp JOIN sales s ON s.id=sp.sale_id WHERE s.customer_id = ? AND s.status NOT IN ('void','refunded')), 0) -
      COALESCE((SELECT SUM(amount) FROM customer_payments WHERE customer_id = ?), 0) AS balance`).get(id, id, id).balance;
    if (balance !== 0) fail(409, 'Settle the customer balance before archiving this customer.');
    const result = db.prepare('UPDATE customers SET active = 0 WHERE id = ? AND active = 1').run(id);
    if (!result.changes) fail(404, 'Customer not found.');
    audit(user.id, 'archive', 'customer', id);
    return json(res, 200, { ok: true });
  }
  if (method === 'POST' && path === '/api/customers/payment') {
    const data = await bodyJson(req);
    const customerId = numberId(data.customer_id);
    const amount = money(data.amount);
    if (!amount) fail(400, 'Payment amount must be greater than zero.');
    if (!['cash', 'card', 'transfer'].includes(data.method)) fail(400, 'Choose cash, card, or transfer.');
    transaction(() => {
      const customer = db.prepare('SELECT id FROM customers WHERE id = ? AND active = 1').get(customerId);
      if (!customer) fail(404, 'Customer not found.');
      const balance = db.prepare(`SELECT
        COALESCE((SELECT SUM(total) FROM sales WHERE customer_id = ? AND status NOT IN ('void', 'refunded')), 0) -
        COALESCE((SELECT SUM(amount) FROM sale_payments sp JOIN sales s ON s.id = sp.sale_id WHERE s.customer_id = ? AND s.status NOT IN ('void', 'refunded')), 0) -
        COALESCE((SELECT SUM(amount) FROM customer_payments WHERE customer_id = ?), 0) AS balance`).get(customerId, customerId, customerId).balance;
      if (amount > balance) fail(400, 'Payment cannot exceed the customer balance.');
      db.prepare('INSERT INTO customer_payments (customer_id, user_id, method, amount) VALUES (?, ?, ?, ?)').run(customerId, user.id, data.method, amount);
      if (data.method === 'cash') addCashMovement(user.id, 'customer-payment', customerId, amount);
      audit(user.id, 'payment', 'customer', customerId, { amount, method: data.method });
    });
    return json(res, 201, { ok: true });
  }

  if (method === 'GET' && path === '/api/purchases') return json(res, 200, db.prepare(`SELECT p.*, s.name AS supplier_name,
    COALESCE((SELECT SUM(amount) FROM supplier_payments sp WHERE sp.purchase_id = p.id), 0) AS paid
    FROM purchases p JOIN suppliers s ON s.id = p.supplier_id ORDER BY p.id DESC LIMIT 300`).all());
  if (method === 'POST' && path === '/api/purchases') {
    requireRole(user, ['admin', 'manager']);
    const data = await bodyJson(req);
    const supplierId = numberId(data.supplier_id);
    const invoice = cleanText(data.invoice_number, 'Invoice number', 80, true);
    if (!Array.isArray(data.items) || !data.items.length || data.items.length > 200) fail(400, 'Add 1–200 products to the purchase.');
    if (data.items.some((item) => !item || typeof item !== 'object' || Array.isArray(item))) fail(400, 'Enter valid purchase lines.');
    const items = data.items.map((item) => ({ productId: numberId(item.product_id), quantity: quantity(item.quantity), unitCost: money(item.unit_cost) }));
    const total = items.reduce((sum, item) => sum + Math.round(item.quantity * item.unitCost), 0);
    const initialPayment = money(data.initial_payment || 0);
    if (initialPayment > total) fail(400, 'Initial payment cannot exceed invoice total.');
    const purchaseId = transaction(() => {
      if (!db.prepare('SELECT id FROM suppliers WHERE id = ? AND active = 1').get(supplierId)) fail(404, 'Supplier not found.');
      const status = initialPayment === total ? 'paid' : initialPayment > 0 ? 'partial' : 'unpaid';
      const result = db.prepare('INSERT INTO purchases (invoice_number, supplier_id, user_id, total, status) VALUES (?, ?, ?, ?, ?)')
        .run(invoice, supplierId, user.id, total, status);
      const id = Number(result.lastInsertRowid);
      for (const item of items) {
        const product = db.prepare('SELECT id FROM products WHERE id = ? AND active = 1').get(item.productId);
        if (!product) fail(404, `Product ${item.productId} was not found.`);
        const lineTotal = Math.round(item.quantity * item.unitCost);
        db.prepare('INSERT INTO purchase_items (purchase_id, product_id, quantity, unit_cost, line_total) VALUES (?, ?, ?, ?, ?)')
          .run(id, item.productId, item.quantity, item.unitCost, lineTotal);
        db.prepare(`UPDATE products SET stock = stock + ?, purchase_price = ?, updated_at = datetime('now') WHERE id = ?`)
          .run(item.quantity, item.unitCost, item.productId);
        db.prepare(`INSERT INTO stock_movements (product_id, user_id, movement_type, quantity, reference)
          VALUES (?, ?, 'purchase', ?, ?)`).run(item.productId, user.id, item.quantity, invoice);
      }
      if (initialPayment > 0) {
        if (!['cash', 'card', 'transfer'].includes(data.payment_method || 'cash')) fail(400, 'Choose cash, card, or transfer.');
        db.prepare('INSERT INTO supplier_payments (supplier_id, purchase_id, user_id, method, amount) VALUES (?, ?, ?, ?, ?)')
          .run(supplierId, id, user.id, data.payment_method || 'cash', initialPayment);
        if ((data.payment_method || 'cash') === 'cash') addCashMovement(user.id, 'supplier-payment', id, -initialPayment);
      }
      audit(user.id, 'create', 'purchase', id, { invoice, total });
      return id;
    });
    return json(res, 201, db.prepare('SELECT * FROM purchases WHERE id = ?').get(purchaseId));
  }
  if (method === 'POST' && path === '/api/suppliers/payment') {
    requireRole(user, ['admin', 'manager']);
    const data = await bodyJson(req);
    const supplierId = numberId(data.supplier_id);
    const amount = money(data.amount);
    if (!amount) fail(400, 'Payment amount must be greater than zero.');
    const methodName = String(data.method || '');
    if (!['cash', 'card', 'transfer'].includes(methodName)) fail(400, 'Choose cash, card, or transfer.');
    transaction(() => {
      if (!db.prepare('SELECT id FROM suppliers WHERE id = ? AND active = 1').get(supplierId)) fail(404, 'Supplier not found.');
      const balance = db.prepare(`SELECT COALESCE((SELECT SUM(total) FROM purchases WHERE supplier_id = ?), 0) -
        COALESCE((SELECT SUM(amount) FROM supplier_payments WHERE supplier_id = ?), 0) AS balance`).get(supplierId, supplierId).balance;
      if (amount > balance) fail(400, 'Payment cannot exceed the supplier balance.');
      let remaining = amount;
      const invoices = db.prepare(`SELECT p.id, p.total,
        p.total - COALESCE((SELECT SUM(amount) FROM supplier_payments WHERE purchase_id = p.id), 0) AS due
        FROM purchases p WHERE p.supplier_id = ? AND p.status != 'paid' ORDER BY p.id`).all(supplierId);
      for (const invoice of invoices) {
        if (remaining <= 0) break;
        const allocation = Math.min(remaining, invoice.due);
        if (allocation <= 0) continue;
        db.prepare('INSERT INTO supplier_payments (supplier_id, purchase_id, user_id, method, amount) VALUES (?, ?, ?, ?, ?)')
          .run(supplierId, invoice.id, user.id, methodName, allocation);
        const invoicePaid = invoice.total - (invoice.due - allocation);
        const invoiceStatus = invoicePaid >= invoice.total ? 'paid' : 'partial';
        db.prepare('UPDATE purchases SET status = ? WHERE id = ?').run(invoiceStatus, invoice.id);
        remaining -= allocation;
      }
      if (remaining > 0) fail(409, 'Supplier balance changed. Refresh and retry the payment.');
      if (methodName === 'cash') addCashMovement(user.id, 'supplier-payment', supplierId, -amount);
      audit(user.id, 'payment', 'supplier', supplierId, { amount, method: methodName });
    });
    return json(res, 201, { ok: true });
  }

  if (method === 'GET' && path === '/api/sales') return json(res, 200, db.prepare(`SELECT s.*, u.username,
    c.name AS customer_name, COALESCE((SELECT SUM(amount) FROM sale_payments sp WHERE sp.sale_id = s.id), 0) AS paid
    FROM sales s JOIN users u ON u.id = s.user_id LEFT JOIN customers c ON c.id = s.customer_id ORDER BY s.id DESC LIMIT 300`).all());
  if (method === 'POST' && path === '/api/sales') {
    const data = await bodyJson(req);
    if (!Array.isArray(data.items) || !data.items.length || data.items.length > 200) fail(400, 'Add 1–200 products to the cart.');
    if (data.items.some((item) => !item || typeof item !== 'object' || Array.isArray(item))) fail(400, 'Enter valid cart lines.');
    const combined = new Map();
    for (const item of data.items) {
      const productId = numberId(item.product_id);
      combined.set(productId, (combined.get(productId) || 0) + quantity(item.quantity));
    }
    const items = [...combined].map(([productId, amount]) => ({ productId, quantity: Math.round(amount * 1000) / 1000 }));
    const discount = money(data.discount || 0);
    if (data.payments !== undefined && !Array.isArray(data.payments)) fail(400, 'Payments must be provided as a list.');
    if ((data.payments || []).length > 20) fail(400, 'A sale can have at most 20 payment entries.');
    const payments = (data.payments || []).map((payment) => {
      if (!payment || typeof payment !== 'object') fail(400, 'Enter a valid payment.');
      const amountValue = Number(payment.amount);
      if (!Number.isFinite(amountValue) || amountValue < 0) fail(400, 'Enter a valid payment amount.');
      if (!amountValue) return null;
      if (!['cash', 'card', 'transfer'].includes(payment.method)) fail(400, 'Choose cash, card, or transfer for each payment.');
      return { method: payment.method, amount: money(amountValue) };
    }).filter(Boolean);
    const paid = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const customerId = data.customer_id ? numberId(data.customer_id) : null;
    const result = transaction(() => {
      const resolved = items.map((item) => {
        const product = db.prepare('SELECT * FROM products WHERE id = ? AND active = 1').get(item.productId);
        if (!product) fail(404, `Product ${item.productId} was not found.`);
        if (product.stock < item.quantity) fail(409, `Not enough stock for ${product.name}.`);
        return { ...item, product, lineTotal: Math.round(item.quantity * product.selling_price) };
      });
      const subtotal = resolved.reduce((sum, item) => sum + item.lineTotal, 0);
      if (discount > subtotal) fail(400, 'Discount cannot exceed the subtotal.');
      const total = subtotal - discount;
      if (paid > total) fail(400, 'Payments cannot exceed the sale total.');
      if (paid < total && !customerId) fail(400, 'Select a customer to record an unpaid balance.');
      if (customerId && !db.prepare('SELECT id FROM customers WHERE id = ? AND active = 1').get(customerId)) fail(404, 'Customer not found.');
      if (payments.some((payment) => payment.method === 'cash') && !activeCashSession()) fail(409, 'Open the cash register before accepting cash.');
      const cashSessionId = activeCashSession()?.id || null;
      const receipt = `S-${new Date().toISOString().replace(/\D/g, '').slice(0, 14)}-${randomBytes(2).toString('hex').toUpperCase()}`;
      const sale = db.prepare(`INSERT INTO sales (receipt_number, user_id, customer_id, cash_session_id, subtotal, discount, total, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).run(receipt, user.id, customerId, cashSessionId, subtotal, discount, total, paid === total ? 'paid' : 'partial');
      const saleId = Number(sale.lastInsertRowid);
      for (const item of resolved) {
        db.prepare(`INSERT INTO sale_items (sale_id, product_id, product_name, quantity, unit_price, unit_cost, line_total, discount)
          VALUES (?, ?, ?, ?, ?, ?, ?, 0)`).run(saleId, item.product.id, item.product.name, item.quantity, item.product.selling_price, item.product.purchase_price, item.lineTotal);
        db.prepare(`UPDATE products SET stock = stock - ?, updated_at = datetime('now') WHERE id = ?`).run(item.quantity, item.product.id);
        db.prepare(`INSERT INTO stock_movements (product_id, user_id, movement_type, quantity, reference)
          VALUES (?, ?, 'sale', ?, ?)`).run(item.product.id, user.id, -item.quantity, receipt);
      }
      for (const payment of payments) {
        db.prepare('INSERT INTO sale_payments (sale_id, method, amount) VALUES (?, ?, ?)').run(saleId, payment.method, payment.amount);
        if (payment.method === 'cash') addCashMovement(user.id, 'sale', receipt, payment.amount);
      }
      audit(user.id, 'create', 'sale', saleId, { receipt, total, paid });
      return { saleId, receipt };
    });
    return json(res, 201, {
      ...result,
      sale: db.prepare('SELECT * FROM sales WHERE id = ?').get(result.saleId),
      items: db.prepare('SELECT * FROM sale_items WHERE sale_id = ?').all(result.saleId),
    });
  }
  const saleItemsMatch = path.match(/^\/api\/sales\/(\d+)\/items$/);
  if (method === 'GET' && saleItemsMatch) {
    const id = numberId(saleItemsMatch[1]);
    if (!db.prepare('SELECT id FROM sales WHERE id = ?').get(id)) fail(404, 'Sale not found.');
    return json(res, 200, db.prepare('SELECT * FROM sale_items WHERE sale_id = ?').all(id));
  }
  const saleAction = path.match(/^\/api\/sales\/(\d+)\/(refund|cancel)$/);
  if (method === 'POST' && saleAction) {
    const id = numberId(saleAction[1]);
    const action = saleAction[2];
    if (action === 'refund') requireRole(user, ['admin', 'manager']);
    const result = transaction(() => {
      const sale = db.prepare('SELECT * FROM sales WHERE id = ?').get(id);
      if (!sale) fail(404, 'Sale not found.');
      if (['void', 'refunded'].includes(sale.status)) fail(409, 'This sale has already been cancelled or refunded.');
      if (action === 'cancel' && sale.status !== 'partial') fail(409, 'A paid sale must be refunded, not cancelled.');
      if (action === 'cancel' && db.prepare('SELECT id FROM sale_payments WHERE sale_id = ?').get(id)) fail(409, 'A sale with payments must be refunded.');
      const payments = db.prepare('SELECT method, amount FROM sale_payments WHERE sale_id = ? AND amount > 0').all(id);
      for (const item of db.prepare('SELECT * FROM sale_items WHERE sale_id = ?').all(id)) {
        db.prepare(`UPDATE products SET stock = stock + ?, updated_at = datetime('now') WHERE id = ?`).run(item.quantity, item.product_id);
        db.prepare(`INSERT INTO stock_movements (product_id, user_id, movement_type, quantity, reference)
          VALUES (?, ?, ?, ?, ?)`).run(item.product_id, user.id, action === 'refund' ? 'refund' : 'void', item.quantity, sale.receipt_number);
      }
      for (const payment of payments) {
        db.prepare('INSERT INTO sale_payments (sale_id, method, amount) VALUES (?, ?, ?)').run(id, payment.method, -payment.amount);
        if (payment.method === 'cash') addCashMovement(user.id, 'refund', sale.receipt_number, -payment.amount);
      }
      db.prepare('UPDATE sales SET status = ? WHERE id = ?').run(action === 'refund' ? 'refunded' : 'void', id);
      audit(user.id, action, 'sale', id, { receipt: sale.receipt_number });
      return sale.receipt_number;
    });
    return json(res, 200, { ok: true, receipt: result });
  }

  if (method === 'GET' && path === '/api/cash') {
    const session = activeCashSession();
    if (!session) return json(res, 200, { session: null });
    const movement = db.prepare('SELECT COALESCE(SUM(amount), 0) AS amount FROM cash_movements WHERE cash_session_id = ?').get(session.id);
    return json(res, 200, { session: { ...session, current_amount: session.opening_amount + movement.amount } });
  }
  if (method === 'POST' && path === '/api/cash/open') {
    const data = await bodyJson(req);
    const opening = money(data.opening_amount);
    const sessionId = transaction(() => {
      if (activeCashSession()) fail(409, 'A cash register is already open.');
      const result = db.prepare('INSERT INTO cash_sessions (user_id, opening_amount) VALUES (?, ?)').run(user.id, opening);
      audit(user.id, 'open', 'cash-session', result.lastInsertRowid, { opening });
      return Number(result.lastInsertRowid);
    });
    return json(res, 201, db.prepare('SELECT * FROM cash_sessions WHERE id = ?').get(sessionId));
  }
  if (method === 'POST' && path === '/api/cash/close') {
    requireRole(user, ['admin', 'manager']);
    const data = await bodyJson(req);
    const counted = money(data.closing_amount);
    const session = activeCashSession();
    if (!session) fail(409, 'There is no open cash register.');
    const expected = session.opening_amount + db.prepare('SELECT COALESCE(SUM(amount), 0) AS amount FROM cash_movements WHERE cash_session_id = ?').get(session.id).amount;
    db.prepare(`UPDATE cash_sessions SET closing_amount = ?, expected_amount = ?, closed_at = datetime('now') WHERE id = ?`)
      .run(counted, expected, session.id);
    audit(user.id, 'close', 'cash-session', session.id, { counted, expected, difference: counted - expected });
    return json(res, 200, { counted, expected, difference: counted - expected });
  }
  if (method === 'POST' && path === '/api/expenses') {
    requireRole(user, ['admin', 'manager']);
    const data = await bodyJson(req);
    const description = cleanText(data.description, 'Description', 160, true);
    const category = cleanText(data.category, 'Category', 80, true);
    const amount = money(data.amount);
    const methodName = String(data.method || '');
    if (!amount) fail(400, 'Expense amount must be greater than zero.');
    if (!['cash', 'card', 'transfer'].includes(methodName)) fail(400, 'Choose cash, card, or transfer.');
    transaction(() => {
      const result = db.prepare('INSERT INTO expenses (user_id, description, category, amount, method) VALUES (?, ?, ?, ?, ?)')
        .run(user.id, description, category, amount, methodName);
      if (methodName === 'cash') addCashMovement(user.id, 'expense', result.lastInsertRowid, -amount);
      audit(user.id, 'create', 'expense', result.lastInsertRowid);
    });
    return json(res, 201, { ok: true });
  }

  if (method === 'GET' && path === '/api/dashboard') {
    const period = url.searchParams.get('period') || 'day';
    const modifier = period === 'week' ? '-6 days' : period === 'month' ? 'start of month' : 'start of day';
    const sales = db.prepare(`SELECT COUNT(*) AS count, COALESCE(SUM(total), 0) AS revenue FROM sales
      WHERE status NOT IN ('void', 'refunded') AND created_at >= datetime('now', ?)`).get(modifier);
    const gross = db.prepare(`SELECT COALESCE(SUM(s.total - costs.cost), 0) AS amount FROM sales s
      JOIN (SELECT sale_id, SUM(ROUND(quantity * unit_cost)) AS cost FROM sale_items GROUP BY sale_id) costs ON costs.sale_id = s.id
      WHERE s.status NOT IN ('void', 'refunded') AND s.created_at >= datetime('now', ?)`).get(modifier).amount;
    const expenses = db.prepare(`SELECT COALESCE(SUM(amount), 0) AS amount FROM expenses WHERE created_at >= datetime('now', ?)`).get(modifier).amount;
    const bestsellers = db.prepare(`SELECT si.product_name AS name, SUM(si.quantity) AS quantity, SUM(si.line_total) AS revenue
      FROM sale_items si JOIN sales s ON s.id = si.sale_id WHERE s.status NOT IN ('void', 'refunded')
      AND s.created_at >= datetime('now', ?) GROUP BY si.product_id ORDER BY quantity DESC LIMIT 5`).all(modifier);
    const lowStock = db.prepare('SELECT id, name, stock, minimum_stock, unit FROM products WHERE active = 1 AND stock <= minimum_stock ORDER BY stock LIMIT 8').all();
    const expired = db.prepare("SELECT id, name, expiry_date, stock FROM products WHERE active = 1 AND expiry_date IS NOT NULL AND expiry_date <= date('now', '+30 days') ORDER BY expiry_date LIMIT 8").all();
    const chart = db.prepare(`SELECT date(created_at) AS day, SUM(total) AS revenue FROM sales
      WHERE status NOT IN ('void', 'refunded') AND created_at >= datetime('now', '-6 days')
      GROUP BY date(created_at) ORDER BY day`).all();
    const customerDebt = db.prepare(`SELECT COALESCE(SUM(MAX(balance, 0)), 0) AS amount FROM (
      SELECT c.id, COALESCE((SELECT SUM(total) FROM sales s WHERE s.customer_id = c.id AND s.status NOT IN ('void','refunded')),0)
      - COALESCE((SELECT SUM(amount) FROM sale_payments sp JOIN sales s ON s.id=sp.sale_id WHERE s.customer_id=c.id AND s.status NOT IN ('void','refunded')),0)
      - COALESCE((SELECT SUM(amount) FROM customer_payments cp WHERE cp.customer_id=c.id),0) AS balance FROM customers c)`).get().amount;
    const supplierDebt = db.prepare(`SELECT COALESCE((SELECT SUM(total) FROM purchases), 0) - COALESCE((SELECT SUM(amount) FROM supplier_payments), 0) AS amount`).get().amount;
    return json(res, 200, { sales, gross_profit: gross, expenses, net_profit: gross - expenses, bestsellers, low_stock: lowStock, expiring: expired, chart, customer_debt: customerDebt, supplier_debt: supplierDebt });
  }
  if (method === 'GET' && path === '/api/reports/sales') {
    const from = url.searchParams.get('from') || new Date(Date.now() - 29 * 86400000).toISOString().slice(0, 10);
    const to = url.searchParams.get('to') || new Date().toISOString().slice(0, 10);
    if (!validDate(from) || !validDate(to) || from > to) fail(400, 'Choose a valid report date range.');
    const rows = db.prepare(`SELECT date(s.created_at) AS day, COUNT(*) AS sales_count, SUM(s.total) AS revenue,
      SUM(s.discount) AS discounts, SUM(s.total - COALESCE(cost.cost, 0)) AS gross_profit
      FROM sales s LEFT JOIN (SELECT sale_id, SUM(ROUND(quantity * unit_cost)) AS cost FROM sale_items GROUP BY sale_id) cost ON cost.sale_id = s.id
      WHERE s.status NOT IN ('void', 'refunded') AND date(s.created_at) BETWEEN ? AND ?
      GROUP BY date(s.created_at) ORDER BY day`).all(from, to);
    const summary = rows.reduce((acc, row) => ({ sales_count: acc.sales_count + row.sales_count, revenue: acc.revenue + row.revenue, discounts: acc.discounts + row.discounts, gross_profit: acc.gross_profit + row.gross_profit }), { sales_count: 0, revenue: 0, discounts: 0, gross_profit: 0 });
    return json(res, 200, { from, to, summary, rows });
  }
  if (method === 'GET' && path === '/api/expenses') return json(res, 200, db.prepare(`SELECT e.*, u.username FROM expenses e JOIN users u ON u.id=e.user_id ORDER BY e.id DESC LIMIT 300`).all());
  if (method === 'GET' && path === '/api/inventory/alerts') return json(res, 200, {
    low_stock: db.prepare('SELECT id, name, stock, minimum_stock, unit FROM products WHERE active = 1 AND stock <= minimum_stock ORDER BY stock').all(),
    expiring: db.prepare("SELECT id, name, expiry_date, stock FROM products WHERE active = 1 AND expiry_date IS NOT NULL AND expiry_date <= date('now', '+30 days') ORDER BY expiry_date").all(),
  });
  if (method === 'GET' && path === '/api/backup') {
    requireRole(user, ['admin']);
    const file = await createBackupFile();
    audit(user.id, 'backup', 'database', file);
    return json(res, 201, { file });
  }
  if (method === 'GET' && path === '/api/backup/list') {
    requireRole(user, ['admin']);
    const backupDir = resolve(dirname(databasePath), 'backups');
    const files = existsSync(backupDir) ? (await readdir(backupDir)).filter((name) => name.endsWith('.sqlite')).sort().reverse() : [];
    return json(res, 200, files);
  }
  fail(404, 'API endpoint not found.');
}

function serveStatic(url, res) {
  const requestPath = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
  const file = resolve(publicRoot, `.${requestPath}`);
  if (!file.startsWith(`${publicRoot}\\`) && file !== publicRoot) {
    res.writeHead(403);
    return res.end('Forbidden');
  }
  if (!existsSync(file)) {
    res.writeHead(404);
    return res.end('Not found');
  }
  res.writeHead(200, {
    'Content-Type': mimeTypes[extname(file)] || 'application/octet-stream',
    'Cache-Control': extname(file) === '.html' ? 'no-cache' : 'public, max-age=3600',
    'X-Content-Type-Options': 'nosniff',
    'Content-Security-Policy': "default-src 'self'; connect-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; base-uri 'none'; frame-ancestors 'none'",
    'Referrer-Policy': 'no-referrer',
  });
  createReadStream(file).pipe(res);
}

export const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (url.pathname.startsWith('/api/')) {
    try {
      await handleApi(req, res, url);
    } catch (error) {
      if (error instanceof HttpError) return json(res, error.status, { error: error.message });
      if (error.code === 'ERR_SQLITE_CONSTRAINT_UNIQUE' || /UNIQUE constraint failed/.test(error.message || '')) {
        return json(res, 409, { error: 'A record with that name, barcode, SKU, username, or invoice already exists.' });
      }
      console.error(error);
      return json(res, 500, { error: 'The operation failed. No changes were saved.' });
    }
    return;
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' });
    return res.end();
  }
  serveStatic(url, res);
});

export function startServer(options = {}) {
  const host = options.host || process.env.HOST || '127.0.0.1';
  const port = options.port ?? (process.env.PORT === undefined ? 4173 : Number(process.env.PORT));
  server.listen(port, host, () => {
    const address = server.address();
    console.log(`Souq is available at http://${host}:${address.port}`);
    console.log(`SQLite database: ${databasePath}`);
    createBackupFile(true).catch((error) => console.error('Automatic backup failed:', error));
    setInterval(() => createBackupFile(true).catch((error) => console.error('Automatic backup failed:', error)), 24 * 60 * 60 * 1000).unref();
  });
  return server;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  startServer();
}
