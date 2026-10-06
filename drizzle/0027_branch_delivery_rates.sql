-- Faixas oficiais de entrega, aplicadas separadamente em cada unidade.
CREATE TABLE IF NOT EXISTS branch_delivery_rates (
  branch_id text NOT NULL,
  from_km real NOT NULL,
  to_km real NOT NULL,
  fee_cents integer NOT NULL,
  PRIMARY KEY (branch_id, from_km),
  FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS branch_neighborhood_fees (
  branch_id text NOT NULL,
  city text NOT NULL,
  neighborhood text NOT NULL,
  distance_km real NOT NULL,
  fee_cents integer NOT NULL,
  updated_at text NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (branch_id, city, neighborhood),
  FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE CASCADE
);

INSERT OR REPLACE INTO branch_delivery_rates (branch_id,from_km,to_km,fee_cents) VALUES
('dom-avelar',0.1,1,600),('dom-avelar',1.1,2,700),('dom-avelar',2.1,3,800),('dom-avelar',3.1,4,900),('dom-avelar',4.1,5,1000),('dom-avelar',5.1,6,1100),('dom-avelar',6.1,7,1200),('dom-avelar',7.1,8,1300),('dom-avelar',8.1,9,1400),('dom-avelar',9.1,9.9,1500),('dom-avelar',10,10,1600),('dom-avelar',11,11,1700),('dom-avelar',12,12,1800),('dom-avelar',13,13,1900),('dom-avelar',14,14,2350),('dom-avelar',15,15,2500),('dom-avelar',16,16,2650),('dom-avelar',17,17,2800),('dom-avelar',18,18,2950),('dom-avelar',19,19,3100),('dom-avelar',20,20,3250),('dom-avelar',21,21,3400),('dom-avelar',22,22,3550),('dom-avelar',23,23,3700),('dom-avelar',24,24,3850),('dom-avelar',25,25,4000),('dom-avelar',26,26,4150),('dom-avelar',27,27,5150),('dom-avelar',28,28,5300),('dom-avelar',29,29,5500),('dom-avelar',30,30,5700),
('sao-goncalo',0.1,1,600),('sao-goncalo',1.1,2,700),('sao-goncalo',2.1,3,800),('sao-goncalo',3.1,4,900),('sao-goncalo',4.1,5,1000),('sao-goncalo',5.1,6,1100),('sao-goncalo',6.1,7,1200),('sao-goncalo',7.1,8,1300),('sao-goncalo',8.1,9,1400),('sao-goncalo',9.1,9.9,1500),('sao-goncalo',10,10,1600),('sao-goncalo',11,11,1700),('sao-goncalo',12,12,1800),('sao-goncalo',13,13,1900),('sao-goncalo',14,14,2350),('sao-goncalo',15,15,2500),('sao-goncalo',16,16,2650),('sao-goncalo',17,17,2800),('sao-goncalo',18,18,2950),('sao-goncalo',19,19,3100),('sao-goncalo',20,20,3250),('sao-goncalo',21,21,3400),('sao-goncalo',22,22,3550),('sao-goncalo',23,23,3700),('sao-goncalo',24,24,3850),('sao-goncalo',25,25,4000),('sao-goncalo',26,26,4150),('sao-goncalo',27,27,5150),('sao-goncalo',28,28,5300),('sao-goncalo',29,29,5500),('sao-goncalo',30,30,5700);

-- Bairros da própria área de cada ponto, iniciando na primeira faixa.
INSERT OR REPLACE INTO branch_neighborhood_fees (branch_id,city,neighborhood,distance_km,fee_cents) VALUES
('sao-goncalo','Petrolina','São Gonçalo',1,600),('sao-goncalo','Petrolina','Parque São Gonçalo',1,600),('sao-goncalo','Petrolina','Alto da Boa Vista',1,600),
('dom-avelar','Petrolina','Dom Avelar',1,600);
