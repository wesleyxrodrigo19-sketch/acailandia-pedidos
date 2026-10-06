-- Sincroniza nomes, preços e fotos disponíveis no cardápio público da Açaí Prime (RV Pedidos).
UPDATE products SET category='Monte sua marmita',name='Marmita 500ml',description='Açaí, cremes e acompanhamentos escolhidos até a capacidade da embalagem.',price_cents=2600,image_url='https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/3687247/202512032249_S6I4_.jpeg',sort_order=0 WHERE id=1;
UPDATE products SET category='Monte seu copo',name='Copo 300ml',description='Açaí, cremes e acompanhamentos escolhidos até a capacidade da embalagem.',price_cents=2200,image_url='https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/3717671/17908253COPO300ML.jpg',sort_order=1 WHERE id=2;
UPDATE products SET category='Açaí na garrafa',name='Açaí na garrafa',description='500ml. Açaí batido com leite e cobertura de leite condensado.',price_cents=2300,image_url='https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/3843615/3509ee45garr.jpeg',sort_order=2 WHERE id=3;
UPDATE products SET category='Bebidas',name='Fanta Laranja Lata 350ml',description='Lata 350ml.',price_cents=600 WHERE id=19;
UPDATE products SET category='Bebidas',name='Refrigerante Guaraná Antarctica Lata 350ml',description='Lata 350ml.',price_cents=600 WHERE id=20;
UPDATE products SET category='Bebidas',name='Cajuína São Geraldo',description='350ml.',price_cents=600 WHERE id=21;
UPDATE products SET category='Bebidas',name='Refrigerante Pepsi Garrafa 200ml',description='Garrafa 200ml.',price_cents=300 WHERE id=22;
INSERT OR IGNORE INTO products (id,category,name,description,price_cents,old_price_cents,image_url,is_featured,is_promo,is_available,sort_order) VALUES
 (23,'Bebidas','Refrigerante Guaraná Antarctica 200ml','Embalagem 200ml.',300,NULL,'/brand-placeholder.svg',0,0,1,22),
 (24,'Bebidas','Guaraná Antarctica 1l','Embalagem 1l.',800,NULL,'/brand-placeholder.svg',0,0,1,23),
 (25,'Bebidas','Água mineral sem gás','500ml.',300,NULL,'/brand-placeholder.svg',0,0,1,24),
 (26,'Bebidas','Água mineral com gás','500ml.',450,NULL,'/brand-placeholder.svg',0,0,1,25),
 (27,'Bebidas','Refrigerante H2O Limoneto Pet 500ml','Garrafa 500ml.',650,NULL,'/brand-placeholder.svg',0,0,1,26),
 (28,'Bebidas','Suco de laranja','300ml.',500,NULL,'/brand-placeholder.svg',0,0,1,27),
 (29,'Mentos','Mentos','Mentos.',1500,NULL,'/brand-placeholder.svg',0,0,1,28);
UPDATE settings SET category_order_json='["Destaques","Pote de açaí 1 litro","Açaí na garrafa","Monte seu copo","Monte sua marmita","Escolha seu Milkshake","Brownie","Lanches","Bebidas","Mentos"]',updated_at=CURRENT_TIMESTAMP WHERE id=1;
