CREATE TABLE IF NOT EXISTS `site_visits` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `visitor_key` text NOT NULL,
  `visited_on` text NOT NULL,
  `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS `site_visits_visitor_day_unique`
  ON `site_visits` (`visitor_key`, `visited_on`);

CREATE INDEX IF NOT EXISTS `site_visits_date_idx`
  ON `site_visits` (`visited_on`);
