-- A garrafinha de 500 ml usa o sabor selecionado como preço final: R$ 33,00.
-- Não altera a garrafinha de 300 ml (id 1).
UPDATE products SET
  price_cents=3300,
  description='Escolha 1 sabor obrigatório. Todos os sabores custam R$ 33,00.',
  complements_json=REPLACE(REPLACE(REPLACE(REPLACE(complements_json,'"price_cents":0','"price_cents":3300'),'"price_cents":2000','"price_cents":3300'),'"price_cents":2290','"price_cents":3300'),'"price_cents":2390','"price_cents":3300'),
  updated_at=CURRENT_TIMESTAMP
WHERE id=2;
