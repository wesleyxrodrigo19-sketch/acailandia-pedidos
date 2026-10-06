ALTER TABLE settings ADD COLUMN delivery_neighborhood_fees_json text NOT NULL DEFAULT '[]';
ALTER TABLE settings ADD COLUMN delivery_surcharge_enabled integer NOT NULL DEFAULT 0;
ALTER TABLE settings ADD COLUMN delivery_surcharge_percent integer NOT NULL DEFAULT 0;
ALTER TABLE settings ADD COLUMN delivery_surcharge_label text NOT NULL DEFAULT 'Acréscimo em dias chuvosos';
