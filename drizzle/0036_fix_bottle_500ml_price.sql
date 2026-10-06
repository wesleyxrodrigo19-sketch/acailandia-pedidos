-- Garrafinha trufada de 500 ml: preço único, com sabor obrigatório incluído.
-- A de 300 ml mantém os valores variáveis de acordo com o sabor.
UPDATE products SET
  price_cents=3300,
  description='Escolha 1 sabor obrigatório. O sabor já está incluído no preço fixo de R$ 33,00.',
  complements_json=REPLACE(REPLACE(REPLACE(complements_json,'"price_cents":2000','"price_cents":0'),'"price_cents":2290','"price_cents":0'),'"price_cents":2390','"price_cents":0'),
  updated_at=CURRENT_TIMESTAMP
WHERE id=2;
