import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdtemp, rm } from 'node:fs/promises';
import { createServer } from 'node:net';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { after, before, test } from 'node:test';

const root = resolve(import.meta.dirname, '..');
let baseUrl;
let dataDir;
let child;
let cookie = '';

async function freePort() {
  const server = createServer();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const { port } = server.address();
  await new Promise((resolveClose, reject) => server.close((error) => error ? reject(error) : resolveClose()));
  return port;
}

async function request(path, method = 'GET', body = undefined, expectStatus = null) {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
      ...(cookie ? { Cookie: cookie } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const setCookie = response.headers.get('set-cookie');
  if (setCookie) cookie = setCookie.split(';')[0];
  const payload = await response.json();
  if (expectStatus !== null) assert.equal(response.status, expectStatus, JSON.stringify(payload));
  else assert.ok(response.ok, `${method} ${path} failed (${response.status}): ${JSON.stringify(payload)}`);
  return payload;
}

before(async () => {
  dataDir = await mkdtemp(join(tmpdir(), 'souq-system-test-'));
  const port = await freePort();
  baseUrl = `http://127.0.0.1:${port}`;
  child = spawn(process.execPath, ['server/index.mjs'], {
    cwd: root,
    env: { ...process.env, HOST: '127.0.0.1', PORT: String(port), SOUQ_DATA_DIR: dataDir },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let logs = '';
  child.stdout.on('data', (chunk) => { logs += chunk; });
  child.stderr.on('data', (chunk) => { logs += chunk; });
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (child.exitCode !== null) throw new Error(`Server exited during startup:\n${logs}`);
    try {
      const response = await fetch(`${baseUrl}/api/status`);
      if (response.ok) return;
    } catch { /* Wait for the loopback server to bind. */ }
    await new Promise((resolveWait) => setTimeout(resolveWait, 100));
  }
  throw new Error(`Server did not start:\n${logs}`);
});

after(async () => {
  if (child && child.exitCode === null) {
    child.kill();
    await once(child, 'exit');
  }
  if (dataDir) await rm(dataDir, { recursive: true, force: true });
});

test('serves the offline application shell with local-only browser permissions', async () => {
  const page = await fetch(baseUrl);
  assert.equal(page.status, 200);
  assert.match(page.headers.get('content-security-policy'), /default-src 'self'/);
  const styles = await fetch(`${baseUrl}/styles.css`).then((response) => response.text());
  assert.doesNotMatch(styles, /https?:\/\/|@import/);
  const worker = await fetch(`${baseUrl}/sw.js`).then((response) => response.text());
  assert.match(worker, /souq-shell-v1/);
});

test('first-run setup, transactional inventory, sales, supplier debt, reporting and backup', async () => {
  assert.deepEqual(await request('/api/status'), { setupRequired: true });
  await request('/api/setup', 'POST', { username: 'owner', password: 'a-secure-test-password' }, 201);
  assert.deepEqual(await request('/api/status'), { setupRequired: false });

  const category = await request('/api/categories', 'POST', { name: 'Épicerie' }, 201);
  const product = await request('/api/products', 'POST', {
    name: 'Riz long',
    barcode: '1234567890123',
    sku: 'RIZ-01',
    category_id: category.id,
    purchase_price: 4,
    selling_price: 10,
    stock: 10,
    minimum_stock: 2,
    unit: 'kg',
  }, 201);
  await request('/api/products', 'POST', { name: 'Invalid expiry', selling_price: 1, expiry_date: '2026-99-99' }, 400);
  await request('/api/products', 'POST', { name: 'Duplicate barcode', barcode: '1234567890123', selling_price: 1 }, 409);
  const customer = await request('/api/customers', 'POST', { name: 'Client test' }, 201);
  const supplier = await request('/api/suppliers', 'POST', { name: 'Fournisseur test' }, 201);
  await request(`/api/customers/${customer.id}`, 'PUT', { name: 'Client modifié', phone: '0550000000' }, 200);
  await request(`/api/suppliers/${supplier.id}`, 'PUT', { name: 'Fournisseur modifié' }, 200);

  await request('/api/sales', 'POST', { items: [{ product_id: product.id, quantity: 11 }], payments: [] }, 409);
  assert.equal((await request('/api/products?search=Riz'))[0].stock, 10);

  await request('/api/cash/open', 'POST', { opening_amount: 100 }, 201);
  const partialSale = await request('/api/sales', 'POST', {
    customer_id: customer.id,
    items: [{ product_id: product.id, quantity: 1 }, { product_id: product.id, quantity: 1 }],
    payments: [{ method: 'cash', amount: 5 }, { method: 'card', amount: 5 }],
  }, 201);
  assert.equal(partialSale.sale.status, 'partial');
  assert.equal(partialSale.items.length, 1);
  assert.equal(partialSale.items[0].quantity, 2);
  assert.equal((await request('/api/products?search=Riz'))[0].stock, 8);
  assert.equal((await request('/api/customers'))[0].balance, 1000);

  await request('/api/customers/payment', 'POST', { customer_id: customer.id, amount: 11, method: 'card' }, 400);
  await request('/api/customers/payment', 'POST', { customer_id: customer.id, amount: 5, method: 'cash' }, 201);
  assert.equal((await request('/api/customers'))[0].balance, 500);
  await request(`/api/sales/${partialSale.saleId}/refund`, 'POST', {}, 200);
  assert.equal((await request('/api/products?search=Riz'))[0].stock, 10);
  assert.equal((await request('/api/customers'))[0].balance, -500);

  const purchase = await request('/api/purchases', 'POST', {
    supplier_id: supplier.id,
    invoice_number: 'INV-100',
    items: [{ product_id: product.id, quantity: 3, unit_cost: 4 }],
    initial_payment: 5,
    payment_method: 'cash',
  }, 201);
  assert.equal(purchase.status, 'partial');
  assert.equal((await request('/api/products?search=Riz'))[0].stock, 13);
  assert.equal((await request('/api/suppliers'))[0].balance, 700);
  await request('/api/suppliers/payment', 'POST', { supplier_id: supplier.id, amount: 7, method: 'transfer' }, 201);
  assert.equal((await request('/api/suppliers'))[0].balance, 0);
  assert.equal((await request('/api/purchases'))[0].status, 'paid');

  const paidSale = await request('/api/sales', 'POST', {
    customer_id: customer.id,
    items: [{ product_id: product.id, quantity: 2 }],
    discount: 2,
    payments: [{ method: 'card', amount: 18 }],
  }, 201);
  assert.equal(paidSale.sale.status, 'paid');
  await request('/api/expenses', 'POST', { description: 'Cleaning', category: 'Operations', amount: 2, method: 'card' }, 201);
  const dashboard = await request('/api/dashboard?period=day');
  assert.equal(dashboard.sales.revenue, 1800);
  assert.equal(dashboard.gross_profit, 1000);
  assert.equal(dashboard.net_profit, 800);
  const report = await request(`/api/reports/sales?from=${new Date().toISOString().slice(0, 10)}&to=${new Date().toISOString().slice(0, 10)}`);
  assert.equal(report.summary.revenue, 1800);
  assert.equal(report.summary.gross_profit, 1000);

  const closing = await request('/api/cash/close', 'POST', { closing_amount: 100 }, 200);
  assert.equal(closing.expected, 10000);
  assert.equal(closing.difference, 0);
  const backup = await request('/api/backup', 'GET', undefined, 201);
  assert.match(backup.file, /\.sqlite$/);
  const backups = await request('/api/backup/list');
  assert.ok(backups.includes(backup.file));
  assert.ok(backups.some((file) => file.startsWith('souq-auto-')));

  await request('/api/users', 'POST', { username: 'cashier', password: 'another-secure-password', role: 'cashier' }, 201);
  await request('/api/logout', 'POST');
  await request('/api/login', 'POST', { username: 'cashier', password: 'another-secure-password' });
  await request('/api/products', 'POST', { name: 'Forbidden', selling_price: 1 }, 403);
});
