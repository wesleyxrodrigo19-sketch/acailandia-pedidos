ALTER TABLE cash_register_sessions ADD COLUMN closing_notes text NOT NULL DEFAULT '';

CREATE TABLE IF NOT EXISTS employees (
  id integer PRIMARY KEY AUTOINCREMENT,
  name text NOT NULL,
  is_active integer NOT NULL DEFAULT 1,
  created_at text NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_employees_active_name ON employees(is_active,name);

ALTER TABLE orders ADD COLUMN employee_id integer;
ALTER TABLE orders ADD COLUMN employee_name text NOT NULL DEFAULT '';
ALTER TABLE orders ADD COLUMN payroll_debit integer NOT NULL DEFAULT 0;
