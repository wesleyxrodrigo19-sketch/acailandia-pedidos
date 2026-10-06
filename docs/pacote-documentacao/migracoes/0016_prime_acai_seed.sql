-- Banco exclusivo da Açaí Prime: remove os dados de demonstração herdados
-- antes que o Worker grave o cardápio próprio definido em PRODUCT_SEED.
DELETE FROM products;
DELETE FROM sqlite_sequence WHERE name = 'products';

UPDATE settings
SET store_name = 'Açaí Prime',
    is_open = 1,
    closing_time = '22:40',
    minimum_order_cents = 0,
    delivery_fee_cents = 0,
    delivery_eta = 'A confirmar',
    pickup_eta = 'A confirmar',
    phone = '87988027603',
    address = 'Av. da Integração, 371 A — Gercino Coelho, Petrolina/PE',
    waiter_fee_enabled = 0,
    category_order_json = '["Destaques","Pote de açaí 1 litro","Açaí na garrafa","Monte seu copo","Monte sua marmita","Escolha seu Milkshake","Brownie","Lanches","Bebidas"]',
    business_hours_json = '[]',
    delivery_neighborhood_fees_json = '[]',
    delivery_surcharge_enabled = 0,
    delivery_surcharge_percent = 0,
    manual_closed = 0,
    manual_closed_reason = '',
    auto_print_enabled = 0,
    print_bridge_key = '',
    updated_at = CURRENT_TIMESTAMP
WHERE id = 1;

PRAGMA optimize;
