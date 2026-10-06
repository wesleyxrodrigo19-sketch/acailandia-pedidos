-- Cada cardápio possui sua própria contagem de acessos por dia.
ALTER TABLE site_visits ADD COLUMN branch_id text NOT NULL DEFAULT 'dom-avelar';

DROP INDEX IF EXISTS site_visits_visitor_day_unique;

CREATE UNIQUE INDEX IF NOT EXISTS site_visits_branch_visitor_day_unique
  ON site_visits (branch_id, visitor_key, visited_on);

CREATE INDEX IF NOT EXISTS site_visits_branch_date_idx
  ON site_visits (branch_id, visited_on);
