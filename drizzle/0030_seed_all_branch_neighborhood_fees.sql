-- Bairros atendidos pelas duas unidades, com preço inicial independente por estabelecimento.
-- Os valores poderão ser ajustados individualmente no painel do proprietário.
WITH neighborhoods(city, neighborhood) AS (
  VALUES
    ('Petrolina','Alto do Cocar'),('Petrolina','Antônio Cassimiro'),('Petrolina','Areia Branca'),('Petrolina','Atrás da Banca'),
    ('Petrolina','Boa Esperança'),('Petrolina','Caminho do Sol'),('Petrolina','Carneiro'),('Petrolina','Centro'),
    ('Petrolina','Cidade Universitária'),('Petrolina','Cohab Massangano'),('Petrolina','Cohab São Francisco'),('Petrolina','Colônia Imperial'),
    ('Petrolina','Cosme e Damião'),('Petrolina','Distrito Industrial'),('Petrolina','Dom Avelar'),('Petrolina','Dona Alexandrina'),
    ('Petrolina','Fernando Idalino'),('Petrolina','Gercino Coelho'),('Petrolina','Henrique Leite'),('Petrolina','Jardim Amazonas'),
    ('Petrolina','Jardim Maravilha'),('Petrolina','Jardim Petrópolis'),('Petrolina','Jardim São Paulo'),('Petrolina','Jatobá'),
    ('Petrolina','João de Deus'),('Petrolina','José e Maria'),('Petrolina','Km 2'),('Petrolina','Maria Auxiliadora'),
    ('Petrolina','Ouro Preto'),('Petrolina','Palhinhas'),('Petrolina','Pedra do Bode'),('Petrolina','Pedra Linda'),
    ('Petrolina','Pedro Raimundo'),('Petrolina','Portal da Cidade'),('Petrolina','Rio Claro'),('Petrolina','Rio Corrente'),
    ('Petrolina','São Gonçalo'),('Petrolina','São José'),('Petrolina','Terra do Sul'),('Petrolina','Topázio'),
    ('Petrolina','Vale Grande Rio'),('Petrolina','Vila Eduardo'),('Petrolina','Vila Eulália'),('Petrolina','Vila Mocó'),
    ('Petrolina','Vila dos Ingás'),('Petrolina','Nova Petrolina'),('Petrolina','Parque São Gonçalo'),('Petrolina','Alto da Boa Vista'),
    ('Petrolina','Aeroporto'),('Petrolina','Cohab 6'),('Petrolina','Cohab 4'),('Petrolina','Cohab 5'),
    ('Petrolina','Jardim Guanabara'),('Petrolina','Jardim Guararapes'),('Petrolina','Jardim Imperial'),('Petrolina','Jatobá 2'),
    ('Petrolina','Mandacaru'),('Petrolina','Nova Vida'),('Petrolina','Novo Tempo'),('Petrolina','São Rafael'),
    ('Juazeiro','Abóbora'),('Juazeiro','Água Bela'),('Juazeiro','Alagadiço'),('Juazeiro','Alto da Aliança'),
    ('Juazeiro','Alto da Maravilha'),('Juazeiro','Alto do Alencar'),('Juazeiro','Alto do Cruzeiro'),('Juazeiro','Angary'),
    ('Juazeiro','Antônio Conselheiro'),('Juazeiro','Antonio Guilhermino'),('Juazeiro','Argemiro'),('Juazeiro','Cajueiro'),
    ('Juazeiro','Castelo Branco'),('Juazeiro','Centenário'),('Juazeiro','Centro'),('Juazeiro','Coréia'),
    ('Juazeiro','Country Club'),('Juazeiro','Distrito Industrial'),('Juazeiro','Dom José Rodrigues'),('Juazeiro','Dom Tomaz'),
    ('Juazeiro','Expedito de Almeida Nascimento'),('Juazeiro','Itaberaba'),('Juazeiro','Jardim Flórida'),('Juazeiro','Jardim Novo Encontro'),
    ('Juazeiro','Jardim Primavera'),('Juazeiro','Jardim São Paulo'),('Juazeiro','Jardim Universitário'),('Juazeiro','Jardim Vitória'),
    ('Juazeiro','João Paulo II'),('Juazeiro','João XXIII'),('Juazeiro','Lomanto Júnior'),('Juazeiro','Malhada da Areia'),
    ('Juazeiro','Maringá'),('Juazeiro','Monte Castelo'),('Juazeiro','Mussambê'),('Juazeiro','Nossa Senhora da Penha'),
    ('Juazeiro','Nossa Senhora das Grotas'),('Juazeiro','Nova Esperança'),('Juazeiro','Nova Juazeiro'),('Juazeiro','Padre Vicente'),
    ('Juazeiro','Palmares'),('Juazeiro','Parque Centenário'),('Juazeiro','Parque Residencial'),('Juazeiro','Pedra do Lord'),
    ('Juazeiro','Pedro Raimundo'),('Juazeiro','Piranga'),('Juazeiro','Piranga I'),('Juazeiro','Piranga II'),
    ('Juazeiro','Quidé'),('Juazeiro','Santa Maria Goretti'),('Juazeiro','Santo Antônio'),('Juazeiro','São Geraldo'),
    ('Juazeiro','Sol Levante'),('Juazeiro','Tabuleiro'),('Juazeiro','Tancredo Neves'),('Juazeiro','Vila Tiradentes')
), branch_prices(branch_id, fee_cents) AS (
  VALUES ('sao-goncalo',700),('dom-avelar',500)
)
INSERT OR REPLACE INTO branch_neighborhood_fees (branch_id,city,neighborhood,distance_km,fee_cents,updated_at)
SELECT branch_prices.branch_id,neighborhoods.city,neighborhoods.neighborhood,0,branch_prices.fee_cents,CURRENT_TIMESTAMP
FROM neighborhoods CROSS JOIN branch_prices;
