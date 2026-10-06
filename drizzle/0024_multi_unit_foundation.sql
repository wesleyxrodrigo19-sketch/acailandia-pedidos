-- Duas unidades físicas, com catálogo compartilhado e disponibilidade independente.
CREATE TABLE IF NOT EXISTS branches (
  id text PRIMARY KEY NOT NULL,
  name text NOT NULL,
  address text NOT NULL,
  phone text NOT NULL DEFAULT '',
  latitude real NOT NULL,
  longitude real NOT NULL,
  is_active integer NOT NULL DEFAULT 1,
  created_at text NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at text NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT OR REPLACE INTO branches (id,name,address,phone,latitude,longitude,is_active,updated_at) VALUES
  ('dom-avelar','Bliss Açaiteria — Dom Avelar','Rua da Grandeza, 1B — Dom Avelar, Petrolina/PE, 56322-060','87981556615',-9.35665,-40.49170,1,CURRENT_TIMESTAMP),
  ('sao-goncalo','Bliss Açaiteria — São Gonçalo','Em frente à Alpha Fitness, Av. Prof. Simão Amorim Durando, 651 — São Gonçalo, Petrolina/PE, 56312-385','87981556615',-9.38500,-40.51200,1,CURRENT_TIMESTAMP);

CREATE TABLE IF NOT EXISTS product_branches (
  product_id integer NOT NULL,
  branch_id text NOT NULL,
  is_available integer NOT NULL DEFAULT 1,
  PRIMARY KEY (product_id,branch_id),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE CASCADE
);

INSERT OR IGNORE INTO product_branches (product_id,branch_id,is_available)
SELECT id,'dom-avelar',is_available FROM products;
INSERT OR IGNORE INTO product_branches (product_id,branch_id,is_available)
SELECT id,'sao-goncalo',is_available FROM products;

ALTER TABLE orders ADD COLUMN branch_id text NOT NULL DEFAULT 'dom-avelar';
CREATE INDEX IF NOT EXISTS idx_orders_branch_created ON orders(branch_id,created_at);
