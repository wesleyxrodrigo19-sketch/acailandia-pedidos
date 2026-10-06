CREATE TABLE order_payments (
  id integer PRIMARY KEY AUTOINCREMENT,
  order_id text NOT NULL,
  method text NOT NULL,
  amount_cents integer NOT NULL,
  created_at text NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);
CREATE INDEX idx_order_payments_order_id ON order_payments(order_id);
