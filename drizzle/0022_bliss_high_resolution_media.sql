-- Fotos locais em alta resolução para evitar as miniaturas borradas da origem.
UPDATE products SET image_url='/media/bliss-bottles.png' WHERE id IN (1,2,3,12);
UPDATE products SET image_url='/media/bliss-acai-bowl.png' WHERE id IN (4,5,6,13);
UPDATE products SET image_url='/media/bliss-dessert.png' WHERE id IN (7,8,9,10,11,14,15,16,17,18,19,20,21,22);
UPDATE products SET image_url='/media/bliss-water.png' WHERE id=23;
