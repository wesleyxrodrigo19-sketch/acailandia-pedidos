CREATE TABLE order_partial_payments (
  id TEXT PRIMARY KEY NOT NULL,
  order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  method TEXT NOT NULL CHECK(method IN ('dinheiro','pix','credito','debito')),
  amount_cents INTEGER NOT NULL CHECK(amount_cents>0),
  received_cents INTEGER NOT NULL CHECK(received_cents>=amount_cents),
  discount_cents INTEGER NOT NULL DEFAULT 0 CHECK(discount_cents>=0),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_partial_payments_order ON order_partial_payments(order_id);
