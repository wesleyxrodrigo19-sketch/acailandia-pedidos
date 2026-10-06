ALTER TABLE settings ADD COLUMN scale_last_grams integer NOT NULL DEFAULT 0;
ALTER TABLE settings ADD COLUMN scale_captured_at text NOT NULL DEFAULT '';
