# Architecture and data model

## Application structure

```text
desktop/main.mjs       Electron shell; starts the local service in-process
desktop/create-icon.mjs Generates the branded Windows .ico at build time
database/schema.sql     Relational schema, constraints, and indexes
server/db.mjs           SQLite initialization and transaction helper
server/index.mjs        Loopback HTTP API, access control, and business logic
public/index.html       Application screens and forms
public/styles.css       Responsive RTL/LTR presentation
public/app.js           UI state, forms, reports, and API client
public/sw.js            Offline cache for the application shell (API stays local)
test/system.test.mjs    End-to-end tests for business transactions
%APPDATA%/Souq Supermarket/souq.sqlite  Packaged Windows app database
```

The app uses the Node.js built-in `node:sqlite` driver and browser-native HTML/CSS/JavaScript. Development mode runs with `npm start`. The Windows installer bundles Electron's Node runtime and starts the local HTTP service in-process on a random loopback port, so end users do not install Node.js or manually start a service. The service binds only to `127.0.0.1`.

## Relational model

- **users / sessions**: role-based local accounts (`admin`, `manager`, `cashier`) and hashed, expiring sessions.
- **categories / products**: unique barcode and SKU, category link, unit/variation, DZD purchase/selling price, stock threshold, and optional expiry date. Product archival preserves historical references.
- **suppliers / purchases / purchase_items / supplier_payments**: supplier invoices and received lines. Invoice receipt increases product stock and records stock movements in the same SQLite transaction. Payments allocate to outstanding invoices.
- **customers / sales / sale_items / sale_payments / customer_payments**: receipt snapshots, cost-at-sale, discounts, multiple payment methods, and outstanding balances. A refunded sale remains in history, reverses stock, and records the payment reversal.
- **cash_sessions / cash_movements / expenses**: opening funds, cash-only flows, counted close, expected close, and variance. Non-cash tenders do not affect drawer balance.
- **stock_movements**: immutable purchase, sale, return, void, and manual-adjustment history.
- **settings / audit_log**: store locale/name and operator actions.

## Consistency rules

1. Monetary values are integer centimes; UI values are DZD. Quantities use at most three decimal places.
2. Stock cannot become negative. Sales, purchase receipts, manual adjustments, cash movements, and their audit records are committed atomically.
3. A sale payment cannot exceed its total. An unpaid/partially paid sale requires a customer account. Cash tenders require an open register.
4. A supplier/customer with a non-zero balance cannot be archived. Supplier payments cannot exceed the outstanding supplier balance.
5. Refunds and cancellations are idempotency-guarded by sale state and restore the original product quantities exactly once.
6. Foreign keys, unique identifiers, checks, indexes, and schema version 1 are enforced by SQLite. Development data is stored in `data/souq.sqlite` (or `SOUQ_DATA_DIR`); the packaged app stores it under the current Windows user's `%APPDATA%\Souq Supermarket`.

## Local operations and backups

The service creates one consistent SQLite backup per UTC day while it is running and also offers an administrator-triggered backup. Backups are stored beside the database in a `backups` subfolder. Keep copies on separate protected storage. In the packaged app, Electron includes the local service runtime; no separately installed Node service is required.

## Access model

Account creation is available only while the user table is empty. Passwords are stored as salted scrypt hashes; sessions use opaque random tokens stored by SHA-256 digest and are expired after 12 hours. The default service binds to `127.0.0.1`. Do not expose it on a public network without adding transport security and a deployment-specific threat review.
