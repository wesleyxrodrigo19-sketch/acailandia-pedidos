CREATE TABLE order_bill_splits (
  id text PRIMARY KEY NOT NULL,
  order_id text NOT NULL,
  customer_name text NOT NULL DEFAULT '',
  items_json text NOT NULL,
  total_cents integer NOT NULL,
  created_at text NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

CREATE INDEX idx_order_bill_splits_order_id ON order_bill_splits(order_id);
