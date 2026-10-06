ALTER TABLE settings ADD COLUMN employee_discount_percent integer NOT NULL DEFAULT 0;
ALTER TABLE orders ADD COLUMN discount_cents integer NOT NULL DEFAULT 0;
ALTER TABLE orders ADD COLUMN discount_type text NOT NULL DEFAULT '';
ALTER TABLE orders ADD COLUMN employee_discount integer NOT NULL DEFAULT 0;
