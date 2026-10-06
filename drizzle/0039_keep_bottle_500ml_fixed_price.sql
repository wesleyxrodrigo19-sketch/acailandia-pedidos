-- A garrafinha de 500 ml é sempre R$ 33,00; o sabor é apenas uma escolha obrigatória.
UPDATE products SET
  price_cents=3300,
  description='Escolha 1 sabor obrigatório. Preço fixo: R$ 33,00.',
  complements_json=REPLACE(complements_json,'"price_cents":3300','"price_cents":0'),
  updated_at=CURRENT_TIMESTAMP
WHERE id=2;
