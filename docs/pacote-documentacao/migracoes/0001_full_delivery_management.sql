PRAGMA foreign_keys=OFF;

ALTER TABLE order_items RENAME TO order_items_legacy;
ALTER TABLE orders RENAME TO orders_legacy;
ALTER TABLE products RENAME TO products_legacy;
ALTER TABLE settings RENAME TO settings_legacy;

CREATE TABLE settings (
  id integer PRIMARY KEY NOT NULL DEFAULT 1,
  store_name text NOT NULL DEFAULT 'JW Hamburgueria',
  is_open integer NOT NULL DEFAULT 1,
  closing_time text NOT NULL DEFAULT '23:30',
  minimum_order_cents integer NOT NULL DEFAULT 1000,
  delivery_fee_cents integer NOT NULL DEFAULT 500,
  delivery_eta text NOT NULL DEFAULT '40 min',
  pickup_eta text NOT NULL DEFAULT '20 min',
  phone text NOT NULL DEFAULT '87991885203',
  address text NOT NULL DEFAULT 'Avenida Professor Simão Amorim Durando, 371 A — São Gonçalo, Petrolina/PE',
  waiter_fee_enabled integer NOT NULL DEFAULT 1,
  waiter_fee_percent integer NOT NULL DEFAULT 10,
  auto_print_enabled integer NOT NULL DEFAULT 1,
  reception_printer text NOT NULL DEFAULT '',
  kitchen_printer text NOT NULL DEFAULT '',
  print_bridge_key text NOT NULL DEFAULT '',
  updated_at text NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO settings (
  id, store_name, is_open, closing_time, minimum_order_cents, delivery_fee_cents,
  delivery_eta, pickup_eta, phone, address, updated_at
)
SELECT
  1,
  COALESCE((SELECT value FROM settings_legacy WHERE key='store_name'),'JW Hamburgueria'),
  CAST(COALESCE((SELECT value FROM settings_legacy WHERE key='store_open'),'1') AS INTEGER),
  COALESCE((SELECT value FROM settings_legacy WHERE key='closing_time'),'23:30'),
  CAST(ROUND(CAST(COALESCE((SELECT value FROM settings_legacy WHERE key='minimum_order'),'10') AS REAL) * 100) AS INTEGER),
  CAST(ROUND(CAST(COALESCE((SELECT value FROM settings_legacy WHERE key='delivery_fee'),'5') AS REAL) * 100) AS INTEGER),
  COALESCE((SELECT value FROM settings_legacy WHERE key='delivery_eta'),'40 min'),
  COALESCE((SELECT value FROM settings_legacy WHERE key='pickup_eta'),'20 min'),
  COALESCE((SELECT value FROM settings_legacy WHERE key='phone'),'87991885203'),
  COALESCE((SELECT value FROM settings_legacy WHERE key='address'),'Avenida Professor Simão Amorim Durando, 371 A — São Gonçalo, Petrolina/PE'),
  CURRENT_TIMESTAMP;

CREATE TABLE products (
  id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  category text NOT NULL,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  price_cents integer NOT NULL,
  old_price_cents integer,
  image_url text NOT NULL,
  is_featured integer NOT NULL DEFAULT 0,
  is_promo integer NOT NULL DEFAULT 0,
  is_available integer NOT NULL DEFAULT 1,
  sort_order integer NOT NULL DEFAULT 0,
  created_at text NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at text NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (
  id, category, name, description, price_cents, old_price_cents, image_url,
  is_featured, is_promo, is_available, sort_order, created_at, updated_at
)
SELECT
  id, category, name, description, CAST(ROUND(price * 100) AS INTEGER), NULL, image_url,
  featured, 0, active, sort_order, created_at, updated_at
FROM products_legacy;

CREATE TABLE orders (
  id text PRIMARY KEY NOT NULL,
  channel text NOT NULL,
  customer_name text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  order_type text NOT NULL,
  address text NOT NULL DEFAULT '',
  city text NOT NULL DEFAULT '',
  neighborhood text NOT NULL DEFAULT '',
  street text NOT NULL DEFAULT '',
  house_number text NOT NULL DEFAULT '',
  block text NOT NULL DEFAULT '',
  reference_point text NOT NULL DEFAULT '',
  complement text NOT NULL DEFAULT '',
  maps_url text NOT NULL DEFAULT '',
  payment_method text NOT NULL DEFAULT '',
  payment_status text NOT NULL DEFAULT 'pago',
  change_for_cents integer,
  notes text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'novo',
  subtotal_cents integer NOT NULL DEFAULT 0,
  delivery_fee_cents integer NOT NULL DEFAULT 0,
  waiter_fee_cents integer NOT NULL DEFAULT 0,
  total_cents integer NOT NULL,
  cancel_reason text NOT NULL DEFAULT '',
  created_at text NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at text NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO orders (
  id, channel, customer_name, phone, order_type, address, maps_url, payment_method,
  payment_status, notes, status, subtotal_cents, delivery_fee_cents, waiter_fee_cents,
  total_cents, created_at, updated_at
)
SELECT
  code,
  CASE WHEN channel='balcao' THEN 'counter' ELSE 'online' END,
  customer_name,
  phone,
  CASE WHEN fulfillment='delivery' THEN 'delivery' ELSE 'pickup' END,
  address,
  location_url,
  payment_method,
  COALESCE(payment_status,'pago'),
  notes,
  CASE WHEN status='preparo' THEN 'preparando' ELSE status END,
  CAST(ROUND(subtotal * 100) AS INTEGER),
  CAST(ROUND(delivery_fee * 100) AS INTEGER),
  0,
  CAST(ROUND(total * 100) AS INTEGER),
  created_at,
  updated_at
FROM orders_legacy;

CREATE TABLE order_items (
  id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  order_id text NOT NULL,
  product_id integer,
  product_name text NOT NULL,
  quantity integer NOT NULL,
  unit_price_cents integer NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON UPDATE no action ON DELETE cascade,
  FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE no action ON DELETE restrict
);

INSERT INTO order_items (id, order_id, product_id, product_name, quantity, unit_price_cents)
SELECT i.id, o.code, i.product_id, i.product_name, i.quantity, CAST(ROUND(i.unit_price * 100) AS INTEGER)
FROM order_items_legacy i
JOIN orders_legacy o ON o.id=i.order_id;

CREATE TABLE print_jobs (
  id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  order_id text NOT NULL,
  target text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  attempts integer NOT NULL DEFAULT 0,
  created_at text NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at text NOT NULL DEFAULT CURRENT_TIMESTAMP,
  printed_at text,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON UPDATE no action ON DELETE cascade
);

CREATE INDEX idx_orders_status_created_at ON orders (status, created_at);
CREATE INDEX idx_orders_created_at ON orders (created_at);
CREATE INDEX idx_orders_payment_created_at ON orders (payment_method, created_at);
CREATE INDEX idx_order_items_order_id_v2 ON order_items (order_id);
CREATE INDEX idx_products_category_available ON products (category, is_available);
CREATE INDEX idx_print_jobs_status_created_at ON print_jobs (status, created_at);

DROP TABLE order_items_legacy;
DROP TABLE orders_legacy;
DROP TABLE products_legacy;
DROP TABLE settings_legacy;

PRAGMA foreign_keys=ON;
PRAGMA optimize;
