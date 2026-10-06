-- Complementos conferidos no cardápio oficial da Bliss no Anota AI.
-- Os mesmos produtos são compartilhados pelos dois cardápios/unidades.
UPDATE products
SET complements_json='[{"name":"Banana","price_cents":200,"max_quantity":1},{"name":"Manga","price_cents":300,"max_quantity":1},{"name":"Morango","price_cents":300,"max_quantity":1},{"name":"Kiwi","price_cents":400,"max_quantity":1},{"name":"Creme de ninho da casa","price_cents":0,"max_quantity":1},{"name":"Creme de oreo da casa","price_cents":0,"max_quantity":1},{"name":"Creme de café","price_cents":0,"max_quantity":1},{"name":"Cupuaçu","price_cents":0,"max_quantity":1},{"name":"Amendoim triturado","price_cents":200,"max_quantity":1},{"name":"Granola","price_cents":300,"max_quantity":1},{"name":"Paçoca","price_cents":300,"max_quantity":1},{"name":"Castanha","price_cents":300,"max_quantity":1},{"name":"Mel","price_cents":200,"max_quantity":1},{"name":"Leite condensado","price_cents":300,"max_quantity":1},{"name":"Nutella","price_cents":400,"max_quantity":1},{"name":"Pasta de amendoim","price_cents":0,"max_quantity":1},{"name":"Leitinho","price_cents":0,"max_quantity":1},{"name":"Abacaxi ao vinho","price_cents":0,"max_quantity":1},{"name":"Morango em caldas","price_cents":0,"max_quantity":1},{"name":"Cereja em caldas","price_cents":0,"max_quantity":1}]',
    updated_at=CURRENT_TIMESTAMP
WHERE id IN (4,5,6);

UPDATE products SET price_cents=2300,description='Monte seu açaí com frutas, extras e complementos doces.' WHERE id=4;
UPDATE products SET price_cents=3600,description='Monte seu açaí com frutas, extras e complementos doces.' WHERE id=5;
UPDATE products SET price_cents=6999,description='Monte seu açaí com frutas, extras e complementos doces.' WHERE id=6;
