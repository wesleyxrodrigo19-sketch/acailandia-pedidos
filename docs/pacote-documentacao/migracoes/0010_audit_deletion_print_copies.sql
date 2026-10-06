ALTER TABLE settings ADD COLUMN print_copies integer NOT NULL DEFAULT 1;

CREATE TABLE audit_log (
  id integer PRIMARY KEY AUTOINCREMENT,
  action_type text NOT NULL,
  entity_type text NOT NULL,
  entity_id text NOT NULL DEFAULT '',
  summary text NOT NULL,
  details_json text NOT NULL DEFAULT '{}',
  created_at text NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_log_created_at ON audit_log(created_at);
CREATE INDEX idx_audit_log_entity ON audit_log(entity_type, entity_id);
