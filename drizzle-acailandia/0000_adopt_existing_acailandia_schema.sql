-- Baseline segura para o D1 de Açailandia já existente.
-- Preserva todas as tabelas e dados atuais; apenas acrescenta campos e tabelas
-- operacionais ausentes para alinhar o banco com o Worker atual.

ALTER TABLE settings ADD COLUMN delivery_surcharge_enabled INTEGER NOT NULL DEFAULT 0;
ALTER TABLE settings ADD COLUMN delivery_surcharge_percent INTEGER NOT NULL DEFAULT 0;
ALTER TABLE settings ADD COLUMN delivery_surcharge_label TEXT NOT NULL DEFAULT 'Acréscimo em dias chuvosos';
ALTER TABLE settings ADD COLUMN scale_last_grams INTEGER NOT NULL DEFAULT 0;
ALTER TABLE settings ADD COLUMN scale_captured_at TEXT NOT NULL DEFAULT '';
ALTER TABLE settings ADD COLUMN pedeai_environment TEXT NOT NULL DEFAULT 'sandbox';
ALTER TABLE settings ADD COLUMN pedeai_store_id TEXT NOT NULL DEFAULT '';
ALTER TABLE settings ADD COLUMN pedeai_client_id TEXT NOT NULL DEFAULT '';
ALTER TABLE settings ADD COLUMN pedeai_api_base_url TEXT NOT NULL DEFAULT '';
ALTER TABLE settings ADD COLUMN pedeai_api_token TEXT NOT NULL DEFAULT '';
ALTER TABLE settings ADD COLUMN pedeai_webhook_secret TEXT NOT NULL DEFAULT '';
ALTER TABLE settings ADD COLUMN pedeai_last_sync_at TEXT NOT NULL DEFAULT '';
ALTER TABLE settings ADD COLUMN pedeai_last_error TEXT NOT NULL DEFAULT '';
ALTER TABLE settings ADD COLUMN self_service_price_per_kg_cents INTEGER NOT NULL DEFAULT 3000;
ALTER TABLE settings ADD COLUMN scale_agent_token_hash TEXT NOT NULL DEFAULT '';
ALTER TABLE settings ADD COLUMN scale_agent_token_created_at TEXT NOT NULL DEFAULT '';
ALTER TABLE settings ADD COLUMN employee_discount_percent INTEGER NOT NULL DEFAULT 0;

ALTER TABLE orders ADD COLUMN cash_received_cents INTEGER;
ALTER TABLE orders ADD COLUMN discount_cents INTEGER NOT NULL DEFAULT 0;
ALTER TABLE orders ADD COLUMN discount_type TEXT NOT NULL DEFAULT '';
ALTER TABLE orders ADD COLUMN employee_discount INTEGER NOT NULL DEFAULT 0;
ALTER TABLE orders ADD COLUMN employee_id INTEGER;
ALTER TABLE orders ADD COLUMN employee_name TEXT NOT NULL DEFAULT '';
ALTER TABLE orders ADD COLUMN payroll_debit INTEGER NOT NULL DEFAULT 0;

CREATE TABLE IF NOT EXISTS order_payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id TEXT NOT NULL,
  method TEXT NOT NULL,
  amount_cents INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_order_payments_order_id ON order_payments(order_id);

CREATE TABLE IF NOT EXISTS print_jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id TEXT NOT NULL,
  target TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  attempts INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  printed_at TEXT,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS abandoned_carts (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  order_type TEXT NOT NULL DEFAULT 'delivery',
  city TEXT NOT NULL DEFAULT '',
  neighborhood TEXT NOT NULL DEFAULT '',
  street TEXT NOT NULL DEFAULT '',
  house_number TEXT NOT NULL DEFAULT '',
  block TEXT NOT NULL DEFAULT '',
  reference_point TEXT NOT NULL DEFAULT '',
  complement TEXT NOT NULL DEFAULT '',
  payment_method TEXT NOT NULL DEFAULT '',
  notes TEXT NOT NULL DEFAULT '',
  items_json TEXT NOT NULL DEFAULT '[]',
  subtotal_cents INTEGER NOT NULL DEFAULT 0,
  delivery_fee_cents INTEGER NOT NULL DEFAULT 0,
  total_cents INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_abandoned_carts_status_updated ON abandoned_carts(status, updated_at);

CREATE TABLE IF NOT EXISTS audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  action_type TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL DEFAULT '',
  summary TEXT NOT NULL,
  details_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON audit_log(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_log_entity ON audit_log(entity_type, entity_id);

CREATE TABLE IF NOT EXISTS site_visits (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  visitor_key TEXT NOT NULL,
  visited_on TEXT NOT NULL,
  branch_id TEXT NOT NULL DEFAULT 'acailandia',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX IF NOT EXISTS site_visits_visitor_day_unique ON site_visits(visitor_key, visited_on, branch_id);
CREATE INDEX IF NOT EXISTS site_visits_date_idx ON site_visits(visited_on, branch_id);

CREATE TABLE IF NOT EXISTS cash_register_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  branch_id TEXT NOT NULL,
  opened_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  closed_at TEXT,
  opening_cash_cents INTEGER NOT NULL DEFAULT 0,
  reported_closing_cents INTEGER,
  cash_sales_cents INTEGER NOT NULL DEFAULT 0,
  change_cents INTEGER NOT NULL DEFAULT 0,
  cash_in_cents INTEGER NOT NULL DEFAULT 0,
  cash_out_cents INTEGER NOT NULL DEFAULT 0,
  expected_cash_cents INTEGER NOT NULL DEFAULT 0,
  difference_cents INTEGER,
  status TEXT NOT NULL DEFAULT 'open',
  closing_notes TEXT NOT NULL DEFAULT ''
);
CREATE INDEX IF NOT EXISTS idx_cash_register_sessions_branch_date ON cash_register_sessions(branch_id, opened_at DESC);

CREATE TABLE IF NOT EXISTS cash_register_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id INTEGER NOT NULL,
  branch_id TEXT NOT NULL,
  entry_type TEXT NOT NULL CHECK(entry_type IN ('in','out')),
  amount_cents INTEGER NOT NULL,
  reason TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(session_id) REFERENCES cash_register_sessions(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_cash_register_entries_session ON cash_register_entries(session_id, created_at);

CREATE TABLE IF NOT EXISTS employees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_employees_active_name ON employees(is_active, name);