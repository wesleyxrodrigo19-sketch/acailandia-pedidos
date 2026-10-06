-- Sincronização conferida no cardápio oficial da Bliss no Anota AI (02/10/2026).
-- Os três sabores de copo trufado passam a exibir cada tamanho e seu preço.

UPDATE products SET
  name='Garrafinha trufada 300 ml',
  description='Garrafinha trufada de açaí: creme de ninho, maracujá, Nutella, cookies, Oreo, morango ou café.',
  price_cents=2290,
  updated_at=CURRENT_TIMESTAMP
WHERE id=1;

UPDATE products SET
  name='Garrafinha trufada 500 ml',
  description='Garrafinha trufada de açaí.',
  price_cents=3390,
  updated_at=CURRENT_TIMESTAMP
WHERE id=2;

UPDATE products SET
  name='Garrafinha açaí zero & whey',
  description='Garrafinha de açaí zero trufada com pasta de amendoim e whey.',
  price_cents=2500,
  updated_at=CURRENT_TIMESTAMP
WHERE id=3;

UPDATE products SET
  name='Monte seu açaí 300 g',
  description='Monte seu açaí com acompanhamentos.',
  price_cents=2500,
  updated_at=CURRENT_TIMESTAMP
WHERE id=4;

UPDATE products SET
  name='Monte seu açaí 500 g', price_cents=3600, updated_at=CURRENT_TIMESTAMP WHERE id=5;
UPDATE products SET
  name='Monte seu açaí 1 kg', price_cents=6999, updated_at=CURRENT_TIMESTAMP WHERE id=6;

UPDATE products SET
  name='Nuteninho com morango — 300 ml',
  description='Copo trufado com Nutella, creme de ninho, açaí tradicional e morango fresco.',
  price_cents=2500,
  updated_at=CURRENT_TIMESTAMP
WHERE id=7;

UPDATE products SET
  name='Nuteninho com Oreo — 300 ml',
  description='Copo trufado com Nutella, creme de ninho, açaí tradicional e biscoito Oreo.',
  price_cents=2500,
  updated_at=CURRENT_TIMESTAMP
WHERE id=8;

UPDATE products SET
  name='Nuteninho tradicional — 300 ml',
  description='Copo trufado com Nutella, creme de ninho e açaí tradicional.',
  price_cents=2500,
  updated_at=CURRENT_TIMESTAMP
WHERE id=9;

UPDATE products SET name='Barca de açaí 400 g', price_cents=3999, updated_at=CURRENT_TIMESTAMP WHERE id=13;

INSERT OR IGNORE INTO products (id,category,name,description,price_cents,old_price_cents,image_url,is_featured,is_promo,is_available,sort_order,complements_json)
VALUES
  (24,'Copos trufados','Nuteninho com morango — 400 ml','Copo trufado com Nutella, creme de ninho, açaí tradicional e morango fresco.',3000,NULL,'https://client-assets.anota.ai/produtos/6a6a55d96f09799abdc49170/-1789072765010blob_600.webp',0,0,1,23,'[]'),
  (25,'Copos trufados','Nuteninho com morango — 500 ml','Copo trufado com Nutella, creme de ninho, açaí tradicional e morango fresco.',3600,NULL,'https://client-assets.anota.ai/produtos/6a6a55d96f09799abdc49170/-1789072765010blob_600.webp',0,0,1,24,'[]'),
  (26,'Copos trufados','Nuteninho com Oreo — 400 ml','Copo trufado com Nutella, creme de ninho, açaí tradicional e biscoito Oreo.',3000,NULL,'https://client-assets.anota.ai/produtos/6a6a55d96f09799abdc49170/-1785518921513blob_600.webp',0,0,1,25,'[]'),
  (27,'Copos trufados','Nuteninho com Oreo — 500 ml','Copo trufado com Nutella, creme de ninho, açaí tradicional e biscoito Oreo.',3600,NULL,'https://client-assets.anota.ai/produtos/6a6a55d96f09799abdc49170/-1785518921513blob_600.webp',0,0,1,26,'[]'),
  (28,'Copos trufados','Nuteninho tradicional — 400 ml','Copo trufado com Nutella, creme de ninho e açaí tradicional.',3000,NULL,'https://client-assets.anota.ai/produtos/6a6a55d96f09799abdc49170/-1785519349421blob_600.webp',0,0,1,27,'[]'),
  (29,'Copos trufados','Nuteninho tradicional — 500 ml','Copo trufado com Nutella, creme de ninho e açaí tradicional.',3600,NULL,'https://client-assets.anota.ai/produtos/6a6a55d96f09799abdc49170/-1785519349421blob_600.webp',0,0,1,28,'[]');

INSERT OR IGNORE INTO product_branches (product_id,branch_id,is_available)
SELECT id,'dom-avelar',1 FROM products WHERE id BETWEEN 24 AND 29;
INSERT OR IGNORE INTO product_branches (product_id,branch_id,is_available)
SELECT id,'sao-goncalo',1 FROM products WHERE id BETWEEN 24 AND 29;
