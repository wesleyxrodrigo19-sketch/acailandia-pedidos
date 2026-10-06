-- Garrafinha trufada 300 ml: todos os sabores disponíveis com preço único.
-- O sabor é uma escolha obrigatória, sem valor adicional.
UPDATE products SET
  name='Garrafinha trufada 300 ml',
  description='Escolha 1 sabor obrigatório. Preço fixo: R$ 19,99.',
  price_cents=1999,
  complements_json='[{"name":"Ovomaltine (premium)","price_cents":0,"max_quantity":1},{"name":"Creme de morango (tradicional)","price_cents":0,"max_quantity":1},{"name":"Nutella (premium)","price_cents":0,"max_quantity":1},{"name":"Creme de ninho da casa com Nutella (super premium)","price_cents":0,"max_quantity":1},{"name":"Creme de ninho da casa (super premium)","price_cents":0,"max_quantity":1},{"name":"Creme de amendoim com Paçoquita (premium)","price_cents":0,"max_quantity":1},{"name":"Creme de cookies (tradicional)","price_cents":0,"max_quantity":1},{"name":"Creme de Oreo da casa (super premium)","price_cents":0,"max_quantity":1},{"name":"Creme de maracujá (premium)","price_cents":0,"max_quantity":1},{"name":"Creme de maracujá com Nutella (super premium)","price_cents":0,"max_quantity":1},{"name":"Creme de pistache (super premium)","price_cents":0,"max_quantity":1},{"name":"Doce de leite (premium)","price_cents":0,"max_quantity":1},{"name":"Leitinho (tradicional)","price_cents":0,"max_quantity":1},{"name":"Leite condensado (tradicional)","price_cents":0,"max_quantity":1},{"name":"Morango com Nutella (premium)","price_cents":0,"max_quantity":1}]',
  updated_at=CURRENT_TIMESTAMP
WHERE id=1;
