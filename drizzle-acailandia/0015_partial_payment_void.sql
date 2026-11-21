ALTER TABLE order_partial_payments ADD COLUMN voided_at TEXT;
CREATE INDEX idx_partial_payments_active ON order_partial_payments(order_id,voided_at);
