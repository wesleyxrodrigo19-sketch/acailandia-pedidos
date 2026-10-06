ALTER TABLE settings ADD COLUMN table_count integer NOT NULL DEFAULT 0;
ALTER TABLE orders ADD COLUMN table_number integer;
CREATE UNIQUE INDEX IF NOT EXISTS idx_orders_one_active_table ON orders(table_number) WHERE table_number IS NOT NULL AND status NOT IN ('concluido','cancelado');
