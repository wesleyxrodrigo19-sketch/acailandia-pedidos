CREATE TABLE IF NOT EXISTS cash_register_sessions (
  id integer PRIMARY KEY AUTOINCREMENT,
  branch_id text NOT NULL,
  opened_at text NOT NULL DEFAULT CURRENT_TIMESTAMP,
  closed_at text,
  opening_cash_cents integer NOT NULL DEFAULT 0,
  reported_closing_cents integer,
  cash_sales_cents integer NOT NULL DEFAULT 0,
  change_cents integer NOT NULL DEFAULT 0,
  cash_in_cents integer NOT NULL DEFAULT 0,
  cash_out_cents integer NOT NULL DEFAULT 0,
  expected_cash_cents integer NOT NULL DEFAULT 0,
  difference_cents integer,
  status text NOT NULL DEFAULT 'open'
);
CREATE INDEX IF NOT EXISTS idx_cash_register_sessions_branch_date ON cash_register_sessions(branch_id,opened_at DESC);

CREATE TABLE IF NOT EXISTS cash_register_entries (
  id integer PRIMARY KEY AUTOINCREMENT,
  session_id integer NOT NULL,
  branch_id text NOT NULL,
  entry_type text NOT NULL CHECK(entry_type IN ('in','out')),
  amount_cents integer NOT NULL,
  reason text NOT NULL DEFAULT '',
  created_at text NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(session_id) REFERENCES cash_register_sessions(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_cash_register_entries_session ON cash_register_entries(session_id,created_at);
