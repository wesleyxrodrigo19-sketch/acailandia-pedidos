-- Açailandia PE: dados comerciais públicos do RV Pedidos conferidos em 06/10/2026.
-- O catálogo definitivo é semeado pelo worker, deixando imagens, endereço, telefone,
-- PIX e taxas de entrega configuráveis no painel administrativo após a implantação.
DELETE FROM product_branches;
DELETE FROM products;
DELETE FROM branches;

INSERT INTO branches (id,name,address,phone,latitude,longitude,is_active,updated_at)
VALUES ('acailandia','Açailandia PE','Petrolina - PE','','-9.389', '-40.503',1,CURRENT_TIMESTAMP);

UPDATE settings SET
  store_name='Açailandia PE',
  store_address='Petrolina - PE',
  phone='',
  pix_key='',
  pix_merchant_name='ACAILANDIA PE',
  pix_city='PETROLINA',
  minimum_order_cents=0,
  category_order_json='["Copos promocionais","Monte seu combo pote","Monte seu açaí no copo","Potes individuais","Milk shake","Bebidas"]',
  delivery_neighborhood_fees_json='[]',
  updated_at=CURRENT_TIMESTAMP
WHERE id=1;
