-- Complementos por produto, ordenacao de categorias e detalhes dos itens.
-- Mantem pedidos e dados existentes; apenas adiciona novas colunas.
ALTER TABLE products ADD COLUMN complements_json text NOT NULL DEFAULT '[]';
ALTER TABLE order_items ADD COLUMN complements_json text NOT NULL DEFAULT '[]';
ALTER TABLE order_items ADD COLUMN notes text NOT NULL DEFAULT '';
ALTER TABLE settings ADD COLUMN category_order_json text NOT NULL DEFAULT '[]';
ALTER TABLE settings ADD COLUMN business_hours_json text NOT NULL DEFAULT '[]';
ALTER TABLE settings ADD COLUMN manual_closed integer NOT NULL DEFAULT 0;
ALTER TABLE settings ADD COLUMN manual_closed_reason text NOT NULL DEFAULT '';

-- Complementos conferidos no cardapio original da JW Hamburgueria em 22/09/2026.
UPDATE products
SET complements_json = '[{"name":"Calabresa","price_cents":800,"max_quantity":1},{"name":"Adicional ovo","price_cents":300,"max_quantity":2},{"name":"Adicional bacon","price_cents":800,"max_quantity":1},{"name":"Adicional Cebola caramelizada","price_cents":500,"max_quantity":3},{"name":"Adicional Frango","price_cents":800,"max_quantity":1},{"name":"Adicional Maionese temperada","price_cents":500,"max_quantity":3},{"name":"Adicional Salsicha","price_cents":400,"max_quantity":4}]'
WHERE lower(category) NOT IN ('sucos','refrigerantes');

UPDATE settings
SET category_order_json = '["Mega Burgão Artesanal","Barcas","Hotdogs Gourmet","Hot Dogs","Hambúrgueres","Batata Frita","Combos Promocionais","Sucos","Refrigerantes"]'
WHERE id = 1;

UPDATE settings
SET business_hours_json = '[{"day":0,"label":"Domingo","enabled":true,"open":"17:30","close":"23:20"},{"day":1,"label":"Segunda-feira","enabled":true,"open":"17:30","close":"23:20"},{"day":2,"label":"Terça-feira","enabled":false,"open":"17:30","close":"23:20"},{"day":3,"label":"Quarta-feira","enabled":true,"open":"17:30","close":"23:20"},{"day":4,"label":"Quinta-feira","enabled":true,"open":"17:30","close":"23:20"},{"day":5,"label":"Sexta-feira","enabled":true,"open":"17:30","close":"23:20"},{"day":6,"label":"Sábado","enabled":true,"open":"17:30","close":"23:20"}]',
    closing_time = '23:20'
WHERE id = 1;

PRAGMA optimize;
