-- A unidade ativa do sistema usa o id "acailandia"; move as taxas da planilha de Sao Goncalo para ela.
INSERT INTO branch_neighborhood_fees (branch_id,city,neighborhood,distance_km,fee_cents,updated_at)
SELECT 'acailandia',city,neighborhood,distance_km,fee_cents,CURRENT_TIMESTAMP FROM branch_neighborhood_fees WHERE branch_id='sao-goncalo'
ON CONFLICT(branch_id,city,neighborhood) DO UPDATE SET distance_km=excluded.distance_km,fee_cents=excluded.fee_cents,updated_at=CURRENT_TIMESTAMP;
DELETE FROM branch_neighborhood_fees WHERE branch_id='sao-goncalo';
