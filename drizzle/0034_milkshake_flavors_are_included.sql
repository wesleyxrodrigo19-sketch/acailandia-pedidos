-- Milk shake: o sabor é obrigatório, porém já está incluído no valor do tamanho.
UPDATE products SET
  description='Escolha 1 sabor obrigatório. O sabor já está incluído no preço do tamanho.',
  complements_json=REPLACE(REPLACE(REPLACE(complements_json,'"price_cents":2000','"price_cents":0'),'"price_cents":2290','"price_cents":0'),'"price_cents":2390','"price_cents":0'),
  updated_at=CURRENT_TIMESTAMP
WHERE id IN (10,11);
