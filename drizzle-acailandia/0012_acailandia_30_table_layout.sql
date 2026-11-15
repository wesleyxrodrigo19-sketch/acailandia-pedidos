-- O salão de Açailandia usa 30 mesas no total: 10 fixas abertas e 20 disponíveis.
UPDATE settings
SET table_count = 30,
    updated_at = CURRENT_TIMESTAMP
WHERE id = 1
  AND table_count < 30;
