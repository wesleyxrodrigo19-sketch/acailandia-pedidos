-- Configuração inicial da Bliss; o cardápio é semeado pelo worker com imagens de origem.
DELETE FROM products;
UPDATE settings
SET store_name = 'Bliss Açaiteria e Gellato',
    phone = '87981556615',
    address = 'Rua da Grandeza, 1B — Dom Avelar, Petrolina/PE, 56322-060',
    is_open = 1,
    closing_time = '23:00',
    minimum_order_cents = 100,
    delivery_eta = 'A confirmar',
    pickup_eta = 'A confirmar',
    delivery_neighborhood_fees_json = '[]',
    updated_at = CURRENT_TIMESTAMP
WHERE id = 1;
