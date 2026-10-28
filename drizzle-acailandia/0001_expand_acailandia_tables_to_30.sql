-- O catálogo da RV para a loja Açailandia mostra 30 mesas.
-- Preserve uma quantidade já configurada acima do valor provisório de 3.
UPDATE settings
SET table_count = 30, updated_at = CURRENT_TIMESTAMP
WHERE id = 1 AND table_count = 3;
